import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ExternalLink,
  Download,
  Mail,
  Github,
  Linkedin,
  Check,
  Copy,
  X,
  FileCheck2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { downloadResume } from "@/lib/resume";

export interface ActionCardProps {
  toolName: string;
  output: any;
  onDismiss?: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  toolName,
  output,
  onDismiss,
}) => {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (dismissed || !output) return null;

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // 1. Project Navigation Tool Result
  if (toolName === "openProject" || output.action === "openProject") {
    if (!output.success) {
      return (
        <div className="my-2.5 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
          <p className="font-medium">Verification Notice:</p>
          <p className="mt-0.5 text-muted-foreground">{output.error}</p>
        </div>
      );
    }

    return (
      <div className="my-3 overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-900/90 p-3.5 shadow-lg backdrop-blur-md transition-all hover:border-cyan-500/50">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                  Verified Case Study
                </span>
                <span className="inline-flex items-center rounded-full bg-cyan-950/60 px-1.5 py-0.2 text-[9px] text-cyan-300 border border-cyan-800/40">
                  <ShieldCheck className="mr-0.5 h-2.5 w-2.5" />
                  Grounded
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100">
                {output.title}
              </h4>
            </div>
          </div>
          <button
            onClick={() => {
              setDismissed(true);
              onDismiss?.();
            }}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            title="Dismiss card"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {output.tagline && (
          <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
            {output.tagline}
          </p>
        )}

        {output.metrics && output.metrics.length > 0 && (
          <div className="mt-2 rounded-lg bg-slate-950/60 p-2 border border-slate-800/80">
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
              Key Metric:
            </p>
            <p className="text-xs font-mono text-cyan-300">
              {output.metrics[0]}
            </p>
          </div>
        )}

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => navigate(output.path)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:from-cyan-500 hover:to-blue-500 active:scale-98"
          >
            <span>View Case Study</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => {
              setDismissed(true);
              onDismiss?.();
            }}
            className="rounded-lg border border-slate-800 bg-slate-800/60 px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  // 2. Download Resume / CV Tool Result
  if (toolName === "downloadCV" || output.action === "downloadCV") {
    return (
      <div className="my-3 overflow-hidden rounded-xl border border-amber-500/30 bg-slate-900/90 p-3.5 shadow-lg backdrop-blur-md transition-all hover:border-amber-500/50">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
              <FileCheck2 className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                  Verified Resume PDF
                </span>
                <span className="inline-flex items-center rounded-full bg-amber-950/60 px-1.5 py-0.2 text-[9px] text-amber-300 border border-amber-800/40">
                  CGPA 3.93
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100">
                {output.fileName || "Kainat_Nadeem_Resume.pdf"}
              </h4>
            </div>
          </div>
          <button
            onClick={() => {
              setDismissed(true);
              onDismiss?.();
            }}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            title="Cancel"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
          {output.note ||
            "Official verified resume of Kainat Nadeem (AI Engineer, PEEF Scholar, Class Rank 1st)."}
        </p>

        <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          <span>Size: {output.fileSize || "1.2 MB"}</span>
          <span>•</span>
          <span className="text-amber-300">Class Rank 1st</span>
          <span>•</span>
          <span className="text-emerald-400">6-Yr PEEF Scholar</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => downloadResume()}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:from-amber-500 hover:to-amber-600 active:scale-98"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Verified PDF</span>
          </button>

          <button
            onClick={() => {
              setDismissed(true);
              onDismiss?.();
            }}
            className="rounded-lg border border-slate-800 bg-slate-800/60 px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // 3. Show Contact Tool Result
  if (toolName === "showContact" || output.action === "showContact") {
    const email = output.email || "kainatnadeem677@gmail.com";
    const github = output.github || "https://github.com/KainatNadeemCodes";
    const linkedin =
      output.linkedin ||
      "https://www.linkedin.com/in/kainat-nadeem-609b1a297/";

    return (
      <div className="my-3 overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-900/90 p-3.5 shadow-lg backdrop-blur-md transition-all hover:border-cyan-500/50">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
              <Mail className="h-4 w-4" />
            </span>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                Direct Contact Channels
              </span>
              <h4 className="text-sm font-semibold text-slate-100">
                Connect with Kainat
              </h4>
            </div>
          </div>
          <button
            onClick={() => {
              setDismissed(true);
              onDismiss?.();
            }}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            title="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-2.5 space-y-1.5 text-xs">
          <div className="flex items-center justify-between rounded-lg bg-slate-950/60 px-2.5 py-1.5 border border-slate-800/80">
            <span className="font-mono text-slate-300">{email}</span>
            <button
              onClick={() => handleCopyEmail(email)}
              className="inline-flex items-center gap-1 rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-200 hover:bg-slate-700"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <a
              href={`mailto:${email}?subject=Inquiry%20regarding%20AI%20Engineering%20Opportunities`}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-cyan-600/20 border border-cyan-500/40 px-2.5 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-600/30 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Send Email</span>
            </a>

            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-800/80 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-800/80 p-1.5 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        {output.availability && (
          <p className="mt-2 text-[11px] text-emerald-400/90 font-medium flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {output.availability}
          </p>
        )}
      </div>
    );
  }

  return null;
};
