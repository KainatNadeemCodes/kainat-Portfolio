import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import type { ReactNode } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import SmartHealthCaseStudy from "./pages/SmartHealthCaseStudy";
import NextGenSheCaseStudy from "./pages/NextGenSheCaseStudy";
import HavenCaseStudy from "./pages/HavenCaseStudy";
import TahqiqAICaseStudy from "@/pages/CaseStudyTahqiqAI";
import AdditionalCaseStudies from "@/pages/AdditionalCaseStudies";

import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";

import ScholarshipSignal from "@/components/ScholarshipSignal";
import Testimonials from "@/components/Testimonials";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Writing from "@/components/Writing";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Hackathons from "@/components/Hackathons";

const queryClient = new QueryClient();

type SectionPageKey =
  | "projects"
  | "hackathons"
  | "why-me"
  | "community"
  | "experience"
  | "skills"
  | "writing"
  | "education";

type SectionPageConfig = {
  eyebrow: string;
  title: string;
  intro: string;
  content: ReactNode;
};

const sectionPages: Record<SectionPageKey, SectionPageConfig> = {
  projects: {
    eyebrow: "Projects",
    title: "Systems built for real constraints.",
    intro:
      "Explore the complete project archive, including AI systems, social-impact products, accessibility-focused interfaces, and technical experiments.",
    content: <Projects />,
  },

  hackathons: {
    eyebrow: "Hackathons",
    title: "Build fast. Think deeply.",
    intro:
      "Ten competition experiences spanning agentic AI, responsible automation, social impact, science, and cross-border collaboration.",
    content: <Hackathons />,
  },

  "why-me": {
    eyebrow: "Why Me",
    title: "Purpose before polish.",
    intro:
      "The story, principles, and research questions behind my work in AI and social-impact technology.",
    content: <ScholarshipSignal />,
  },

  community: {
    eyebrow: "Community",
    title: "Technology should open doors.",
    intro:
      "Teaching, mentoring, judging, and collaborating to make technical opportunity more accessible.",
    content: <Testimonials />,
  },

  experience: {
    eyebrow: "Experience",
    title: "Initiative, depth, and delivery.",
    intro:
      "A timeline of the roles and projects where I turned constraints into useful systems.",
    content: <Experience />,
  },

  skills: {
    eyebrow: "Skills",
    title: "A practical technical toolkit.",
    intro:
      "The methods, technologies, and working habits I use to move from problem framing to a shipped product.",
    content: <Skills />,
  },

  writing: {
    eyebrow: "Writing",
    title: "Learning in public.",
    intro:
      "Research reflections and technical explainers from the systems I build and the questions they raise.",
    content: <Writing />,
  },

  education: {
    eyebrow: "Education",
    title: "The foundation underneath.",
    intro:
      "Academic milestones, scholarships, certifications, and the direction I am taking next.",
    content: <Education />,
  },
};

const SectionPage = ({ page }: { page: SectionPageKey }) => {
  const config = sectionPages[page];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 sm:pt-28">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-wide text-muted-foreground">
              <Link
                to="/"
                className="transition-colors hover:text-foreground"
              >
                Home
              </Link>

              <span className="text-border">/</span>

              <span className="text-primary">{config.eyebrow}</span>
            </div>

            <div className="max-w-2xl pt-6 pb-2 sm:pt-8 sm:pb-4">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {config.eyebrow}
              </p>

              <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
                {config.title}
              </h1>

              <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground">
                {config.intro}
              </p>
            </div>
          </div>

          {config.content}

          <Contact />
        </main>
      </div>
    </PageTransition>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Index />} />

          {/* Full archive pages */}
          <Route
            path="/projects"
            element={<SectionPage page="projects" />}
          />

          <Route
            path="/hackathons"
            element={<SectionPage page="hackathons" />}
          />

          {/* Refined dedicated pages */}
          <Route
            path="/why-me"
            element={<SectionPage page="why-me" />}
          />

          <Route
            path="/community"
            element={<SectionPage page="community" />}
          />

          <Route
            path="/experience"
            element={<SectionPage page="experience" />}
          />

          <Route
            path="/skills"
            element={<SectionPage page="skills" />}
          />

          <Route
            path="/writing"
            element={<SectionPage page="writing" />}
          />

          <Route
            path="/education"
            element={<SectionPage page="education" />}
          />

          {/* Existing case-study pages */}
          <Route
            path="/case-study/smart-health-assistant"
            element={<SmartHealthCaseStudy />}
          />

          <Route
            path="/case-study/nextgenshe"
            element={<NextGenSheCaseStudy />}
          />

          <Route
            path="/case-study/haven"
            element={<HavenCaseStudy />}
          />

          <Route
            path="/case-study/tahqiq-ai"
            element={<TahqiqAICaseStudy />}
          />

          <Route
            path="/case-study/:slug"
            element={<AdditionalCaseStudies />}
          />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

