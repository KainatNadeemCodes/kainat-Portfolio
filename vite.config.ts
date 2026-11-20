import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { handleChat } from "./api/chat";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.GOOGLE_GENERATIVE_AI_API_KEY =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    env.GOOGLE_GENERATIVE_AI_API_KEY ||
    env.GEMINI_API_KEY ||
    env.VITE_GEMINI_API_KEY;
  process.env.GEMINI_API_KEY =
    process.env.GEMINI_API_KEY ||
    env.GEMINI_API_KEY ||
    env.GOOGLE_GENERATIVE_AI_API_KEY;

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      {
        name: "local-api-chat-dev-server",
        configureServer(server) {
          server.middlewares.use("/api/chat", async (req, res) => {
            if (req.method !== "POST") {
              res.statusCode = 405;
              res.end("Method Not Allowed");
              return;
            }

            let body = "";
            req.on("data", (chunk: Buffer) => {
              body += chunk.toString();
            });

            req.on("end", async () => {
              try {
                const data = JSON.parse(body || "{}");
                const messages = data.messages || [];
                const response = await handleChat(messages);

                res.statusCode = response.status;
                response.headers.forEach((value, key) => {
                  res.setHeader(key, value);
                });

                if (response.body) {
                  const reader = response.body.getReader();
                  while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    res.write(value);
                  }
                  res.end();
                } else {
                  res.end();
                }
              } catch (err: any) {
                console.error("[Local Dev /api/chat Error]:", err.message);
                if (!res.headersSent) {
                  res.statusCode = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.end(
                    JSON.stringify({
                      error:
                        err.message ||
                        "AI Concierge encountered an error. Check GEMINI_API_KEY.",
                    })
                  );
                }
              }
            });
          });
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
