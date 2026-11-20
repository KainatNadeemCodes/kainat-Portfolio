import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  Sparkles,
  MessageSquare,
  Heart,
  Coffee,
  HelpCircle,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Eye,
  Droplets,
  DoorOpen,
  Volume1,
} from "lucide-react";

interface AACCard {
  id: string;
  label: string;
  phrase: string;
  color: string;
  icon: React.ElementType;
  description: string;
}

const AAC_CARDS: AACCard[] = [
  {
    id: "too-loud",
    label: "Too Loud",
    phrase: "It is too loud here. I need a quieter space, please.",
    color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300",
    icon: VolumeX,
    description: "Requests immediate sensory de-escalation",
  },
  {
    id: "need-break",
    label: "Need a Break",
    phrase: "I need to take a short quiet break right now.",
    color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-300",
    icon: Coffee,
    description: "Signals approaching cognitive fatigue",
  },
  {
    id: "need-water",
    label: "Need Water",
    phrase: "Could I please have some water?",
    color: "from-cyan-500/20 to-teal-500/10 border-cyan-500/30 text-cyan-300",
    icon: Droplets,
    description: "Basic physiological regulation",
  },
  {
    id: "need-help",
    label: "Need Help",
    phrase: "I need help with this task, please.",
    color: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-300",
    icon: HelpCircle,
    description: "Clear non-verbal assistance request",
  },
  {
    id: "want-leave",
    label: "Want to Leave",
    phrase: "I feel overwhelmed and would like to leave this room.",
    color: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300",
    icon: DoorOpen,
    description: "Safe boundary and exit communication",
  },
  {
    id: "feeling-ok",
    label: "I Am Okay",
    phrase: "I am feeling regulated and safe right now.",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300",
    icon: CheckCircle2,
    description: "Affirmative emotional status check-in",
  },
];

type SoundPreset = "rain" | "waves" | "calm-hum";

const SOUND_PRESETS: { id: SoundPreset; label: string; desc: string; icon: React.ElementType }[] = [
  { id: "rain", label: "Soft Rain", desc: "Filtered noise · 650 Hz low-pass", icon: Droplets },
  { id: "waves", label: "Ocean Waves", desc: "Low-frequency noise", icon: Sliders },
  { id: "calm-hum", label: "Warm Harmonic", desc: "Soft 174 Hz tone", icon: Sparkles },
];

export const HavenPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"aac" | "soundscape" | "sensory">("aac");

  // Screen reader announcements (aria-live)
  const [announcement, setAnnouncement] = useState("");

  const announce = (msg: string) => {
    setAnnouncement(msg);
  };

  // --- AAC State ---
  const [selectedAAC, setSelectedAAC] = useState<AACCard>(AAC_CARDS[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenFeedback, setSpokenFeedback] = useState("");

  const playSpeech = (card: AACCard) => {
    setSelectedAAC(card);
    setSpokenFeedback(card.phrase);
    announce(`Selected card: ${card.label}. Speaking: "${card.phrase}"`);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(card.phrase);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 1200);
    }
  };

  // --- Soundscape State (Web Audio API procedural sound) ---
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [soundType, setSoundType] = useState<SoundPreset>("rain");
  const [volume, setVolume] = useState(0.4);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  const stopAudio = useCallback(() => {
    if (sourceNodeRef.current) {
      try {
        (sourceNodeRef.current as any).stop?.();
      } catch {
        // ignore if already stopped
      }
      try {
        sourceNodeRef.current.disconnect();
      } catch {
        // ignore
      }
      sourceNodeRef.current = null;
    }

    if (filterNodeRef.current) {
      try {
        filterNodeRef.current.disconnect();
      } catch {
        // ignore
      }
      filterNodeRef.current = null;
    }

    if (gainNodeRef.current) {
      try {
        gainNodeRef.current.disconnect();
      } catch {
        // ignore
      }
      gainNodeRef.current = null;
    }

    if (audioCtxRef.current) {
      if (audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
      audioCtxRef.current = null;
    }

    setIsPlayingAudio(false);
  }, []);

  const startAudio = useCallback(() => {
    // Teardown any running context first
    stopAudio();

    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // Handle suspended audio context (browser autoplay policies)
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const masterGain = ctx.createGain();
      // Smooth fade-in to prevent audible click
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.0001), ctx.currentTime + 0.08);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (soundType === "rain") {
        // Filtered soft noise (soothing rain)
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.15;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;
        whiteNoise.loop = true;

        const lowpass = ctx.createBiquadFilter();
        lowpass.type = "lowpass";
        lowpass.frequency.setValueAtTime(650, ctx.currentTime);

        whiteNoise.connect(lowpass);
        lowpass.connect(masterGain);
        whiteNoise.start();

        sourceNodeRef.current = whiteNoise;
        filterNodeRef.current = lowpass;
      } else if (soundType === "waves") {
        // Low brown noise modulated
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 0.8;
        }

        const brownNoise = ctx.createBufferSource();
        brownNoise.buffer = buffer;
        brownNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        brownNoise.connect(filter);
        filter.connect(masterGain);
        brownNoise.start();

        sourceNodeRef.current = brownNoise;
        filterNodeRef.current = filter;
      } else {
        // Calming warm harmonic tone
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(174, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(300, ctx.currentTime);

        osc.connect(filter);
        filter.connect(masterGain);
        osc.start();

        sourceNodeRef.current = osc;
        filterNodeRef.current = filter;
      }

      setIsPlayingAudio(true);
      const presetLabel = SOUND_PRESETS.find((p) => p.id === soundType)?.label || soundType;
      announce(`Playing ambient soundscape: ${presetLabel} at ${Math.round(volume * 100)} percent volume.`);
    } catch (e) {
      console.error("Audio initialization error", e);
      setIsPlayingAudio(false);
    }
  }, [stopAudio, soundType, volume]);

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
      announce("Ambient soundscape stopped.");
    } else {
      startAudio();
    }
  };

  // Update volume smoothly when slider moves
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
      gainNodeRef.current.gain.setValueAtTime(
        Math.max(volume, 0.0001),
        audioCtxRef.current.currentTime
      );
    }
  }, [volume]);

  // Restart audio if soundType changes while playing
  useEffect(() => {
    if (isPlayingAudio) {
      startAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundType]);

  // Cleanup on unmount or tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlayingAudio) {
        stopAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopAudio();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlayingAudio, stopAudio]);

  // --- Sensory Mode Demo ---
  const [sensoryMode, setSensoryMode] = useState<"haven" | "standard">("haven");

  // Tab keyboard navigation (ArrowLeft / ArrowRight)
  const tabKeys: ("aac" | "soundscape" | "sensory")[] = ["aac", "soundscape", "sensory"];
  const handleTabKeyDown = (e: React.KeyboardEvent, currentTab: "aac" | "soundscape" | "sensory") => {
    const currentIndex = tabKeys.indexOf(currentTab);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabKeys.length;
      setActiveTab(tabKeys[nextIndex]);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabKeys.length) % tabKeys.length;
      setActiveTab(tabKeys[prevIndex]);
    }
  };

  return (
    <section
      aria-label="Haven Sensory and AAC Playground"
      className="w-full rounded-2xl border border-emerald-500/30 bg-card/60 backdrop-blur-sm overflow-hidden shadow-xl p-5 md:p-6 my-6 text-card-foreground motion-reduce:transition-none"
    >
      {/* Screen Reader Live Region for Announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-border/60 gap-3">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0"
          >
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground text-base md:text-lg">
                Haven Sensory & AAC Simulator
              </h3>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono">
                Interactive demo
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Try sample communication cards, browser speech, and generated audio. This is a portfolio demo, not a clinical tool.
            </p>
          </div>
        </div>

        {/* Tab Selector with WAI-ARIA tablist pattern */}
        <div
          role="tablist"
          aria-label="Playground feature views"
          className="flex items-center rounded-xl bg-muted/60 p-1 border border-border/40 shrink-0"
        >
          <button
            id="tab-aac"
            role="tab"
            aria-selected={activeTab === "aac"}
            aria-controls="panel-aac"
            tabIndex={activeTab === "aac" ? 0 : -1}
            onClick={() => {
              setActiveTab("aac");
              announce("Switched to AAC Cards view.");
            }}
            onKeyDown={(e) => handleTabKeyDown(e, "aac")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${
              activeTab === "aac"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            AAC Cards
          </button>
          <button
            id="tab-soundscape"
            role="tab"
            aria-selected={activeTab === "soundscape"}
            aria-controls="panel-soundscape"
            tabIndex={activeTab === "soundscape" ? 0 : -1}
            onClick={() => {
              setActiveTab("soundscape");
              announce("Switched to Soundscapes view.");
            }}
            onKeyDown={(e) => handleTabKeyDown(e, "soundscape")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${
              activeTab === "soundscape"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
            Soundscapes
          </button>
          <button
            id="tab-sensory"
            role="tab"
            aria-selected={activeTab === "sensory"}
            aria-controls="panel-sensory"
            tabIndex={activeTab === "sensory" ? 0 : -1}
            onClick={() => {
              setActiveTab("sensory");
              announce("Switched to Sensory Guardrails view.");
            }}
            onKeyDown={(e) => handleTabKeyDown(e, "sensory")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${
              activeTab === "sensory"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            Sensory Guardrails
          </button>
        </div>
      </div>

      {/* Tab 1: AAC Deck */}
      {activeTab === "aac" && (
        <div
          id="panel-aac"
          role="tabpanel"
          aria-labelledby="tab-aac"
          className="pt-6 space-y-6 focus-visible:outline-none"
        >
          <div
            role="group"
            aria-label="AAC communication card deck"
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {AAC_CARDS.map((card) => {
              const Icon = card.icon;
              const isSelected = selectedAAC.id === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => playSpeech(card)}
                  aria-pressed={isSelected}
                  aria-label={`${card.label}: ${card.phrase}`}
                  className={`p-4 rounded-xl border text-left transition-all relative group flex flex-col justify-between min-h-[110px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${
                    isSelected
                      ? `bg-gradient-to-br ${card.color} ring-2 ring-emerald-400/40 shadow-lg scale-[1.02] motion-reduce:transform-none`
                      : "bg-muted/30 border-border/60 hover:bg-muted/60 hover:border-border"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      aria-hidden="true"
                      className="p-2 rounded-lg bg-background/50 border border-border/50 text-foreground"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground opacity-75"
                    >
                      Tap to Speak
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="font-semibold text-foreground text-sm">{card.label}</p>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      {card.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Calming Display Banner */}
          <div
            aria-label="Non-verbal voice synthesis output"
            className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div
                aria-hidden="true"
                className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 shrink-0 mt-0.5"
              >
                <Volume1
                  className={`h-5 w-5 ${
                    isSpeaking
                      ? "motion-safe:animate-pulse motion-reduce:animate-none text-emerald-400"
                      : ""
                  }`}
                />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80">
                  Non-Verbal Output · Voice Synthesis
                </span>
                <p className="text-base sm:text-lg font-medium text-foreground mt-0.5 leading-snug">
                  "{spokenFeedback || selectedAAC.phrase}"
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  A browser speech preview for this demo. Speech availability and voice vary by device and browser.
                </p>
              </div>
            </div>

            <button
              onClick={() => playSpeech(selectedAAC)}
              aria-label={`Replay audio for ${selectedAAC.label}`}
              className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-medium transition-colors shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
              <Volume2 className="h-4 w-4" aria-hidden="true" />
              Replay Audio
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Soundscapes */}
      {activeTab === "soundscape" && (
        <div
          id="panel-soundscape"
          role="tabpanel"
          aria-labelledby="tab-soundscape"
          className="pt-6 space-y-6 focus-visible:outline-none"
        >
          <div
            role="radiogroup"
            aria-label="Soundscape presets"
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {SOUND_PRESETS.map((preset) => {
              const Icon = preset.icon;
              const isActive = soundType === preset.id;
              return (
                <button
                  key={preset.id}
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => {
                    setSoundType(preset.id);
                    announce(`Selected soundscape: ${preset.label}`);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${
                    isActive
                      ? "bg-emerald-500/15 border-emerald-500/40 text-foreground ring-1 ring-emerald-500/30"
                      : "bg-muted/30 border-border/60 hover:bg-muted/60 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon
                      aria-hidden="true"
                      className={`h-5 w-5 ${isActive ? "text-emerald-400" : "text-muted-foreground"}`}
                    />
                    {isActive && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-foreground text-sm">{preset.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{preset.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Sound Engine Controls */}
          <div className="rounded-xl border border-border/70 bg-muted/20 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleAudio}
                  aria-label={
                    isPlayingAudio
                      ? "Stop ambient soundscape"
                      : `Play ambient soundscape: ${
                          SOUND_PRESETS.find((p) => p.id === soundType)?.label || soundType
                        }`
                  }
                  className={`px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none ${
                    isPlayingAudio
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
                      : "bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400"
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <Square className="h-4 w-4 fill-current" aria-hidden="true" />
                      Stop Soundscape
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                      Play Ambient Sound
                    </>
                  )}
                </button>

                <div className="text-xs text-muted-foreground flex items-center gap-1.5" aria-hidden="true">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isPlayingAudio
                        ? "bg-emerald-400 motion-safe:animate-ping motion-reduce:animate-none"
                        : "bg-muted-foreground/40"
                    }`}
                  />
                  <span>
                    {isPlayingAudio
                      ? "Procedural audio synthesizing live via Web Audio API"
                      : "Zero network audio requests (100% synthesized in-browser)"}
                  </span>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3 w-full sm:w-56">
                <VolumeX className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                <label htmlFor="soundscape-volume" className="sr-only">
                  Soundscape volume
                </label>
                <input
                  id="soundscape-volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(volume * 100)}
                  aria-valuetext={`${Math.round(volume * 100)} percent`}
                  onChange={(e) => {
                    const newVol = parseFloat(e.target.value);
                    setVolume(newVol);
                  }}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
                />
                <Volume2 className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span className="text-xs font-mono text-muted-foreground w-8 text-right" aria-hidden="true">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sensory Guardrails */}
      {activeTab === "sensory" && (
        <div
          id="panel-sensory"
          role="tabpanel"
          aria-labelledby="tab-sensory"
          className="pt-6 space-y-4 focus-visible:outline-none"
        >
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/40 border border-border/60">
            <div>
              <p className="text-xs font-semibold text-foreground">Sensory Load Architecture Comparison</p>
              <p className="text-[11px] text-muted-foreground">
                Toggle to see how Haven redesigns common stressful digital patterns.
              </p>
            </div>
            <div
              role="radiogroup"
              aria-label="Sensory pattern mode selection"
              className="flex items-center gap-1 bg-background/80 p-1 rounded-lg border border-border/60 text-xs"
            >
              <button
                role="radio"
                aria-checked={sensoryMode === "standard"}
                onClick={() => {
                  setSensoryMode("standard");
                  announce("Switched to busy UI comparison mode.");
                }}
                className={`px-3 py-1 rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 motion-reduce:transition-none ${
                  sensoryMode === "standard"
                    ? "bg-rose-500/20 text-rose-300 font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Busy UI example
              </button>
              <button
                role="radio"
                aria-checked={sensoryMode === "haven"}
                onClick={() => {
                  setSensoryMode("haven");
                  announce("Switched to Haven calming mode.");
                }}
                className={`px-3 py-1 rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 motion-reduce:transition-none ${
                  sensoryMode === "haven"
                    ? "bg-emerald-500/20 text-emerald-300 font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Haven Calming Mode
              </button>
            </div>
          </div>

          <div
            className={`p-5 rounded-xl border transition-all motion-reduce:transition-none ${
              sensoryMode === "haven"
                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-100"
                : "bg-red-950/20 border-red-500/50 text-red-100 motion-safe:animate-pulse motion-reduce:animate-none"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                {sensoryMode === "haven" ? "✓ Low-stimulation demo pattern" : "⚠ Busy comparison example"}
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {sensoryMode === "haven" ? "No flashing animation in this demo" : "High Contrast · Cognitive Choice Overload"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-background/40 border border-border/40">
                <p className="font-semibold text-foreground mb-1">Visual Hierarchy</p>
                <p className="text-muted-foreground">
                  {sensoryMode === "haven"
                    ? "Single focus task per view. Generous negative space eliminates decision paralysis."
                    : "Multiple competing banners, popups, and badges vying for eye tracking."}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-background/40 border border-border/40">
                <p className="font-semibold text-foreground mb-1">Chromatic Comfort</p>
                <p className="text-muted-foreground">
                  {sensoryMode === "haven"
                    ? "Muted tones and fewer competing accents in this example."
                    : "Bright competing accents are used here to illustrate a busier visual treatment."}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-background/40 border border-border/40">
                <p className="font-semibold text-foreground mb-1">Safety & Predictability</p>
                <p className="text-muted-foreground">
                  {sensoryMode === "haven"
                    ? "In the full Haven app, describe the actual caregiver controls and navigation here."
                    : "This comparison is illustrative; it does not represent a measured user outcome."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Footer Note */}
      <div className="mt-6 pt-4 border-t border-border/40 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-muted-foreground gap-2">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          Demo audio is generated in the browser; sound starts only after a visitor presses Play.
        </span>
        <span className="font-mono text-emerald-400/80">
          safespacehaven.vercel.app
        </span>
      </div>
    </section>
  );
};
