import { ArrowUpRight, BriefcaseBusiness, GraduationCap, HeartHandshake, Lightbulb, PenLine } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "01",
    label: "Why Me",
    title: "Purpose-driven engineering",
    description: "The scholarship story, research direction, and principles behind the systems I build.",
    route: "/why-me",
    icon: Lightbulb,
    accent: "violet",
  },
  {
    number: "02",
    label: "Community",
    title: "Teaching and leadership",
    description: "Mentoring students, simplifying AI, and opening practical routes into technology.",
    route: "/community",
    icon: HeartHandshake,
    accent: "pink",
  },
  {
    number: "03",
    label: "Experience",
    title: "From idea to implementation",
    description: "AI engineering, UX research, frontend development, judging, and team leadership.",
    route: "/experience",
    icon: BriefcaseBusiness,
    accent: "blue",
  },
  {
    number: "04",
    label: "Skills",
    title: "The technical toolkit",
    description: "AI systems, full-stack delivery, accessible interfaces, and responsible design methods.",
    route: "/skills",
    icon: Lightbulb,
    accent: "cyan",
  },
  {
    number: "05",
    label: "Writing",
    title: "Learning in public",
    description: "Research reflections, responsible AI notes, and explainers from the build process.",
    route: "/writing",
    icon: PenLine,
    accent: "amber",
  },
  {
    number: "06",
    label: "Education",
    title: "The foundation underneath",
    description: "Academic milestones, certifications, scholarships, and the next research direction.",
    route: "/education",
    icon: GraduationCap,
    accent: "emerald",
  },
] as const;

const accentStyles = {
  violet: "text-violet-300 border-violet-400/25 hover:border-violet-400/55 bg-violet-400/10",
  pink: "text-pink-300 border-pink-400/25 hover:border-pink-400/55 bg-pink-400/10",
  blue: "text-blue-300 border-blue-400/25 hover:border-blue-400/55 bg-blue-400/10",
  cyan: "text-cyan-300 border-cyan-400/25 hover:border-cyan-400/55 bg-cyan-400/10",
  amber: "text-amber-300 border-amber-400/25 hover:border-amber-400/55 bg-amber-400/10",
  emerald: "text-emerald-300 border-emerald-400/25 hover:border-emerald-400/55 bg-emerald-400/10",
} as const;

const SectionExplore = () => (
  <section id="explore" className="py-16 sm:py-24 px-4 sm:px-6">
    <div className="container mx-auto max-w-5xl">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-3">Explore the portfolio</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">More than a project list.</h2>
        <p className="font-body text-muted-foreground text-sm mt-3 leading-relaxed">
          Choose a path to explore the thinking, experience, and people-focused work behind the products.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const accent = accentStyles[section.accent];
          return (
            <Link
              key={section.label}
              to={section.route}
              className={`group relative min-w-0 rounded-xl border bg-card p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${accent}`}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] opacity-70">{section.number}</span>
                  <Icon size={16} />
                </div>
                <ArrowUpRight size={16} className="opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-75">{section.label}</p>
              <h3 className="mt-2 break-words text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">{section.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.description}</p>
              <div className="mt-5 border-t border-border/40 pt-3 font-mono text-[10px] text-foreground/75">Explore section →</div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default SectionExplore;
