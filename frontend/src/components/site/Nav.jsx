import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JhaxLogo } from "@/components/site/Logo";

const links = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Capabilities", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      data-testid="site-nav"
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(8,8,8,0.82)" : "rgba(8,8,8,0.45)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid #1E1E1E"
          : "1px solid rgba(30,30,30,0.4)",
        transition: "background .3s ease, border-color .3s ease",
      }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 h-[68px]">
        <a href="#top" data-testid="nav-logo" className="flex items-center">
          <JhaxLogo size={22} markSize={26} />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-warm hover:text-cream transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#book-demo"
          data-testid="nav-cta-book-demo"
          className="group relative inline-flex items-center gap-2 pill-btn"
          style={{
            background: "#E8500A",
            color: "#fff",
            padding: "12px 22px",
            borderRadius: 100,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            transition: "transform .2s ease, box-shadow .2s ease",
            boxShadow: "0 8px 26px -10px rgba(232,80,10,0.6)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 14px 34px -10px rgba(232,80,10,0.75)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 8px 26px -10px rgba(232,80,10,0.6)";
          }}
        >
          Book a Demo <span aria-hidden>→</span>
        </a>
      </div>
    </motion.header>
  );
};

export default Nav;
