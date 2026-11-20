import { streamText, tool, convertToModelMessages } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import {
  PORTFOLIO_OWNER,
  SYSTEM_PROMPT,
  VERIFIED_PROJECTS,
  SLUG_ALIASES,
  VALID_PROJECT_SLUGS,
} from "../src/data/portfolio-context";

// Vercel Serverless Function Configuration
export const config = {
  maxDuration: 30,
};

/**
 * Server-side validated tool calling for Kainat's AI Concierge.
 */
function getConciergeTools() {
  return {
    openProject: tool({
      description:
        "Propose navigating to a deep-dive case study page for one of Kainat's verified projects.",
      parameters: z.object({
        slug: z
          .string()
          .describe(
            "The project slug, e.g. juristt, haven, smart-health-assistant, tahqiq-ai, nextgenshe, buy-or-wait, multimodal-review, support-agent, recruitflow, agent-hr"
          ),
      }),
      execute: async ({ slug }) => {
        const normalized = SLUG_ALIASES[slug.toLowerCase()] || slug.toLowerCase();

        if (!VALID_PROJECT_SLUGS.includes(normalized)) {
          return {
            success: false,
            action: "openProject",
            slug,
            error: `Project "${slug}" is not in Kainat's verified portfolio index. Available verified case studies are: ${VALID_PROJECT_SLUGS.join(
              ", "
            )}.`,
          };
        }

        const project = VERIFIED_PROJECTS[normalized];
        return {
          success: true,
          action: "openProject",
          slug: normalized,
          title: project.title,
          category: project.category,
          path: project.path,
          tagline: project.tagline,
          metrics: project.metrics,
        };
      },
    }),

    downloadCV: tool({
      description:
        "Propose downloading Kainat Nadeem's official verified resume and academic credentials PDF.",
      parameters: z.object({}),
      execute: async () => {
        return {
          success: true,
          action: "downloadCV",
          filePath: PORTFOLIO_OWNER.resumePath,
          fileName: "Kainat_Nadeem_Resume_2026.pdf",
          fileSize: "1.2 MB",
          cgpa: PORTFOLIO_OWNER.education.cgpa,
          rank: PORTFOLIO_OWNER.education.rank,
          scholarship: "6-Year PEEF Scholar",
          note: "Official verified resume of Kainat Nadeem (AI Engineer & RAG Researcher).",
        };
      },
    }),

    showContact: tool({
      description:
        "Propose displaying direct contact channels, availability, and scheduling details for Kainat Nadeem.",
      parameters: z.object({}),
      execute: async () => {
        return {
          success: true,
          action: "showContact",
          name: PORTFOLIO_OWNER.name,
          email: PORTFOLIO_OWNER.email,
          secondaryEmail: PORTFOLIO_OWNER.secondaryEmail,
          github: PORTFOLIO_OWNER.github,
          linkedin: PORTFOLIO_OWNER.linkedin,
          location: PORTFOLIO_OWNER.location,
          availability: PORTFOLIO_OWNER.availability,
        };
      },
    }),
  };
}

/**
 * Core chat handler processing the incoming streamText request.
 */
export async function handleChat(messages: any[]) {
  const apiKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing Gemini API Key. Please set GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY in your environment variables (.env.local or Vercel dashboard)."
    );
  }

  const google = createGoogleGenerativeAI({ apiKey });
  const model = google(process.env.GEMINI_MODEL || "gemini-2.0-flash");

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model,
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    tools: getConciergeTools(),
    temperature: 0.3,
  });

  return result.toUIMessageStreamResponse();
}

/**
 * Standard Web Request Handler (Vercel Edge/Serverless / App Router).
 */
export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const messages = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid request: messages array is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return await handleChat(messages);
  } catch (error: any) {
    console.error("AI Concierge API Error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred in AI Concierge.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Node.js Serverless Handler fallback for Vercel Node runtime.
 */
export default async function handler(req: any, res?: any) {
  if (req instanceof Request || (!res && typeof req.json === "function")) {
    return POST(req as Request);
  }

  // Node.js IncomingMessage / ServerResponse environment
  try {
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.end(JSON.stringify({ error: "Method Not Allowed" }));
      return;
    }

    const messages = req.body?.messages || [];
    if (!Array.isArray(messages) || messages.length === 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Invalid request: messages array required." }));
      return;
    }

    const response = await handleChat(messages);

    res.statusCode = response.status;
    response.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      const reader = response.body.getReader();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
        res.end();
      };
      await pump();
    } else {
      res.end();
    }
  } catch (err: any) {
    console.error("AI Concierge Node Handler Error:", err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: err.message || "Internal Server Error" }));
    }
  }
}
