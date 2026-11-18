import { ArrowRight, CalendarDays, ExternalLink, Github, Medal, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const featuredHackathons = [
  {
    name: "Lovable SheBuilds · Season 4",
    project: "Seen",
    period: "2026",
    mode: "Solo build",
    result: "Live multilingual product",
    summary: "A private reflection experience that helps people recognize transferable skills in everyday work and choose one manageable next step.",
    eventUrl: "https://lovable.dev/",
    projectUrl: "https://the-seen.lovable.app",
    accent: "pink",
  },
  {
    name: "NASA Space Apps Challenge 2026",
    project: "SkyTrace — Infrared Sky Explorer",
    period: "2026",
    mode: "Team",
    result: "Planet X and SPHEREx challenge",
    summary: "A public-facing astronomy tool for exploring SPHEREx infrared sky images over time and spotting motion in the data.",
    eventUrl: "https://www.spaceappschallenge.org/2026/challenges/planet-x-and-spherex/",
    projectUrl: "https://github.com/Ayeshakhan77/SkyTrace-Infrared-Sky-Explorer",
    accent: "blue",
  },
  {
    name: "Build with Gemini XPRIZE",
    project: "Juristt",
    period: "August 2026",
    mode: "Team",
    result: "Grounded legal intelligence platform",
    summary: "Built a multi-agent legal research system for Pakistan with source-grounded answers, citation validation, and accessible retrieval.",
    eventUrl: "https://xprize.devpost.com/",
    projectUrl: "/case-study/juristt",
    accent: "indigo",
  },
  {
    name: "HEC Gen AI Hackathon 2026",
    project: "Tahqiq AI",
    period: "2026",
    mode: "Team",
    result: "253 HEC-verified universities",
    summary: "Created an explainable university counselor with Roman Urdu input, a five-agent pipeline, ranked matches, and Urdu guidance.",
    eventUrl: "https://www.hec.gov.pk/",
    projectUrl: "/case-study/tahqiq-ai",
    accent: "violet",
  },
] as const;

const accentStyles = {
  pink: "border-pink-400/25 hover:border-pink-400/55 text-pink-300 bg-pink-400/10",
  blue: "border-blue-400/25 hover:border-blue-400/55 text-blue-300 bg-blue-400/10",
  indigo: "border-indigo-400/25 hover:border-indigo-400/55 text-indigo-300 bg-indigo-400/10",
  violet: "border-violet-400/25 hover:border-violet-400/55 text-violet-300 bg-violet-400/10",
} as const;

const FeaturedHackathons = () => (
  <section id="featured-hackathons" className="py-16 sm:py-24 px-4 sm:px-6">
    <div className="container mx-auto max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-3">Selected hackathons</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Build fast. Think deeply.</h2>
          <p className="font-body text-muted-foreground text-sm mt-3 max-w-2xl leading-relaxed">
            A focused view of the competitions that best represent my product thinking, technical range, and ability to ship under pressure.
          </p>
        </div>
        <Link to="/hackathons" className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-primary/80 transition-colors shrink-0">
          View all hackathons <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {featuredHackathons.map((hackathon) => {
          const accent = accentStyles[hackathon.accent];
          const projectIsRoute = hackathon.projectUrl.startsWith("/");
          return (
            <article key={hackathon.name} className={`group relative min-w-0 rounded-xl border bg-card p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${accent.split(" ").filter((item) => item.startsWith("border-") || item.startsWith("hover:border-")).join(" ")}`}>
              <div className={`absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-60 ${accent.split(" ").find((item) => item.startsWith("text-")) ?? "text-primary"}`} />
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <span className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest ${accent}`}>
                  <Trophy size={11} /> {hackathon.mode}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground"><CalendarDays size={11} />{hackathon.period}</span>
              </div>
              <h3 className="break-words text-foreground font-bold text-base sm:text-lg leading-snug group-hover:text-primary transition-colors">{hackathon.name}</h3>
              <p className={`mt-1 break-words font-mono text-xs ${accent.split(" ").find((item) => item.startsWith("text-")) ?? "text-primary"}`}>{hackathon.project}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{hackathon.summary}</p>
              <div className="mt-4 flex items-start gap-2 font-mono text-[10px] leading-relaxed text-foreground/80"><Medal size={12} className={`mt-0.5 shrink-0 ${accent.split(" ").find((item) => item.startsWith("text-")) ?? "text-primary"}`} /><span>{hackathon.result}</span></div>
              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/40 pt-4">
                <a href={hackathon.eventUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors">Event <ExternalLink size={11} /></a>
                {projectIsRoute ? (
                  <Link to={hackathon.projectUrl} className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors">Project case study <ArrowRight size={11} /></Link>
                ) : (
                  <a href={hackathon.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors">Project <Github size={11} /></a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default FeaturedHackathons;
