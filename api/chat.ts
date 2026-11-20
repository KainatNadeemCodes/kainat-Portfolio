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
    process.env.GOOGLE_API_KEY ||
    process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing Gemini API key on Vercel. Please add GOOGLE_GENERATIVE_AI_API_KEY (or GEMINI_API_KEY) in your Vercel Project Dashboard ➔ Settings ➔ Environment Variables, then redeploy."
    );
  }

  const google = createGoogleGenerativeAI({ apiKey });
  const modelName = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  const model = google(modelName);

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
