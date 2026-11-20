import React, { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isToolUIPart, getToolName } from "ai";
import {
  MessageSquare,
  X,
  Minus,
  Send,
  Sparkles,
  Bot,
  RotateCcw,
  Loader2,
  ShieldCheck,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { ActionCard } from "./ActionCard";

const SUGGESTIONS = [
  "Explain Juristt architecture",
  "RAG & LLM experience",
  "Download verified CV",
  "Hiring availability",
  "Tahqiq AI legal platform",
  "Haven health companion",
];

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize useChat with explicit DefaultChatTransport to /api/chat
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );

  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
    setMessages,
  } = useChat({
    transport,
  });

  const isGenerating = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom of message list on new chunks
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, status, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend ?? inputValue).trim();
    if (!query || isGenerating) return;

    setInputValue("");
    try {
      await sendMessage({ text: query });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleReset = () => {
    stop();
    setMessages([]);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* ── EXPANDED CHAT PANEL ───────────────────────────────── */}
      {isOpen && (
        <div className="mb-3 flex h-[min(580px,calc(100dvh-5.5rem))] w-[92vw] max-w-[395px] flex-col overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/95 text-slate-100 shadow-[0_12px_45px_rgba(0,0,0,0.65),0_0_30px_rgba(6,182,212,0.18)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-sm">
                <Bot className="h-4 w-4" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold tracking-tight text-white">
                    Kainat AI Concierge
                  </h3>
                  <span className="rounded bg-cyan-950/80 px-1 py-0.2 text-[9px] font-mono font-medium text-cyan-300 border border-cyan-800/50">
                    Gemini RAG
                  </span>
                </div>
                <p className="flex items-center gap-1 text-[11px] text-slate-400">
                  <ShieldCheck className="h-3 w-3 text-cyan-400" />
                  <span>Verified on portfolio · Gemini 3.8</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleReset}
                title="Restart Conversation"
                className="rounded-lg p-1.5 transition-colors hover:bg-slate-800 hover:text-slate-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Concierge"
                className="rounded-lg p-1.5 transition-colors hover:bg-slate-800 hover:text-slate-200"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Bar (when conversation is fresh) */}
          {messages.length === 0 && (
            <div className="border-b border-slate-800/60 bg-slate-900/40 px-3.5 py-2.5">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Quick Inquiries:
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="inline-flex items-center gap-1 rounded-full border border-cyan-500/25 bg-cyan-950/40 px-2.5 py-1 text-[11px] text-cyan-200 transition-all hover:border-cyan-500/60 hover:bg-cyan-900/50 active:scale-97"
                  >
                    <span>{suggestion}</span>
                    <ArrowUpRight className="h-2.5 w-2.5 opacity-70" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {/* Initial Welcome Bubble */}
            <div className="flex items-start gap-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-slate-900/90 border border-slate-800/90 px-3.5 py-2.5 text-xs text-slate-200 leading-relaxed shadow-sm">
                <p>
                  Welcome! I&apos;m Kainat&apos;s AI Concierge. I can explain her{" "}
                  <strong className="text-cyan-300">
                    multi-agent legal RAG systems (Juristt)
                  </strong>
                  , maternal health AI (Haven), 3.93 CGPA research background, or
                  guide you to download her verified CV.
                </p>
              </div>
            </div>

            {/* Conversation Messages */}
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${
                    isUser ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? "rounded-tr-sm bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-900/20"
                        : "rounded-tl-sm bg-slate-900/90 border border-slate-800/90 text-slate-200"
                    }`}
                  >
                    {/* Render Message Parts */}
                    {message.parts && message.parts.length > 0 ? (
                      message.parts.map((part, pIdx) => {
                        // 1. Text Parts
                        if (part.type === "text") {
                          return (
                            <div
                              key={pIdx}
                              className="whitespace-pre-wrap break-words"
                            >
                              {part.text}
                            </div>
                          );
                        }

                        // 2. Tool Parts
                        if (isToolUIPart(part)) {
                          const toolName = getToolName(part);
                          const output = (part as any).output;

                          if (
                            part.state === "output-available" ||
                            Boolean(output)
                          ) {
                            return (
                              <ActionCard
                                key={pIdx}
                                toolName={toolName}
                                output={output}
                              />
                            );
                          }

                          if (
                            part.state === "input-streaming" ||
                            part.state === "call-received"
                          ) {
                            return (
                              <div
                                key={pIdx}
                                className="my-2 flex items-center gap-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 p-2 text-[11px] font-mono text-cyan-300"
                              >
                                <Loader2 className="h-3 w-3 animate-spin text-cyan-400" />
                                <span>Verifying {toolName} against portfolio...</span>
                              </div>
                            );
                          }
                        }

                        return null;
                      })
                    ) : (
                      // Fallback content rendering
                      <div className="whitespace-pre-wrap break-words">
                        {(message as any).content || ""}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading / Typing Indicator */}
            {isGenerating && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span className="text-[11px] text-slate-400">
                  Grounded reasoning in progress...
                </span>
              </div>
            )}

            {/* Error Notification */}
            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300 space-y-1.5">
                <p className="font-semibold text-rose-200">
                  {error.message?.includes("Missing Gemini API key") ||
                  error.message?.includes("FUNCTION_INVOCATION_FAILED")
                    ? "Vercel Environment Setup Required"
                    : "Concierge Notice:"}
                </p>
                <p className="text-slate-300 leading-relaxed">
                  {error.message?.includes("Missing Gemini API key")
                    ? "Please add GOOGLE_GENERATIVE_AI_API_KEY in your Vercel Project Settings ➔ Environment Variables, then redeploy."
                    : error.message ||
                      "Could not complete request. Please verify GEMINI_API_KEY."}
                </p>
                <button
                  onClick={() => handleReset()}
                  className="mt-1 inline-flex items-center rounded-lg bg-rose-900/60 px-2.5 py-1 text-[11px] font-medium text-rose-100 hover:bg-rose-900 transition-colors"
                >
                  Clear & Try Again
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Composer */}
          <div className="border-t border-slate-800/80 bg-slate-900/80 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Kainat's projects, RAG, or stack..."
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950/80 px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none transition-colors focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40"
                disabled={isGenerating}
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isGenerating}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm transition-all hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                title="Send message"
              >
                {isGenerating ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 px-1">
              <span className="flex items-center gap-1 font-mono">
                <ShieldCheck className="h-2.5 w-2.5 text-cyan-400" />
                <span>Strict Grounding · Server Validated</span>
              </span>
              <span>Gemini 3.8 Flash</span>
            </div>
          </div>
        </div>
      )}

      {/* ── FLOATING TRIGGER BUTTON ──────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/80 px-4 py-2.5 text-white shadow-[0_0_24px_rgba(6,182,212,0.3)] transition-all hover:border-cyan-400/70 hover:shadow-[0_0_32px_rgba(6,182,212,0.5)] active:scale-95"
        aria-label="Toggle Kainat AI Concierge"
      >
        <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30">
          <Sparkles className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <span className="text-xs font-semibold tracking-wide text-slate-100">
          {isOpen ? "Close Assistant" : "Ask Kainat's AI"}
        </span>

        {!isOpen && (
          <span className="hidden sm:inline-flex rounded-full bg-cyan-950/80 px-1.5 py-0.2 text-[9px] font-mono text-cyan-300 border border-cyan-800/50">
            Online
          </span>
        )}
      </button>
    </div>
  );
};
