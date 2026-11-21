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

// Vercel Serverless Edge Runtime Configuration
export const config = {
  runtime: "edge",
};

/**
 * Helper to infer the intended project slug from recent user query text
 * if the model ever fails to pass the slug argument.
 */
function inferSlugFromText(text: string): string | null {
  if (!text) return null;
  const lower = text.toLowerCase();
  if (lower.includes("tahqiq")) return "tahqiq-ai";
  if (lower.includes("juristt") || lower.includes("legal rag")) return "juristt";
  if (lower.includes("haven")) return "haven";
  if (lower.includes("health") || lower.includes("smart health")) return "smart-health-assistant";
  if (lower.includes("nextgen")) return "nextgenshe";
  if (lower.includes("buy-or-wait") || lower.includes("buy or wait")) return "buy-or-wait";
  if (lower.includes("multimodal")) return "multimodal-review";
  if (lower.includes("support-agent") || lower.includes("support agent")) return "support-agent";
  if (lower.includes("recruitflow")) return "recruitflow";
  if (lower.includes("agent-hr") || lower.includes("agent hr")) return "agent-hr";
  return null;
}

/**
 * Server-side validated tool calling for Kainat's AI Concierge.
 */
function getConciergeTools(latestUserText: string = "") {
  return {
    openProject: tool({
      description:
        "Propose navigating to a deep-dive case study page for one of Kainat's verified projects. You MUST provide the exact slug.",
      parameters: z.object({
        slug: z
          .enum([
            "juristt",
            "haven",
            "smart-health-assistant",
            "tahqiq-ai",
            "nextgenshe",
            "buy-or-wait",
            "multimodal-review",
            "support-agent",
            "recruitflow",
            "agent-hr",
          ])
          .describe(
            "The exact project slug to open: juristt, haven, smart-health-assistant, tahqiq-ai, nextgenshe, buy-or-wait, multimodal-review, support-agent, recruitflow, agent-hr."
          ),
      }),
      execute: async ({ slug }) => {
        // Resolve slug with intelligent fallback if model omitted or provided empty argument
        let target = (slug && typeof slug === "string") ? slug.trim().toLowerCase() : "";

        if (!target || target === "undefined") {
          target = inferSlugFromText(latestUserText) || "";
        }

        const normalized = (target && SLUG_ALIASES[target]) || target;

        if (!normalized || !VALID_PROJECT_SLUGS.includes(normalized)) {
          return {
            success: false,
            action: "openProject",
            error: `Please specify a project slug (e.g. juristt, haven, tahqiq-ai). Available verified case studies are: ${VALID_PROJECT_SLUGS.join(
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
        "Display verified direct contact channels for Kainat Nadeem (Email, LinkedIn, GitHub).",
      parameters: z.object({}),
      execute: async () => {
        return {
          success: true,
          action: "showContact",
          email: PORTFOLIO_OWNER.contact.email,
          linkedin: PORTFOLIO_OWNER.contact.linkedin,
          github: PORTFOLIO_OWNER.contact.github,
          calendly: PORTFOLIO_OWNER.contact.calendly,
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
    process.env.GOOGLE_API_KEY ||
    process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing Gemini API key on Vercel. Please add GOOGLE_GENERATIVE_AI_API_KEY (or GEMINI_API_KEY) in your Vercel Project Dashboard ➔ Settings ➔ Environment Variables, then redeploy."
    );
  }

  const google = createGoogleGenerativeAI({ apiKey });
  
  // Guard against any deprecated model if configured in Vercel environment
  const rawModel = (process.env.GEMINI_MODEL || "").trim();
  const modelName =
    rawModel && !rawModel.includes("2.0")
      ? rawModel
      : "gemini-3.8-flash";

  const model = google(modelName);

  // Extract latest user query text for tool parameter recovery
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  const latestUserText =
    typeof lastUserMsg?.content === "string"
      ? lastUserMsg.content
      : Array.isArray(lastUserMsg?.parts)
      ? lastUserMsg.parts.map((p: any) => p.text || "").join(" ")
      : "";

  const modelMessages = await convertToModelMessages(messages);

  const enhancedSystemPrompt = `${SYSTEM_PROMPT}

### STRICT TOOL CALLING INSTRUCTIONS:
- When calling \`openProject\`, ALWAYS include a concise, helpful 1-2 sentence response about the project before or with the action, and ALWAYS specify the exact \`slug\` parameter:
  * Tahqiq AI ➔ "tahqiq-ai"
  * Juristt ➔ "juristt"
  * Haven ➔ "haven"
  * Smart Health Assistant ➔ "smart-health-assistant"
  * NextGenShe ➔ "nextgenshe"
- NEVER call \`openProject\` with an empty object {}.
`.trim();

  const result = streamText({
    model,
    system: enhancedSystemPrompt,
    messages: modelMessages,
    tools: getConciergeTools(latestUserText),
    temperature: 0.3,
    maxSteps: 2,
  });

  return result.toUIMessageStreamResponse();
}

/**
 * Standard Web Request Handler (Vercel Edge Runtime & Next.js/Web standard).
 */
export async function POST(req: Request): Promise<Response> {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const messages = body?.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid request: messages array is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return await handleChat(messages);
  } catch (error: any) {
    console.error("AI Concierge API Error:", error);
    const message = error?.message || "An unexpected error occurred in AI Concierge.";
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  }
}

/**
 * Default export fallback for Vercel Edge Runtime.
 */
export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  return POST(req);
}
