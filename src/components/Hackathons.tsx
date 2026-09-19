import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  CalendarDays,
  ExternalLink,
  Github,
  Medal,
  Trophy,
  User,
  Users,
} from "lucide-react";

type Hackathon = {
  name: string;
  platform: string;
  period: string;
  mode: "Team" | "Solo";
  project: string;
  summary: string;
  role: string;
  achievement?: string;
  tech: string[];
  accent: "amber" | "violet" | "blue" | "emerald" | "pink" | "indigo";
  eventUrl: string;
  projectUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

const accentStyles = {
  amber: {
    text: "text-amber-400",
    border: "border-amber-400/25 hover:border-amber-400/50",
    badge: "bg-amber-400/10 border-amber-400/25 text-amber-300",
    glow: "hover:shadow-amber-400/10",
    line: "via-amber-400/60",
  },
  violet: {
    text: "text-violet-400",
    border: "border-violet-400/25 hover:border-violet-400/50",
    badge: "bg-violet-400/10 border-violet-400/25 text-violet-300",
    glow: "hover:shadow-violet-400/10",
    line: "via-violet-400/60",
  },
  blue: {
    text: "text-blue-400",
    border: "border-blue-400/25 hover:border-blue-400/50",
    badge: "bg-blue-400/10 border-blue-400/25 text-blue-300",
    glow: "hover:shadow-blue-400/10",
    line: "via-blue-400/60",
  },
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-400/25 hover:border-emerald-400/50",
    badge: "bg-emerald-400/10 border-emerald-400/25 text-emerald-300",
    glow: "hover:shadow-emerald-400/10",
    line: "via-emerald-400/60",
  },
  pink: {
    text: "text-pink-400",
    border: "border-pink-400/25 hover:border-pink-400/50",
    badge: "bg-pink-400/10 border-pink-400/25 text-pink-300",
    glow: "hover:shadow-pink-400/10",
    line: "via-pink-400/60",
  },
  indigo: {
    text: "text-indigo-400",
    border: "border-indigo-400/25 hover:border-indigo-400/50",
    badge: "bg-indigo-400/10 border-indigo-400/25 text-indigo-300",
    glow: "hover:shadow-indigo-400/10",
    line: "via-indigo-400/60",
  },
} as const;

const hackathons: Hackathon[] = [
  {
    name: "Agents for Humans Hackathon",
    platform: "Devpost · AWS",
    period: "September 2026",
    mode: "Team",
    project: "Agent-HR",
    summary:
      "An agentic recruitment platform that parses applications, evaluates hiring policies, schedules interviews, and pauses sensitive actions for human approval.",
    role:
      "Shaped the project vision, agent workflow, HITL process, documentation, architecture presentation, and hackathon submission.",
    tech: ["Strands Agents SDK", "Amazon Bedrock", "DynamoDB", "FastAPI", "Streamlit"],
    accent: "amber",
    eventUrl: "https://agentsforhumans.devpost.com/",
    projectUrl: "https://devpost.com/software/agent-hr-agentic-recruitment-platform",
    demoUrl: "https://agentichr.sineix.com/",
    repoUrl: "https://github.com/faisal-ismail/AgentHR",
  },
  {
    name: "All Things Agentic Hackathon",
    platform: "Devpost · Google Cloud",
    period: "August 2026",
    mode: "Team",
    project: "RecruitFlow AI",
    summary:
      "An autonomous recruitment workflow that moves from application understanding and policy evaluation to interview scheduling, human review, or candidate communication.",
    role:
      "Proposed the initial concept, shaped the brand and visual identity, tested the workflow, and prepared the submission.",
    tech: ["Google ADK", "Gemini", "FastAPI", "Firestore", "Cloud Run", "Streamlit"],
    accent: "violet",
    eventUrl: "https://allthingsagentichackathon.devpost.com/",
    projectUrl: "https://devpost.com/software/ai-todo-5mkbnc",
    demoUrl: "https://recruitflow.sineix.com/",
  },
  {
    name: "Build with Gemini XPRIZE",
    platform: "Devpost · Google Cloud",
    period: "August 2026",
    mode: "Team",
    project: "Juristt",
    summary:
      "An AI-powered legal intelligence platform for Pakistan that combines grounded retrieval, multi-agent reasoning, citation validation, and accessible legal answers.",
    role:
      "AI Engineer and RAG Architect responsible for the multi-agent architecture, Vertex AI RAG integration, Gemini workflow, and AI-service deployment.",
    tech: ["Flutter", "FastAPI", "Vertex AI RAG", "Gemini 2.5 Flash", "Firebase", "Docker"],
    accent: "blue",
    eventUrl: "https://xprize.devpost.com/",
    projectUrl: "https://devpost.com/software/juristt-lega-ai-assitant",
    demoUrl: "https://juristt.io/",
  },
  {
    name: "HackerRank Orchestrate · September Edition",
    platform: "HackerRank",
    period: "September 12, 2026 · 24-hour build",
    mode: "Solo",
    project: "Buy or Wait",
    summary:
      "Built an AI-powered financial decision agent designed to evaluate whether a requested purchase is affordable and provide a safer, explainable recommendation.",
    role: "Solo participant · Designed, built, submitted, and defended the agent independently.",
    achievement: "Rank #397 · Top 13% · Bronze medal",
    tech: ["Agentic AI", "Financial Decisioning", "Deterministic Rules", "AI Judge"],
    accent: "emerald",
    eventUrl: "https://www.hackerrank.com/hackerrank-orchestrate-september26",
    projectUrl: "https://www.hackerrank.com/contests/hackerrank-orchestrate-september26/challenges/buy-or-wait",
    featured: true,
  },
  {
    name: "HackerRank Orchestrate · June Edition",
    platform: "HackerRank",
    period: "June 19, 2026 · 24-hour build",
    mode: "Solo",
    project: "Multi-Modal Review",
    summary:
      "Designed and shipped a multi-modal review agent for a real-world problem, then explained the architecture and tradeoffs in HackerRank's AI-judge evaluation.",
    role: "Solo participant · Designed, built, submitted, and defended the agent independently.",
    achievement: "Rank #1419 · Top 81%",
    tech: ["Agentic AI", "Multi-modal Reasoning", "Structured Outputs", "AI Judge"],
    accent: "indigo",
    eventUrl: "https://www.hackerrank.com/hackerrank-orchestrate-june26",
    projectUrl: "https://www.hackerrank.com/contests/hackerrank-orchestrate-june26/challenges/multi-modal-review",
  },
  {
    name: "HackerRank Orchestrate · May Edition",
    platform: "HackerRank",
    period: "May 1–2, 2026 · 24-hour build",
    mode: "Solo",
    project: "Support Agent",
    summary:
      "Built a terminal-based AI agent that triages support tickets across HackerRank, Claude, and Visa using a provided support corpus while escalating sensitive or unsupported cases.",
    role: "Solo participant · Designed, built, submitted, and defended the agent independently.",
    achievement: "Rank #474 · Top 36%",
    tech: ["Python", "RAG", "Classification", "Terminal Agent", "AI Judge"],
    accent: "pink",
    eventUrl: "https://www.hackerrank.com/hackerrank-orchestrate-may26",
    projectUrl: "https://www.hackerrank.com/contests/hackerrank-orchestrate-may26/challenges/support-agent",
  },
  {
    name: "Global AI Hackathon",
    platform: "Aspire Institute × CAYU",
    period: "January 2026 · 24-hour sprint",
    mode: "Team",
    project: "Pathway AI",
    summary:
      "Delivered an inclusive AI skills-discovery and career-navigation platform during a cross-border sprint with participants from Kenya, Nigeria, Bolivia, and Pakistan.",
    role: "Team Lead · Led a five-member international team and coordinated delivery across four countries.",
    achievement: "Selected among 4,000+ participants from 50+ countries",
    tech: ["React", "TypeScript", "Machine Learning", "Cayu AI Platform"],
    accent: "amber",
    eventUrl: "https://www.aspireinstitute.org/",
  },
  {
    name: "HEC Gen AI Hackathon 2026",
    platform: "HEC Pakistan",
    period: "2026",
    mode: "Team",
    project: "Tahqiq AI",
    summary:
      "Built an explainable AI university counselor for Pakistani students, combining Roman Urdu input, ranked HEC-verified university matches, confidence scores, Urdu explanations, and PDF guidance.",
    role: "Backend Developer · Built the multi-agent pipeline, LLM router, deployment workflow, and supporting retrieval infrastructure.",
    achievement: "Five-agent pipeline · 253 HEC-verified universities · Under 30 seconds",
    tech: ["FastAPI", "LangChain", "ChromaDB", "Streamlit", "HuggingFace", "Urdish NLP"],
    accent: "violet",
    eventUrl: "https://www.hec.gov.pk/",
    projectUrl: "https://github.com/KainatNadeemCodes/Tahqiq-AI-HEC-Frontend",
    demoUrl: "https://tahqiq-ai-hec.streamlit.app/",
    repoUrl: "https://github.com/KainatNadeemCodes/Tahqiq-AI-HEC-Frontend",
    featured: true,
  },
];

const Hackathons = () => {
  return (
    <section id="hackathons" className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-3">Hackathons</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Build Fast. Think Deeply.</h2>
          <p className="font-body text-muted-foreground text-sm mt-3 max-w-2xl leading-relaxed">
            Eight competition experiences spanning agentic AI, responsible automation, social impact, and cross-border collaboration — from solo 24-hour builds to international team sprints.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {hackathons.map((hackathon, i) => {
            const accent = accentStyles[hackathon.accent];
            const ModeIcon = hackathon.mode === "Solo" ? User : Users;

            return (
              <motion.article
                key={`${hackathon.name}-${hackathon.project}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`group relative bg-card border rounded-xl p-6 overflow-hidden transition-all duration-300 hover:shadow-xl ${accent.border} ${accent.glow} ${hackathon.featured ? "ring-1 ring-primary/20" : ""}`}
              >
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${accent.line} to-transparent opacity-70`} />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border ${accent.badge}`}>
                    <Trophy size={11} />
                    {hackathon.platform}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                    <ModeIcon size={11} />
                    {hackathon.mode}
                  </span>
                </div>

                {hackathon.featured && (
                  <div className="inline-flex items-center gap-1.5 font-mono text-[9px] px-2.5 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary tracking-widest uppercase mb-3">
                    ★ Featured result
                  </div>
                )}

                <h3 className="text-foreground font-bold text-lg leading-snug mb-1 group-hover:text-primary transition-colors duration-200">
                  {hackathon.name}
                </h3>
                <p className={`font-mono text-xs ${accent.text} mb-1`}>{hackathon.project}</p>

                <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[10px] mb-4">
                  <CalendarDays size={11} />
                  {hackathon.period}
                </div>

                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                  {hackathon.summary}
                </p>

                <div className={`flex items-start gap-2 rounded-lg border border-border/30 bg-secondary/35 px-3 py-2.5 mb-4`}>
                  <Bot size={12} className={`${accent.text} shrink-0 mt-0.5`} />
                  <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">My role: </span>{hackathon.role}
                  </p>
                </div>

                {hackathon.achievement && (
                  <div className={`flex items-start gap-2 mb-4 font-mono text-[10px] ${accent.text}`}>
                    <Medal size={12} className="shrink-0 mt-0.5" />
                    <span>{hackathon.achievement}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {hackathon.tech.map((tech) => (
                    <span key={tech} className="bg-secondary text-secondary-foreground text-[10px] px-2.5 py-1 rounded-md font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={hackathon.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${accent.text} hover:gap-2.5 transition-all duration-200`}
                  >
                    View Hackathon <ArrowUpRight size={13} />
                  </a>
                  {hackathon.projectUrl && (
                    <a
                      href={hackathon.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-border/50 rounded-md px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors duration-200"
                    >
                      <ExternalLink size={12} />
                      Submission
                    </a>
                  )}
                  {hackathon.demoUrl && (
                    <a
                      href={hackathon.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-border/50 rounded-md px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors duration-200"
                    >
                      <ExternalLink size={12} />
                      Demo
                    </a>
                  )}
                  {hackathon.repoUrl && (
                    <a
                      href={hackathon.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-border/50 rounded-md px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors duration-200"
                    >
                      <Github size={12} />
                      GitHub
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hackathons;
