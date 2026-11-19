import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Brain, Code2, Palette, Globe, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { downloadResume } from "@/lib/resume";
import NeuralCanvas from "@/components/NeuralCanvas";

const roles = [
  { icon: Brain,   label: "AI Engineer",               color: "text-cyan-800 dark:text-cyan-300",    bg: "bg-cyan-50 dark:bg-cyan-400/10",    border: "border-cyan-300 dark:border-cyan-400/25",    href: "/skills"    },
  { icon: Code2,   label: "Frontend Developer",         color: "text-teal-800 dark:text-teal-300",    bg: "bg-teal-50 dark:bg-teal-400/10",    border: "border-teal-300 dark:border-teal-400/25",    href: "/projects"  },
  { icon: Palette, label: "UX Designer",                color: "text-sky-800 dark:text-sky-300",      bg: "bg-sky-50 dark:bg-sky-400/10",      border: "border-sky-300 dark:border-sky-400/25",      href: "/skills"    },
  { icon: Globe,   label: "Social Impact Technologist", color: "text-amber-800 dark:text-amber-300",  bg: "bg-amber-50 dark:bg-amber-400/10",  border: "border-amber-300 dark:border-amber-400/25",  href: "/why-me"     },
];

const stats = [
  { value: "3.93",  label: "CGPA · Top 1%",    gold: true },
  { value: "98.5",  label: "NSCT Percentile",  gold: false },
  { value: "6yr",   label: "PEEF Scholar",     gold: true },
  { value: "4K+",   label: "Hackathon Pool",   gold: false },
  { value: "5",     label: "Articles Live",    gold: false },
];

const Hero = () => {
  const navigate = useNavigate();

  const handleAction = (target: string) => {
    if (target.startsWith("#")) {
      const el = document.getElementById(target.replace("#", ""));
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(target);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
      <NeuralCanvas />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground mb-5"
        >
          MSc AI Candidate · Women in STEM Advocate · Pakistan
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4 leading-[0.95]"
        >
          <span className="text-foreground">Kainat</span>
          <br />
          <span className="text-gradient">Nadeem</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-12 h-px bg-primary/40 mx-auto mb-6"
        />

        {/* Role pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {roles.map((role, i) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={role.label}
                onClick={() => handleAction(role.href)}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.32 + i * 0.07 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border backdrop-blur-sm cursor-pointer transition-shadow hover:shadow-sm ${role.color} ${role.bg} ${role.border}`}
              >
                <Icon size={11} />
                {role.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.36, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-bold text-foreground max-w-2xl mx-auto mb-4 leading-snug tracking-tight"
        >
          Where rigorous engineering meets{" "}
          <span className="text-gradient">human understanding.</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.44, ease: "easeOut" }}
          className="font-body text-foreground/85 dark:text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-4 leading-relaxed font-normal"
        >
          I build AI-powered systems and design interfaces for the people
          who need them most —{" "}
          <span className="text-foreground font-semibold">
            families, children, and underserved communities.
          </span>
        </motion.p>

        {/* Research intent line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.52, ease: "easeOut" }}
          className="font-mono text-xs text-foreground/90 dark:text-muted-foreground/90 max-w-lg mx-auto mb-9 leading-relaxed border border-border/80 dark:border-primary/20 rounded-lg px-4 py-2.5 bg-card/90 dark:bg-card/60 backdrop-blur-sm shadow-sm"
        >
          Building these systems raised questions I cannot yet answer —{" "}
          <span className="text-primary font-semibold">
            about accountability, safety, and who AI leaves behind.
          </span>{" "}
          Pursuing an MSc in AI to research them properly.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.58, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <button
            onClick={() => handleAction("#explore")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 flex items-center gap-2 cursor-pointer"
          >
            <Compass size={15} />
            Explore Portfolio
          </button>
          <button
            onClick={() => handleAction("#flagship-projects")}
            className="border border-border/70 bg-card/60 backdrop-blur-sm px-6 py-3 rounded-lg text-sm font-medium text-foreground hover:border-primary/40 hover:bg-card/90 transition-all flex items-center gap-2 cursor-pointer"
          >
            Flagship Projects
            <ArrowDown size={14} className="text-primary" />
          </button>
          <button
            onClick={downloadResume}
            className="border border-border/70 bg-card/60 backdrop-blur-sm px-5 py-3 rounded-lg text-sm font-medium text-foreground hover:border-primary/40 hover:bg-card/90 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download size={14} className="text-primary" />
            Resume
          </button>
          <a
            href="https://github.com/KainatNadeemCodes"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border/70 bg-card/60 backdrop-blur-sm px-5 py-3 rounded-lg text-sm font-medium text-foreground hover:border-primary/40 hover:bg-card/90 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Github size={14} className="text-primary" />
            GitHub
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.68, ease: "easeOut" }}
          className="grid w-full max-w-xl mx-auto grid-cols-5 items-stretch gap-0 bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-sm"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`min-w-0 px-2 py-3 text-center ${i < stats.length - 1 ? "border-r border-border/40" : ""}`}
            >
              <p className={`font-bold text-sm sm:text-base font-mono leading-none mb-1 ${stat.gold ? "text-amber-800 dark:text-amber-400" : "text-foreground"}`}>
                {stat.value}
              </p>
              <p className="text-foreground/75 dark:text-muted-foreground text-[9px] sm:text-[10px] font-mono tracking-tight leading-tight font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => handleAction("#explore")}
          className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-1.5 cursor-pointer hover:border-primary transition-colors"
          aria-label="Scroll to sections"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
