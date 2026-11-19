import { 
  ArrowUpRight, 
  BriefcaseBusiness, 
  Cpu, 
  FolderKanban, 
  GraduationCap, 
  HeartHandshake, 
  Lightbulb, 
  PenLine, 
  Trophy 
} from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    number: "01",
    label: "Projects & Deep Dives",
    badge: "12 Systems & Case Studies",
    title: "Systems built for real constraints",
    description: "Multi-agent RAG, clinical triage, legal intelligence, and accessible UX across 12 full builds.",
    route: "/projects",
    icon: FolderKanban,
    accent: "cyan",
  },
  {
    number: "02",
    label: "Hackathons & Sprints",
    badge: "10 Competitions · Wins",
    title: "Build fast. Think deeply.",
    description: "NASA Space Apps, Lovable SheBuilds, HEC Gen AI, and HackerRank Orchestrate competitive builds.",
    route: "/hackathons",
    icon: Trophy,
    accent: "gold",
  },
  {
    number: "03",
    label: "Why Me & Research",
    badge: "MSc AI Candidate",
    title: "Purpose-driven engineering",
    description: "The scholarship journey, distance-learning story, and research questions behind my MSc ambition.",
    route: "/why-me",
    icon: Lightbulb,
    accent: "teal",
  },
  {
    number: "04",
    label: "Skills & Architecture",
    badge: "AI · Full-Stack · UX",
    title: "The technical toolkit",
    description: "FastAPI, LangChain, React, PyTorch, Figma, and human-centered design principles.",
    route: "/skills",
    icon: Cpu,
    accent: "cyan",
  },
  {
    number: "05",
    label: "Writing & Thought",
    badge: "5 Articles Live",
    title: "Learning in public",
    description: "7-part Responsible AI series for healthcare in Pakistan and articles on women in STEM.",
    route: "/writing",
    icon: PenLine,
    accent: "teal",
  },
  {
    number: "06",
    label: "Community & Leadership",
    badge: "NextGenShe Founder",
    title: "Teaching and leadership",
    description: "Mentoring 20+ students, AI Simplified series, and cross-border hackathon team leadership.",
    route: "/community",
    icon: HeartHandshake,
    accent: "gold",
  },
  {
    number: "07",
    label: "Experience & Roles",
    badge: "AI Engineer & Judge",
    title: "From idea to implementation",
    description: "AI engineering, hackathon judging (DYLP/NYLP), RAG architecture, and product leadership.",
    route: "/experience",
    icon: BriefcaseBusiness,
    accent: "cyan",
  },
  {
    number: "08",
    label: "Education & Honors",
    badge: "3.93 CGPA · PEEF Scholar",
    title: "The foundation underneath",
    description: "Virtual University BS Software Engineering, 6-year PEEF Merit Scholar, and certifications.",
    route: "/education",
    icon: GraduationCap,
    accent: "gold",
  },
] as const;

const accentStyles = {
  cyan: "border-cyan-500/25 hover:border-cyan-400/60 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400",
  teal: "border-teal-500/25 hover:border-teal-400/60 bg-teal-500/5 hover:bg-teal-500/10 text-teal-400",
  gold: "border-amber-500/25 hover:border-amber-400/60 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400",
} as const;

const SectionExplore = () => (
  <section id="explore" className="py-20 sm:py-28 px-4 sm:px-6 bg-secondary/15 border-y border-border/40">
    <div className="container mx-auto max-w-5xl">
      <div className="mb-12 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-xs mb-3">
          <span>●</span> Interactive Directory
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          Explore the Full Portfolio.
        </h2>
        <p className="font-body text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed">
          Every pillar of my work has its own dedicated space. Choose a section below to dive deep into projects, hackathons, research principles, and community impact.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const accentClass = accentStyles[section.accent];
          return (
            <Link
              key={section.label}
              to={section.route}
              className={`group relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl bg-card/80 backdrop-blur-sm ${accentClass}`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-background/80 border border-border/50">
                    <Icon size={16} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="opacity-60 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

                <div className="inline-block text-[10px] font-mono tracking-wide px-2 py-0.5 rounded-full border border-border/60 bg-background/60 mb-2">
                  {section.badge}
                </div>

                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                  {section.label}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  {section.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border/40 font-mono text-[11px] text-foreground/80 flex items-center justify-between">
                <span>Explore</span>
                <span className="font-mono text-xs text-primary">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default SectionExplore;
