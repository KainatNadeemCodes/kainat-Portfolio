import CaseStudyLayout from "@/components/CaseStudyLayout";
import projectHaven from "@/assets/project-haven.jpg";
import { HavenPlayground } from "@/components/HavenPlayground";

const bullets = (items: string[]) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2 text-secondary-foreground text-sm leading-relaxed">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400/70 shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const para = (text: string) => (
  <p className="text-secondary-foreground text-sm leading-relaxed">{text}</p>
);

const sections = [
  {
    heading: "Problem Statement",
    content: (
      <div className="space-y-3">
        {para("Digital platforms frequently overload neurodivergent individuals through unpredictable layouts, abrupt animations, intrusive audio, and high-contrast visuals. During sensory overload or executive dysfunction, navigating complex software becomes an acute barrier.")}
        {para("Haven was built as a predictable, low-arousal digital sanctuary designed around cognitive load theory, sensory regulation, and non-verbal communication.")}
      </div>
    ),
  },
  {
    heading: "Core Interactive Features",
    content: bullets([
      "Interactive Social Stories: Step-by-step cognitive scaffolding guides for anxiety-provoking scenarios (doctor visits, haircuts, transit, groceries, bedtime routines)",
      "AAC Communication Cards ('Say Something'): One-tap visual cards that enable non-verbal expression during emotional overwhelm",
      "Ambient Soundscape Generator: Multi-track audio mixer supporting custom audio file uploads, live microphone recording, and individual channel volume balancing",
      "Caregiver Dashboard: Protected by a 4-digit PIN barrier to prevent accidental disruption of safe configurations during distress",
      "Sensory Accessibility Controls: System-wide toggles for reduced motion, high contrast, typography scaling, and audio muting",
    ]),
  },
  {
    heading: "Try the Sensory & AAC Playground",
    content: <HavenPlayground />,
  },
  {
    heading: "Inclusive UX & Accessibility Engineering",
    content: bullets([
      "Full adherence to WCAG 2.1 AA contrast ratios and minimum 48px touch targets for motor accessibility",
      "Single-focus screen architecture engineered to eliminate cognitive choice fatigue",
      "Soft, muted chromatic palette specifically selected to lower neurological arousal",
      "Predictable two-way navigation ensuring users always know how to exit or undo actions",
    ]),
  },
  {
    heading: "Technical Architecture",
    content: bullets([
      "Frontend: React, TypeScript, Tailwind CSS, Lucide icons",
      "Audio Engine: Web Audio API for client-side multi-channel synthesis and mic capture",
      "Security: PIN-authenticated caregiver barrier with protected settings state",
      "Hosting & Deployment: Production deployment on Vercel at safespacehaven.vercel.app",
    ]),
  },
  {
    heading: "Reflection",
    content: para(
      "Haven proved that accessibility is not a compliance checkbox applied after launch — it is a foundational architectural choice. Designing software under strict cognitive and sensory constraints produces cleaner, more predictable, and more resilient systems for every user."
    ),
  },
];

const HavenCaseStudy = () => (
  <CaseStudyLayout
    title="Haven"
    type="Neuro-Inclusive Safety & Sensory Support App"
    role="UX Researcher & Interface Designer"
    tools="React, TypeScript, Web Audio API, Tailwind CSS, WCAG 2.1 AA, Figma"
    intro="A sensory-friendly digital environment engineered around cognitive load theory, interactive social stories, AAC communication cards, and ambient soundscapes to support neurodivergent users and caregivers."
    category="Inclusive Design · Accessibility"
    categoryColor="text-emerald-400 bg-emerald-400/10 border-emerald-400/25"
    heroImage={projectHaven}
    demoUrl="https://safespacehaven.vercel.app"
    repoUrl="https://github.com/KainatNadeemCodes/Haven_Frontend"
    sections={sections}
  />
);

export default HavenCaseStudy;

