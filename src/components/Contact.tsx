import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Send, Copy, Check } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "kainat.nadeem.work@gmail.com",
    href: "mailto:kainat.nadeem.work@gmail.com",
    sub: "Email",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kainat-nadeem-a9408b324",
    sub: "Connect",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/KainatNadeemCodes",
    sub: "KainatNadeemCodes",
  },
];

const Contact = () => {
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("kainat.nadeem.work@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const subject = String(form.get("subject") ?? "Portfolio enquiry");
    const message = String(form.get("message") ?? "");
    const body = `Hi Kainat,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest,\n${name}`;
    setStatus("Opening your email client…");
    window.location.href = `mailto:kainat.nadeem.work@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <p className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-3">Contact</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Open to Opportunities
            </h2>
            <p className="font-body text-muted-foreground text-base mb-10 max-w-md mx-auto leading-relaxed">
              Available for MSc AI programmes, research collaborations, and STEM scholarship opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-primary/20 bg-card p-4 sm:p-5 md:p-6 text-left shadow-xl shadow-primary/5">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className="font-mono text-primary text-[10px] uppercase tracking-[0.18em]">Start a conversation</p>
                  <p className="text-sm text-muted-foreground mt-1">Tell me what you are building or exploring.</p>
                </div>
                <Send size={17} className="text-primary shrink-0" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Name</span>
                  <input name="name" required placeholder="Your name" className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition" />
                </label>
                <label className="space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Email</span>
                  <input name="email" type="email" required placeholder="you@example.com" className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition" />
                </label>
              </div>
              <label className="block space-y-2 mt-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">What would you like to discuss?</span>
                <select name="subject" defaultValue="Research or collaboration" className="w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition">
                  <option>Research or collaboration</option>
                  <option>MSc AI or scholarship opportunity</option>
                  <option>AI / frontend project</option>
                  <option>Mentoring or teaching</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="block space-y-2 mt-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Message</span>
                <textarea name="message" required rows={5} placeholder="A few details about your idea, question, or opportunity…" className="w-full resize-y rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition" />
              </label>
              <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 hover:shadow-lg hover:shadow-primary/20">
                  Send message <ArrowUpRight size={15} />
                </button>
                <p className="text-center sm:text-right font-mono text-[10px] text-muted-foreground/70">Opens your email client</p>
              </div>
              {status && <p role="status" className="mt-3 font-mono text-[10px] text-primary">{status}</p>}
            </form>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="group bg-card border border-border/50 rounded-xl px-5 py-3.5 flex items-center justify-between hover:border-primary/40 hover:shadow-lg transition-all duration-200 cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="font-mono text-foreground text-xs leading-none mb-1">kainat.nadeem.work@gmail.com</p>
                    <p className="text-muted-foreground text-[10px] font-mono">
                      {copied ? "Copied to clipboard!" : "Click to copy email address"}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-primary px-2 py-1 rounded bg-primary/10 flex items-center gap-1">
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>

            {links.slice(1).map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  className="group bg-card border border-border/50 rounded-xl px-5 py-4 flex items-center gap-3 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
                >
                  <Icon size={16} className="text-primary" />
                  <div className="text-left">
                    <p className="font-body text-foreground text-sm leading-none mb-0.5">{link.label}</p>
                    <p className="text-muted-foreground text-[10px] font-mono">{link.sub}</p>
                  </div>
                  <ArrowUpRight size={13} className="text-muted-foreground group-hover:text-primary transition-colors ml-1" />
                </motion.a>
              );
            })}
            </div>
          </div>

          {/* Final tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-muted-foreground/60 text-xs tracking-wide italic"
          >
            "She builds intelligent systems with purpose."
          </motion.p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="container mx-auto max-w-3xl mt-16 pt-6 border-t border-border/30 flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground text-xs font-mono tracking-wide">
          © 2026 Kainat Nadeem
        </p>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground/50 text-[10px] font-mono">
            AI Engineer · UX Designer · Social Impact Technologist
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contact;

