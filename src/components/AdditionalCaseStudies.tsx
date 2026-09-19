import { useParams } from "react-router-dom";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import projectJuristt from "@/assets/project-juristt.jpg";
import projectHackerrankSupport from "@/assets/project-hackerrank-support.jpg";
import projectHackerrankMultimodal from "@/assets/project-hackerrank-multimodal.jpg";
import projectHackerrankBuyWait from "@/assets/project-hackerrank-buywait.jpg";
import projectRecruitFlow from "@/assets/project-recruitflow.jpg";
import projectAgentHR from "@/assets/project-agent-hr.jpg";

const bullets = (items: string[]) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2 text-secondary-foreground text-sm leading-relaxed">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const para = (text: string) => (
  <p className="text-secondary-foreground text-sm leading-relaxed">{text}</p>
);

const caseStudies = {
  juristt: {
    title: "Juristt",
    type: "Build with Gemini XPRIZE · Legal AI Platform",
    role: "AI Engineer · RAG Architect · Multi-agent architecture",
    tools: "Flutter, FastAPI, Vertex AI RAG, Gemini 2.5 Flash, Firebase, Google Cloud",
    intro: "An AI-powered legal intelligence platform for Pakistan that turns natural-language questions into grounded, citation-aware legal answers through a multi-agent retrieval and reasoning workflow.",
    category: "Legal AI · Responsible Retrieval",
    categoryColor: "text-indigo-400 bg-indigo-400/10 border-indigo-400/25",
    heroImage: projectJuristt,
    sections: [
      { heading: "Problem Statement", content: <div className="space-y-3">{para("Lawyers, businesses, students, and ordinary citizens in Pakistan often spend hours navigating statutes, provisions, and supporting documents. Legal information is difficult to search, interpret, and verify quickly.")}{para("Juristt was designed to make legal research more accessible without treating an unconstrained language model as a source of law. The system grounds answers in an indexed corpus of Pakistani statutes and exposes the reasoning path through validated citations.")}</div> },
      { heading: "My Role in the Team", content: <div className="space-y-3">{para("I served as the AI Engineer and RAG Architect, designing the multi-agent AI architecture and the retrieval-to-response pipeline.")}{bullets(["Designed the agent workflow for query routing, query rewriting, retrieval, legal reasoning, citation validation, and response composition", "Integrated Vertex AI RAG Engine and Gemini 2.5 Flash for grounded legal reasoning", "Structured the AI service for deployment on Google Cloud Run", "Focused on source-grounded responses and transparent legal references rather than unsupported generation"])}</div> },
      { heading: "Multi-Agent Legal RAG", content: bullets(["Query Router Agent identifies user intent and the relevant legal domain", "Query Rewriter Agent expands natural-language questions using domain-aware terminology", "Vertex AI RAG Engine retrieves relevant provisions from the indexed Pakistani legal corpus", "Legal Reasoning Agent generates an answer from retrieved evidence", "Citation Validation Agent checks that references are supported before the response is composed"]) },
      { heading: "Technical Stack", content: bullets(["Frontend: Flutter for a cross-platform web and mobile-ready experience", "Backend: Python and FastAPI services containerized with Docker", "AI: Vertex AI RAG Engine and Gemini 2.5 Flash", "Infrastructure: Google Cloud Run, Firebase, and Google Cloud Shell", "Data: Pakistani statutes including the Constitution, Penal Code, procedural codes, Companies Act, and other major laws"]) },
      { heading: "Reflection", content: para("Juristt reinforced that trust is the central product requirement in legal AI. Retrieval quality, source validation, latency, and a clear boundary between evidence and generation matter as much as the model itself.") },
    ],
  },
  "hackerrank-buy-or-wait": {
    title: "Buy or Wait",
    type: "HackerRank Orchestrate · September 2026 · Solo Build",
    role: "Solo AI Engineer",
    tools: "Agentic AI, deterministic financial rules, structured outputs",
    intro: "An AI-powered financial decision agent designed to evaluate whether a requested purchase is safely affordable rather than simply possible to pay for.",
    category: "Agentic AI · Financial Safety",
    categoryColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
    heroImage: projectHackerrankBuyWait,
    sections: [
      { heading: "Challenge Context", content: <div className="space-y-3">{para("HackerRank Orchestrate is a 24-hour build challenge in which participants design, build, and ship an AI agent, then explain its architecture and tradeoffs to an AI judge.")}{para("The Buy or Wait challenge focused on an affordability decision: whether a user can safely afford a requested expense. The core product question is not only whether money is available now, but whether the purchase is responsible in the context of future cash flow and safety constraints.")}</div> },
      { heading: "My Approach", content: bullets(["Designed and built the agent independently within the 24-hour challenge window", "Separated natural-language interpretation from deterministic affordability and safety rules", "Framed the output as an explainable recommendation rather than an unquestionable financial instruction", "Prepared the implementation and reasoning for HackerRank's AI-judge evaluation"]) },
      { heading: "Decision Design", content: bullets(["Normalize the user's purchase request and financial context", "Forecast the effect of the expense on near-term cash flow", "Apply deterministic safety checks before producing a recommendation", "Return a structured explanation that makes the decision understandable", "Prefer a cautious wait or review path when required information is missing"]) },
      { heading: "Result", content: bullets(["Rank #397", "Top 13%", "Bronze medalist", "Solo 24-hour build"]) },
      { heading: "Reflection", content: para("The challenge strengthened my view that agentic systems should let models interpret context while deterministic layers enforce important boundaries. In financial decisions, clarity and safe defaults are part of the engineering, not an afterthought.") },
    ],
  },
  "hackerrank-multi-modal-review": {
    title: "Multi-Modal Review",
    type: "HackerRank Orchestrate · June 2026 · Solo Build",
    role: "Solo AI Engineer",
    tools: "Agentic AI, multi-modal reasoning, structured outputs",
    intro: "A multi-modal evidence review agent designed to inspect varied inputs, reason over the available evidence, and produce a structured review within a 24-hour build challenge.",
    category: "Multi-Modal AI",
    categoryColor: "text-violet-400 bg-violet-400/10 border-violet-400/25",
    heroImage: projectHackerrankMultimodal,
    sections: [
      { heading: "Challenge Context", content: <div className="space-y-3">{para("The June edition of HackerRank Orchestrate asked participants to design, build, and ship an agent in 24 hours, followed by an AI-judge interview about architecture, decisions, and tradeoffs.")}{para("The Multi-Modal Review challenge required the system to work across more than one type of evidence, making input handling, evidence grounding, and structured output design central to the solution.")}</div> },
      { heading: "My Approach", content: bullets(["Designed and built the agent independently within the 24-hour window", "Organized the workflow around evidence intake, analysis, review, and structured output", "Kept the system explicit about what evidence was available before forming a conclusion", "Prepared an architecture that could be defended during the AI-judge interview"]) },
      { heading: "Review Pipeline", content: bullets(["Accept and normalize multi-modal evidence", "Extract the useful signals from each input type", "Compare evidence against the review question", "Produce a concise, structured result with supporting reasoning", "Escalate ambiguity instead of presenting unsupported certainty"]) },
      { heading: "Result", content: bullets(["Rank #1419", "Top 81%", "Solo 24-hour build", "AI-judge evaluation"]) },
      { heading: "Reflection", content: para("Multi-modal systems make the boundary between input processing and reasoning especially visible. The strongest design is not the one that claims certainty from every input, but the one that makes evidence quality and uncertainty legible.") },
    ],
  },
  "hackerrank-support-agent": {
    title: "Support Agent",
    type: "HackerRank Orchestrate · May 2026 · Solo Build",
    role: "Solo AI Engineer",
    tools: "Python, RAG, classification, terminal agent, structured output",
    intro: "A terminal-based AI agent that triages support tickets across HackerRank, Claude, and Visa using a supplied support corpus and safe escalation rules.",
    category: "Responsible AI · Support Automation",
    categoryColor: "text-pink-400 bg-pink-400/10 border-pink-400/25",
    heroImage: projectHackerrankSupport,
    sections: [
      { heading: "Challenge Context", content: <div className="space-y-3">{para("The May HackerRank Orchestrate hackathon ran from May 1–2, 2026. The task was to build a terminal-based agent that handled real support tickets using only the supplied corpus for ground-truth answers.")}{para("The required output included a status, product area, user-facing response, justification, and request type. High-risk, sensitive, or unsupported cases had to be escalated instead of guessed.")}</div> },
      { heading: "My Approach", content: bullets(["Designed and built the support agent independently within the 24-hour challenge", "Used the provided knowledge corpus as the source of truth", "Separated ticket classification, retrieval, response generation, and justification", "Added safe escalation behavior for unsupported or sensitive requests", "Prepared the code, predictions, transcript, and explanation for evaluation"]) },
      { heading: "Triage Flow", content: bullets(["Classify the request type and product area", "Retrieve the most relevant grounded support information", "Generate a concise response when the corpus supports one", "Escalate when the issue is high-risk, sensitive, or unsupported", "Record the routing decision and justification in the required output schema"]) },
      { heading: "Result", content: bullets(["Rank #474", "Top 36%", "Solo 24-hour build", "Three product ecosystems: HackerRank, Claude, and Visa"]) },
      { heading: "Reflection", content: para("This challenge made safety behavior concrete. A support agent is useful not because it answers every question, but because it knows when the evidence is insufficient and routes the user to a safer path.") },
    ],
  },
  "recruitflow-ai": {
    title: "RecruitFlow AI",
    type: "All Things Agentic Hackathon · Agentic Recruitment",
    role: "Concept originator · Brand and visual identity · Workflow testing",
    tools: "Google ADK, Gemini, FastAPI, Firestore, Cloud Run, Streamlit",
    intro: "An autonomous recruitment workflow that moves from application understanding and policy evaluation to interview scheduling, human review, and candidate communication.",
    category: "Agentic AI · HR Technology",
    categoryColor: "text-violet-400 bg-violet-400/10 border-violet-400/25",
    heroImage: projectRecruitFlow,
    sections: [
      { heading: "Problem Statement", content: para("Recruitment teams spend significant time moving applications through repetitive steps: reading CVs, checking requirements, selecting the next action, finding interview slots, and preparing communication. RecruitFlow AI explores what happens when an agent is given meaningful tools and clear constraints to complete that workflow.") },
      { heading: "My Role in the Team", content: <div className="space-y-3">{para("I proposed the initial HRISTT concept that evolved into RecruitFlow AI, shaped the product branding and visual identity, participated in workflow testing and validation, and prepared the hackathon submission.")}{bullets(["Defined the initial concept direction", "Developed the RecruitFlow AI branding and visual identity", "Tested candidate and recruiter workflow paths", "Prepared the final project story and submission"])}</div> },
      { heading: "Application-to-Action Workflow", content: bullets(["Understand the candidate and job requirements", "Apply a human-defined hiring policy", "Determine interview, human review, or rejection paths", "Check availability and prepare scheduling actions", "Record actions for auditability and review"]) },
      { heading: "Technical Stack", content: bullets(["Frontend: Streamlit with separate candidate and admin experiences", "Backend: FastAPI for applications, jobs, interviews, reviews, and activity logs", "Agent: Google ADK with Gemini and workflow tools", "State: Firestore for applications, decisions, interviews, emails, reviews, and logs", "Deployment: Google Cloud Run"]) },
      { heading: "Reflection", content: para("RecruitFlow AI showed how agentic systems become more trustworthy when the model orchestrates a workflow while deterministic code and human-editable policy define what the workflow is allowed to do.") },
    ],
  },
  "agent-hr": {
    title: "Agent-HR",
    type: "Agents for Humans Hackathon · Human-in-the-Loop Recruitment",
    role: "Project vision · Workflow design · Documentation · Submission",
    tools: "Strands Agents SDK, Amazon Bedrock, Amazon Nova Pro, DynamoDB, FastAPI, Streamlit",
    intro: "A dual-portal recruitment platform that automates repetitive hiring operations while keeping sensitive actions behind a human approval checkpoint.",
    category: "Agentic AI · Human Oversight",
    categoryColor: "text-indigo-400 bg-indigo-400/10 border-indigo-400/25",
    heroImage: projectAgentHR,
    sections: [
      { heading: "Problem Statement", content: para("Recruitment teams need to process resumes, verify requirements, schedule interviews, update records, and communicate with candidates. These tasks are repetitive, but sensitive actions such as scheduling and messaging still require accountable human oversight.") },
      { heading: "My Role in the Team", content: <div className="space-y-3">{para("I helped shape the project vision and presented it as a complete, production-ready solution. My contribution covered the agent workflow, Human-in-the-Loop process, project setup, documentation, architecture presentation, and submission positioning.")}{bullets(["Proposed and refined the AgentHR concept", "Helped define the autonomous recruitment workflow and HITL checkpoint", "Contributed to project setup, documentation, and architecture presentation", "Supported the final Devpost story and submission"])}</div> },
      { heading: "Human-in-the-Loop Architecture", content: bullets(["Parse PDF, DOCX, and TXT resumes into candidate information", "Evaluate qualifications against a human-readable hiring policy", "Decide between interview, human review, or rejection paths", "Pause before sensitive actions such as scheduling and candidate communication", "Maintain an audit trail of agent actions and decisions"]) },
      { heading: "Technical Stack", content: bullets(["Agent orchestration: Strands Agents SDK", "Model layer: Amazon Nova Pro through Amazon Bedrock", "Tools: candidate retrieval, job requirements, policy retrieval, scheduling, human review, and email drafting", "Backend and state: FastAPI and DynamoDB", "Interfaces and deployment: Streamlit and AWS runtime services"]) },
      { heading: "Reflection", content: para("Agent-HR reinforced a central principle of responsible automation: autonomy is valuable only when the system clearly identifies the points where a person must remain in control. The HITL checkpoint turns that principle into an explicit product behavior.") },
    ],
  },
} as const;

type CaseStudyKey = keyof typeof caseStudies;

const AdditionalCaseStudies = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? caseStudies[slug as CaseStudyKey] : undefined;

  if (!study) return null;

  return <CaseStudyLayout {...study} />;
};

export default AdditionalCaseStudies;
