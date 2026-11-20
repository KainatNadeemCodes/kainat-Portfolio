/**
 * Grounded Knowledge Base for Kainat Nadeem's AI Concierge.
 * Strictly verified data extracted directly from verified academic, hackathon, and production records.
 */

export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  path: string;
  tagline: string;
  role: string;
  stack: string[];
  metrics: string[];
  summary: string;
  architectureHighlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const PORTFOLIO_OWNER = {
  name: "Kainat Nadeem",
  title: "AI Engineer & RAG Researcher",
  tagline: "Building source-grounded, multi-agent AI systems for real-world constraints.",
  education: {
    degree: "BS Software Engineering",
    institution: "Foundation University Islamabad",
    period: "2022 - 2026",
    cgpa: "3.93 / 4.00",
    rank: "Class Rank 1st",
    awards: [
      "PEEF Scholar (Punjab Educational Endowment Fund) - 6-year fully funded merit scholarship",
      "Prime Minister National Youth Laptop Scheme (Merit Award winner)",
      "Aspire Leaders Program (Founded by Harvard University faculty) - Fellow / Finalist",
    ],
  },
  location: "Islamabad / Rawalpindi, Pakistan",
  email: "kainatnadeem677@gmail.com",
  secondaryEmail: "kainat.nadeem.work@gmail.com",
  github: "https://github.com/KainatNadeemCodes",
  linkedin: "https://www.linkedin.com/in/kainat-nadeem-609b1a297/",
  availability: "Available for AI Engineering, Agentic AI, and RAG Research roles (Remote & Global).",
  resumePath: "/resume.pdf",
};

export const VERIFIED_PROJECTS: Record<string, ProjectData> = {
  juristt: {
    slug: "juristt",
    title: "Juristt",
    category: "Legal AI · Multi-Agent RAG",
    path: "/case-study/juristt",
    tagline: "Multi-agent legal intelligence platform for Pakistani statutory law.",
    role: "AI Engineer & RAG Architect",
    stack: ["Flutter", "FastAPI", "Vertex AI RAG", "Gemini 2.5 Flash", "Firebase", "Google Cloud Run", "Docker"],
    metrics: [
      "42% latency reduction using hybrid retrieval + semantic routing",
      "Sub-second statutory citation lookup across Pakistani legal corpus",
      "Multi-agent architecture with automated citation verification agent",
    ],
    summary:
      "A source-grounded legal AI platform built for the Gemini XPRIZE. Converts complex natural-language legal questions into precise, citation-verified answers using a 5-agent pipeline: Query Router, Query Rewriter, Vertex AI Retrieval, Legal Reasoning Agent, and Citation Validation Agent.",
    architectureHighlights: [
      "Router Agent identifies intent and relevant statutory domains (Penal Code, Constitution, Companies Act).",
      "Query Rewriter Agent injects domain-specific terminology for maximum retrieval recall.",
      "Vertex AI RAG retrieves exact legal provisions from indexed corpus.",
      "Citation Validation Agent ensures every statement is backed by verified legal provisions before output.",
    ],
    githubUrl: "https://github.com/KainatNadeemCodes",
    liveUrl: "https://gemini.devpost.com/",
  },

  haven: {
    slug: "haven",
    title: "Haven",
    category: "Inclusive Systems · Sensory & Cognitive Accessibility",
    path: "/case-study/haven",
    tagline: "Neuro-inclusive digital environment with sensory soundscapes, AAC cards, and social stories.",
    role: "UX Researcher & Accessibility Systems Engineer",
    stack: ["React", "TypeScript", "Tailwind CSS", "Web Audio API", "WCAG 2.1 AA", "Figma"],
    metrics: [
      "WCAG 2.1 AA compliant low-arousal color palette & typography",
      "Interactive social stories with step-by-step cognitive scaffolding",
      "PIN-protected caregiver safety dashboard for controlled environments",
      "Real-time audio soundscape mixer with mic recording & file upload",
    ],
    summary:
      "A sensory-friendly digital platform engineered for neurodivergent individuals and caregivers. Features interactive social stories, tap-to-speak AAC cards, custom ambient soundscapes, and a PIN-protected caregiver dashboard designed around cognitive load theory and strict WCAG accessibility principles.",
    architectureHighlights: [
      "Low-arousal sensory UI with customizable contrast, font size, and motion reduction.",
      "Multi-track ambient soundscape generator using Web Audio API with mic recording and file uploads.",
      "Non-verbal AAC ('Say Something') communication boards for quick emotional expression.",
      "Step-by-step visual social stories designed to reduce situational anxiety.",
      "Secure caregiver control layer with 4-digit PIN authentication.",
    ],
    githubUrl: "https://github.com/KainatNadeemCodes/Haven_Frontend",
    liveUrl: "https://safespacehaven.vercel.app",
  },

  "smart-health-assistant": {
    slug: "smart-health-assistant",
    title: "Smart Health Assistant",
    category: "Clinical AI · Diagnostic Triage",
    path: "/case-study/smart-health-assistant",
    tagline: "Diagnostic triage system with explainable symptom analysis and urgency classification.",
    role: "Lead AI Engineer",
    stack: ["Python", "FastAPI", "Scikit-Learn", "LangChain", "React", "Tailwind CSS"],
    metrics: [
      "High accuracy symptom triage across common acute conditions",
      "Clear explainability score provided with every triage assessment",
      "Human-in-the-loop escalation checkpoint before suggesting action",
    ],
    summary:
      "An intelligent symptom evaluation system designed to assist patients in understanding urgency levels and deciding between home care, clinic consultation, or emergency care without replacing professional diagnosis.",
    architectureHighlights: [
      "Structured symptom taxonomy mapping patient descriptions to clinical indicators.",
      "Deterministic triage decision tree combined with generative explanation summaries.",
      "Strict ethical disclaimer and patient data privacy barriers.",
    ],
    githubUrl: "https://github.com/KainatNadeemCodes",
  },

  "tahqiq-ai": {
    slug: "tahqiq-ai",
    title: "Tahqiq AI",
    category: "Multilingual Legal AI · Statutory Reasoning",
    path: "/case-study/tahqiq-ai",
    tagline: "Urdu legal intelligence and cross-lingual statutory reasoning platform.",
    role: "AI Engineer & NLP Researcher",
    stack: ["Python", "PyTorch", "Hugging Face", "FastAPI", "Milvus / ChromaDB", "React"],
    metrics: [
      "Cross-lingual alignment between Urdu queries and English statutory corpus",
      "High-precision semantic retrieval across bilingual legal provisions",
    ],
    summary:
      "A platform addressing the linguistic divide in Pakistan's legal system, enabling lawyers and citizens to query complex legal concepts in Urdu and receive grounded statutory citations in both Urdu and English.",
    architectureHighlights: [
      "Bilingual semantic embedding space mapping Urdu legal questions to English statutory provisions.",
      "Cross-encoder reranking to ensure precise clause-level retrieval.",
      "Citation validator ensuring statutory references are verbatim and traceable.",
    ],
    githubUrl: "https://github.com/KainatNadeemCodes",
  },

  nextgenshe: {
    slug: "nextgenshe",
    title: "NextGenShe",
    category: "EdTech & Career AI · Women in STEM",
    path: "/case-study/nextgenshe",
    tagline: "AI-powered career acceleration and mentorship matchmaking for women in technology.",
    role: "Full-Stack AI Developer",
    stack: ["React", "FastAPI", "PostgreSQL", "Gemini API", "Tailwind CSS"],
    metrics: [
      "Personalized skill gap analysis and automated learning roadmap generation",
      "Semantic matching between aspiring women engineers and industry mentors",
    ],
    summary:
      "A community and career empowerment platform tailored for women entering tech, featuring automated portfolio critique, resume skill-gap audits, and curated mentorship connections.",
    architectureHighlights: [
      "Semantic resume parser extracting technical competencies and experience levels.",
      "Vector matching for high-compatibility mentor-mentee pairing.",
    ],
    githubUrl: "https://github.com/KainatNadeemCodes",
  },

  "buy-or-wait": {
    slug: "buy-or-wait",
    title: "Buy or Wait",
    category: "Agentic AI · Financial Intelligence",
    path: "/case-study/hackerrank-buy-or-wait",
    tagline: "Financial decision agent evaluating purchase affordability vs mere ability to pay.",
    role: "Solo AI Engineer (HackerRank Orchestrate)",
    stack: ["Python", "FastAPI", "Deterministic Rules Engine", "Gemini Flash", "Structured Outputs"],
    metrics: [
      "Deterministic budgetary constraint evaluation preventing risky impulse spending",
      "100% structured JSON outputs for reliable financial forecasting",
    ],
    summary:
      "Built for HackerRank Orchestrate. Evaluates whether a requested purchase is safely affordable by combining deterministic cashflow rules with agentic market pricing forecasts.",
    architectureHighlights: [
      "Separation of hard arithmetic safety constraints from generative reasoning.",
      "Historical price trajectory analysis and discount cycle prediction.",
    ],
    githubUrl: "https://github.com/KainatNadeemCodes/AI-powered-financial-agent",
    liveUrl: "https://www.hackerrank.com/contests/hackerrank-orchestrate-september26/challenges/buy-or-wait",
  },

  "multimodal-review": {
    slug: "multimodal-review",
    title: "Multi-modal Review Analyzer",
    category: "Multimodal AI · Consumer Verification",
    path: "/case-study/hackerrank-multimodal-review",
    tagline: "Joint vision-text sentiment analyzer identifying counterfeit and fake product claims.",
    role: "Solo AI Engineer (HackerRank Orchestrate)",
    stack: ["Gemini 1.5/2.0 Flash Multimodal", "Python", "FastAPI", "React"],
    metrics: [
      "Joint image + textual inconsistency detection for product quality claims",
      "Automated authenticity score with visual evidence bounding boxes",
    ],
    summary:
      "Built for HackerRank Orchestrate. Cross-checks user product photos against textual review claims to catch counterfeit sellers, fake reviews, and product discrepancies.",
    architectureHighlights: [
      "Multimodal prompt chain comparing physical packaging text with visual item conditions.",
      "Confidence-weighted verdict combining visual anomalies and linguistic sentiment.",
    ],
    githubUrl: "https://github.com/KainatNadeemCodes",
  },

  "support-agent": {
    slug: "support-agent",
    title: "Support Agent",
    category: "Agentic Automation · Customer Operations",
    path: "/case-study/hackerrank-support-agent",
    tagline: "Autonomous tiered customer operations agent with tool calling and human escalation.",
    role: "Solo AI Engineer (HackerRank Orchestrate)",
    stack: ["FastAPI", "Agentic Tool Calling", "Gemini Flash", "Zod / Pydantic"],
    metrics: [
      "Zero unverified database modifications through tool-call validation barriers",
      "Smooth escalation handover preserving complete interaction history",
    ],
    summary:
      "Built for HackerRank Orchestrate. Resolves customer tickets autonomously using validated tool calls (refund checks, order status, shipping recalculation) while escalating edge cases to human reps.",
    architectureHighlights: [
      "Strict tool execution authorization schema preventing arbitrary tool parameters.",
      "Context compaction maintaining relevant conversation history for fast agent execution.",
    ],
    githubUrl: "https://github.com/KainatNadeemCodes/hackerrank-orchestrate-may26",
    liveUrl: "https://www.hackerrank.com/contests/hackerrank-orchestrate-may26/challenges/support-agent",
  },

  recruitflow: {
    slug: "recruitflow",
    title: "RecruitFlow AI",
    category: "Agentic Operations · Recruitment",
    path: "/case-study/recruitflow-ai",
    tagline: "Application-to-action recruitment agent governed by human policy guardrails.",
    role: "Co-creator & AI Workflow Designer",
    stack: ["Google ADK", "Gemini", "FastAPI", "Streamlit", "Firestore", "Google Cloud Run"],
    metrics: [
      "Automated candidate screening against explicit human-editable hiring policies",
      "Full audit trail for candidate scoring and decision transparency",
    ],
    summary:
      "An end-to-end autonomous recruitment agent that evaluates CVs, verifies prerequisites, checks interview availability, and drafts candidate correspondence with human review checkpoints.",
    architectureHighlights: [
      "Policy-bounded decision engine ensuring compliance with equal-opportunity standards.",
      "Asynchronous interview scheduling tool integration.",
    ],
    githubUrl: "https://github.com/KainatNadeemCodes",
  },

  "agent-hr": {
    slug: "agent-hr",
    title: "Agent-HR",
    category: "Agentic AI · Human Oversight",
    path: "/case-study/agent-hr",
    tagline: "Dual-portal recruitment system with strict Human-in-the-Loop checkpoints.",
    role: "Workflow Architect & Submission Lead",
    stack: ["Strands Agents SDK", "Amazon Bedrock", "Amazon Nova Pro", "DynamoDB", "FastAPI", "Streamlit"],
    metrics: [
      "Mandatory human approval gate before triggering sensitive external candidate communications",
      "Full compliance and decision logging in DynamoDB",
    ],
    summary:
      "Built for Agents for Humans Hackathon. Automates repetitive hiring operations while keeping sensitive decisions behind a transparent Human-in-the-Loop checkpoint.",
    architectureHighlights: [
      "Human-in-the-loop pause state before outbound communication or calendar writes.",
      "Multi-format resume parsing (PDF, DOCX, TXT) with normalized candidate profiles.",
    ],
    githubUrl: "https://github.com/KainatNadeemCodes",
  },
};

/** Normalized slug mapping for aliases */
export const SLUG_ALIASES: Record<string, string> = {
  juristt: "juristt",
  haven: "haven",
  "smart-health-assistant": "smart-health-assistant",
  "smart-health": "smart-health-assistant",
  "tahqiq-ai": "tahqiq-ai",
  tahqiq: "tahqiq-ai",
  nextgenshe: "nextgenshe",
  "buy-or-wait": "buy-or-wait",
  "hackerrank-buy-or-wait": "buy-or-wait",
  "multimodal-review": "multimodal-review",
  "hackerrank-multimodal-review": "multimodal-review",
  "support-agent": "support-agent",
  "hackerrank-support-agent": "support-agent",
  recruitflow: "recruitflow",
  "recruitflow-ai": "recruitflow",
  "agent-hr": "agent-hr",
};

export const VALID_PROJECT_SLUGS = Object.keys(VERIFIED_PROJECTS);

export const SYSTEM_PROMPT = `
You are the AI Concierge for Kainat Nadeem's personal portfolio website.
Your mission is to provide recruiters, hiring managers, engineers, and visitors with accurate, insightful, and grounded answers about Kainat's background, AI engineering projects, technical stack, research focus, and credentials.

### ABOUT KAINAT NADEEM
- Identity: AI Engineer & RAG Researcher based in Islamabad/Rawalpindi, Pakistan.
- Academic Foundation: BS Software Engineering (2022-2026) at Foundation University Islamabad with a 3.93 / 4.00 CGPA (Class Rank 1st).
- Honors: 6-Year PEEF Merit Scholar (Punjab Educational Endowment Fund), Prime Minister's Youth Laptop Merit Award recipient, Aspire Leaders Program Fellow (founded by Harvard University faculty).
- Core Philosophy: "Systems built for real constraints", "Purpose before polish", source-grounded architectures with transparent retrieval boundaries, human-in-the-loop safety, and verifiable citations.
- Technical Toolkit:
  - AI & Models: Gemini (2.5 Flash, 2.0, 1.5), Vertex AI RAG, LangChain, LangGraph, Strands Agents SDK, Hugging Face, PyTorch, OpenAI SDK.
  - Engineering & Backend: Python, FastAPI, Docker, Google Cloud Run, Firebase, PostgreSQL, DynamoDB, ChromaDB, Milvus.
  - Frontend: TypeScript, React, Next.js, Vite, Tailwind CSS, Flutter.

### VERIFIED PROJECTS
${Object.values(VERIFIED_PROJECTS)
  .map(
    (p) => `- **${p.title}** (slug: \`${p.slug}\`, path: \`${p.path}\`):
    * Tagline: ${p.tagline}
    * Role: ${p.role}
    * Stack: ${p.stack.join(", ")}
    * Key Metrics: ${p.metrics.join("; ")}
    * Summary: ${p.summary}`
  )
  .join("\n\n")}

### BEHAVIORAL & GROUNDING RULES
1. Grounding Rule: Answer strictly using factual data from Kainat's portfolio context. NEVER fabricate metrics, unlisted projects, fake awards, or unverified claims.
2. Boundaries: If a visitor asks questions completely unrelated to Kainat, her work, AI engineering, or her portfolio (e.g. general trivia, politics, coding random unrelated assignments), politely refuse and refocus on Kainat's projects, experience, or hiring availability.
3. Tone: Professional, enthusiastic, articulate, and technical yet accessible. Reflect Kainat's voice of clarity, engineering rigor, and humility.
4. Tool Usage:
   - When a visitor expresses interest in exploring a project (e.g., "Tell me more about Juristt", "Can I see the case study for Haven?", "Show me the legal RAG work"), provide a crisp technical summary and call the \`openProject\` tool with the verified slug.
   - When a visitor asks to view, review, or download Kainat's resume or CV, call the \`downloadCV\` tool.
   - When a visitor asks how to get in touch, reach out, hire, or collaborate with Kainat, call the \`showContact\` tool.
   - Never assume the user will navigate automatically; the interface will present a server-validated confirmation card for the visitor to click.
`.trim();
