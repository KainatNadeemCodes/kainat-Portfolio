import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";

interface NavItem {
  label: string;
  href: string;
  isAnchor?: boolean;
}

const navLinks: NavItem[] = [
  { label: "About", href: "/#about", isAnchor: true },
  { label: "Why Me", href: "/why-me" },
  { label: "Projects", href: "/projects" },
  { label: "Hackathons", href: "/hackathons" },
  { label: "Skills", href: "/skills" },
  { label: "Writing", href: "/writing" },
  { label: "Community", href: "/community" },
  { label: "Education", href: "/education" },
  { label: "Contact", href: "/#contact", isAnchor: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (item: NavItem) => {
    setMenuOpen(false);

    if (item.isAnchor) {
      const anchorId = item.href.replace("/#", "");
      if (location.pathname === "/") {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      }
    } else {
      navigate(item.href);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const isLinkActive = (item: NavItem) => {
    if (item.isAnchor) {
      return false;
    }
    return location.pathname === item.href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/60 py-3 shadow-md"
          : "bg-background/60 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={handleLogoClick}
          className="font-mono text-sm text-foreground tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          K<span className="text-primary font-bold">.</span>N
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          {navLinks.map((link, i) => {
            const active = isLinkActive(link);
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`text-xs transition-colors duration-200 font-mono tracking-wide cursor-pointer py-1 px-1.5 rounded relative ${
                  active
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-primary/50 mr-1">0{i + 1}.</span>
                {link.label}
                {active && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle theme"
            className="relative w-8 h-8 flex items-center justify-center rounded-md border border-border/50 bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors duration-200 cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute"
                >
                  <Sun size={14} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, rotate: 20, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -20, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute"
                >
                  <Moon size={14} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button
            className="lg:hidden text-foreground cursor-pointer p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-2xl border-t border-border/60 shadow-2xl"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link, i) => {
                const active = isLinkActive(link);
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link)}
                    className={`text-sm transition-colors py-2.5 text-left font-mono cursor-pointer flex items-center justify-between ${
                      active
                        ? "text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>
                      <span className="text-primary/50 mr-2">0{i + 1}.</span>
                      {link.label}
                    </span>
                    {active && <span className="text-xs text-primary font-bold">●</span>}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
