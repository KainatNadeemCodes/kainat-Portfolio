import { ReactNode } from "react";
import { ArrowLeft, ExternalLink, Github, Trophy, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";

export interface Section {
  heading: string;
  content: ReactNode;
}

export interface CaseStudyLayoutProps {
  title: string;
  type: string;
  role: string;
  tools: string;
  intro: string;
  category: string;
  categoryColor: string;
  heroImage: string;
  sections: Section[];
  demoUrl?: string | null;
  repoUrl?: string | null;
  submissionUrl?: string | null;
}

const CaseStudyLayout = ({
  title,
  type,
  role,
  tools,
  intro,
  category,
  categoryColor,
  heroImage,
  sections,
  demoUrl,
  repoUrl,
  submissionUrl,
}: CaseStudyLayoutProps) => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        {/* Top Breadcrumb Bar */}
        <div className="pt-24 sm:pt-28 border-b border-border/40 bg-card/40 backdrop-blur-md">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-foreground transition-colors">
                Projects
              </Link>
              <span>/</span>
              <span className="text-primary font-medium">{title}</span>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-mono"
            >
              <ArrowLeft size={13} />
              All Projects
            </Link>
          </div>
        </div>

        {/* Hero image banner */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-4xl">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`inline-block text-xs font-mono px-3 py-1 rounded-full border mb-3 ${categoryColor}`}
              >
                {category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold text-foreground leading-tight"
              >
                {title}
              </motion.h1>
            </div>
          </div>
        </div>

        {/* Meta strip */}
        <div className="border-b border-border/40 bg-card/30">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {[
                { label: "Challenge / Type", value: type },
                { label: "Role", value: role },
                { label: "Tech Stack", value: tools },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground font-medium">{item.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Direct Action Links if available */}
            {(demoUrl || repoUrl || submissionUrl) && (
              <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-border/40">
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-mono px-3.5 py-2 rounded-md hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </a>
                )}
                {repoUrl && (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-border/70 bg-card text-foreground text-xs font-mono px-3.5 py-2 rounded-md hover:border-primary/40 transition-colors"
                  >
                    <Github size={13} className="text-primary" />
                    GitHub Repository
                  </a>
                )}
                {submissionUrl && (
                  <a
                    href={submissionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border border-border/70 bg-card text-foreground text-xs font-mono px-3.5 py-2 rounded-md hover:border-primary/40 transition-colors"
                  >
                    <Trophy size={13} className="text-amber-400" />
                    Competition Page
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 py-12 md:py-16 space-y-14 md:space-y-16">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <p className="text-lg md:text-xl text-secondary-foreground leading-relaxed border-l-2 border-primary/60 pl-5">
              {intro}
            </p>
          </motion.div>

          {/* Sections */}
          {sections.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-primary text-xs tracking-widest uppercase">
                  0{i + 1}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  {section.heading}
                </h2>
              </div>
              <div className="pl-6 sm:pl-8 border-l border-border/40">
                {section.content}
              </div>
            </motion.div>
          ))}

          {/* Navigation Bar at Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="pt-8 border-t border-border/40 flex flex-wrap items-center justify-between gap-4"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer font-mono"
            >
              <ArrowLeft size={14} />
              Back to Projects Archive
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/hackathons"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
              >
                Hackathons Archive
                <ChevronRight size={13} />
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
              >
                Contact
                <ChevronRight size={13} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CaseStudyLayout;
