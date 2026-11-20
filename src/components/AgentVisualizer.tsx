import React, { useState } from "react";
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  FileText,
  ArrowRight,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Sliders,
} from "lucide-react";

interface Step {
  id: number;
  name: string;
  agent: string;
  icon: React.ElementType;
  badge: string;
  decision: string;
  payload: string;
  signal: string;
  latency: string;
}

const SAMPLE_QUERIES = [
  {
    title: "Overseas Power of Attorney (Property)",
    query:
      "Can an overseas citizen remotely execute a Special Power of Attorney for property in Punjab without physical embassy presence?",
  },
  {
    title: "E-Commerce Consumer Dispute",
    query:
      "What statutory timeline applies to an online consumer filing a defective delivery claim under the Punjab Consumer Protection Act?",
  },
];

const STEPS: Step[] = [
  {
    id: 1,
    name: "Query Decomposer",
    agent: "Parsing & Entity Extractor",
    icon: Search,
    badge: "Structural Normalization",
    decision:
      "Extracted entities: { jurisdiction: 'Punjab', subject: 'Special Power of Attorney', persona: 'Overseas Citizen', intent: 'Remote Execution' }",
    payload:
      "Stripped conversational filler; extracted statutory parameters and identified cross-jurisdictional NADRA/Foreign Office overlap.",
    signal:
      "Recruiter takeaway: Prevents garbage-in/garbage-out by pre-processing raw user text before vector embedding.",
    latency: "62ms",
  },
  {
    id: 2,
    name: "Semantic Router",
    agent: "Corpus Routing Agent",
    icon: Filter,
    badge: "Latency Optimization",
    decision:
      "Matched partition: 'Punjab Land Revenue & NADRA E-Attestation 2021'. Excluded: Corporate & Penal Code corpora.",
    payload:
      "Filtered 1.2M token corpus down to relevant statutory subsections, saving ~40% inference latency.",
    signal:
      "Recruiter takeaway: Understands retrieval economics and avoids bloated context windows.",
    latency: "45ms",
  },
  {
    id: 3,
    name: "Hybrid Retrieval",
    agent: "Vertex AI Dense + BM25",
    icon: Sliders,
    badge: "Deterministic Search",
    decision:
      "Executed dual-pass retrieval: Dense semantic match (0.89 cosine) + BM25 lexical match for 'Rule 4(b) E-Attestation'.",
    payload:
      "Retrieved 3 statutory chunks from official Gazette notifications; prioritized exact section references.",
    signal:
      "Recruiter takeaway: Knows that dense embeddings alone fail on statutory clause numbers without lexical BM25 fallback.",
    latency: "148ms",
  },
  {
    id: 4,
    name: "Citation Verifier",
    agent: "Hallucination Guardrail",
    icon: ShieldCheck,
    badge: "Zero-Hallucination Policy",
    decision:
      "Verified all 3 statutory references against indexed primary legal sources. Pruned 1 unverified general claim.",
    payload:
      "100% citation match achieved. Assertions without explicit subsection attribution were purged before generation.",
    signal:
      "Recruiter takeaway: Builds mission-critical guardrails rather than blindly trusting LLM generation in legal/healthcare domains.",
    latency: "94ms",
  },
  {
    id: 5,
    name: "Grounded Synthesis",
    agent: "Gemini 2.5 Legal Composer",
    icon: FileText,
    badge: "Structured Output",
    decision:
      "Composed natural language summary citing NADRA Biometric Verification Rules (2021) Section 3(a).",
    payload:
      "Result: 'Yes. Remote digital Power of Attorney is legally valid via NADRA's online consular portal, provided biometrics are submitted.'",
    signal:
      "Recruiter takeaway: Delivers auditable, human-in-the-loop AI with clear attribution.",
    latency: "180ms",
  },
];

export const AgentVisualizer: React.FC = () => {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [activeStepId, setActiveStepId] = useState(1);

  const activeStep = STEPS.find((s) => s.id === activeStepId) || STEPS[0];
  const query = SAMPLE_QUERIES[selectedQueryIndex];

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/90 shadow-[0_10px_35px_rgba(0,0,0,0.4)] backdrop-blur-md">
      {/* Visualizer Header */}
      <div className="border-b border-slate-800/90 bg-slate-900/80 px-5 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Cpu className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  Juristt Multi-Agent Query Pipeline
                </h3>
                <span className="rounded-full bg-cyan-950/80 px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-cyan-800/40">
                  Interactive Tracer
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Click any step to inspect the agent's deterministic reasoning path.
              </p>
            </div>
          </div>

          {/* Query Preset Selector */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-950/70 p-1 rounded-xl border border-slate-800">
            {SAMPLE_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedQueryIndex(idx);
                  setActiveStepId(1);
                }}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                  selectedQueryIndex === idx
                    ? "bg-cyan-600/30 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Sample {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Sample Query Box */}
        <div className="mt-3.5 rounded-xl bg-slate-900/60 p-3 border border-slate-800/80 text-xs text-slate-200">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-1">
            Input Legal Inquiry:
          </span>
          <p className="font-serif italic text-slate-300">&ldquo;{query.query}&rdquo;</p>
        </div>
      </div>

      {/* 5-Step Pipeline Stepper Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 px-4 py-3 overflow-x-auto scrollbar-thin">
        <div className="flex items-center justify-between min-w-[560px] gap-2">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = step.id === activeStepId;
            const isCompleted = step.id < activeStepId;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setActiveStepId(step.id)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border border-cyan-500/60 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                      : isCompleted
                      ? "bg-slate-900/40 border border-slate-800/80 text-slate-300 hover:border-slate-700"
                      : "bg-slate-950/40 border border-slate-900 text-slate-500 hover:text-slate-400"
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-mono font-semibold ${
                      isActive
                        ? "bg-cyan-500 text-slate-950"
                        : isCompleted
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : step.id}
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs font-medium tracking-tight whitespace-nowrap">
                      {step.name}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400">
                      {step.latency}
                    </p>
                  </div>
                </button>

                {idx < STEPS.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-700" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Step Deep Dive */}
      <div className="p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
              Active Agent Node (Step {activeStep.id} of 5)
            </span>
            <h4 className="text-base font-semibold text-white flex items-center gap-2 mt-0.5">
              <span>{activeStep.name}</span>
              <span className="text-xs font-normal text-slate-400">
                — {activeStep.agent}
              </span>
            </h4>
          </div>
          <span className="self-start sm:self-auto rounded-lg bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-1 text-xs font-mono text-cyan-300">
            {activeStep.badge}
          </span>
        </div>

        {/* Step Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              1. Deterministic Decision Logic:
            </span>
            <p className="text-xs font-mono text-cyan-200/90 leading-relaxed">
              {activeStep.decision}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              2. Agent Execution Result:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStep.payload}
            </p>
          </div>
        </div>

        {/* Recruiter Signal Banner */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 flex items-start gap-3">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-emerald-300 block mb-0.5">
              System Architecture Proof Point:
            </span>
            <p className="text-slate-300 leading-relaxed">{activeStep.signal}</p>
          </div>
        </div>

        {/* Navigation Step Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setActiveStepId((prev) => Math.max(1, prev - 1))}
            disabled={activeStepId === 1}
            className="rounded-lg border border-slate-800 px-3 py-1.5 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous Step
          </button>

          <span className="text-[11px] font-mono text-slate-500">
            Step {activeStepId} of 5
          </span>

          <button
            onClick={() => setActiveStepId((prev) => (prev % 5) + 1)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm hover:from-cyan-500 hover:to-blue-500 transition-all active:scale-95"
          >
            <span>{activeStepId === 5 ? "Restart Trace" : "Next Step"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
