import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import projectHealth from "@/assets/project-health.jpg";
import projectTahqiq from "@/assets/project-tahqiq.jpg";
import projectJuristt from "@/assets/project-juristt.jpg";

const flagshipProjects = [
  {
    number: "01",
    title: "Juristt",
    positioning: "Agentic legal intelligence for Pakistan",
    summary: "A grounded legal research workspace combining multi-agent routing, trusted retrieval, citation validation, and accessible answers.",
    image: projectJuristt,
    route: "/case-study/juristt",
    accent: "indigo",
    label: "Agentic Legal RAG",
    evidence: ["10 statutes", "5 agents", "Grounded RAG", "Cloud Run"],
  },
  {
    number: "02",
    title: "Tahqiq AI",
    positioning: "Explainable university guidance in Urdu",
    summary: "A five-agent counselor that turns Roman Urdu questions into ranked HEC-verified university matches, explanations, and a family-ready PDF.",
    image: projectTahqiq,
    route: "/case-study/tahqiq-ai",
    accent: "violet",
    label: "Explainable AI",
    evidence: ["253 universities", "5-agent pipeline", "Under 30 sec", "Urdu XAI"],
  },
  {
    number: "03",
    title: "AI-Powered Smart Health Assistant",
    positioning: "Ethical triage for low-resource communities",
    summary: "An AI triage system that classifies severity, handles Urdu-English inputs, routes people to appropriate care, and never pretends to diagnose.",
    image: projectHealth,
    route: "/case-study/smart-health-assistant",
    accent: "emerald",
    label: "Responsible AI",
    evidence: ["84%+ accuracy", "5 severity levels", "Urdu-English", "Human oversight"],
  },
] as const;

const accentStyles = {
  indigo: {
    border: "hover:border-indigo-400/55",
    text: "text-indigo-300",
    badge: "border-indigo-400/30 bg-indigo-400/10 text-indigo-300",
    glow: "hover:shadow-indigo-500/15",
    line: "from-indigo-400/70",
  },
  violet: {
    border: "hover:border-violet-400/55",
    text: "text-violet-300",
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    glow: "hover:shadow-violet-500/15",
    line: "from-violet-400/70",
  },
  emerald: {
    border: "hover:border-emerald-400/55",
    text: "text-emerald-300",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    glow: "hover:shadow-emerald-500/15",
    line: "from-emerald-400/70",
  },
} as const;

const FlagshipProjects = () => (
  <section id="flagship-projects" className="py-16 sm:py-24 px-4 sm:px-6">
    <div className="container mx-auto max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-3">Flagship projects</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Systems built for real constraints.</h2>
          <p className="font-body text-muted-foreground text-sm mt-3 max-w-2xl leading-relaxed">
            Three projects at the intersection of AI engineering, responsible design, and social impact. Each card opens a detailed case study.
          </p>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-primary/80 transition-colors shrink-0"
        >
          View all projects <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
        {flagshipProjects.map((project) => {
          const accent = accentStyles[project.accent];
          return (
            <Link
              key={project.title}
              to={project.route}
              aria-label={`Open ${project.title} case study`}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${accent.border} ${accent.glow}`}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-60" />
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className={`rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] uppercase backdrop-blur-sm ${accent.badge}`}>
                    Flagship project
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/25 px-2.5 py-1 font-mono text-[9px] text-white/75 backdrop-blur-sm">
                    Case study <ExternalLink size={10} />
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className={`font-mono text-xs ${accent.text}`}>{project.number}</span>
                  <span className="h-px w-8 bg-white/30" />
                  <span className="font-mono text-[9px] tracking-[0.14em] text-white/65 uppercase">{project.label}</span>
                </div>
              </div>

              <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                <h3 className="break-words text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                <p className={`mt-1 break-words font-mono text-[10px] uppercase tracking-[0.08em] ${accent.text}`}>{project.positioning}</p>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.evidence.map((item) => (
                    <span key={item} className="rounded-md border border-border/40 bg-secondary/70 px-2 py-1 font-mono text-[10px] text-secondary-foreground">
                      {item}
                    </span>
                  ))}
                </div>

                <div className={`mt-6 flex items-center justify-between gap-3 border-t border-border/40 pt-4 font-mono text-xs ${accent.text}`}>
                  <span className="inline-flex min-w-0 items-center gap-2 font-semibold"><span>Read full case study</span><ArrowRight size={14} className="shrink-0 transition-transform group-hover:translate-x-1" /></span>
                  <GitBranch size={14} className="opacity-60" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default FlagshipProjects;
