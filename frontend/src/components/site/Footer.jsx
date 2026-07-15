import React from "react";
import { JhaxLogo } from "@/components/site/Logo";

const Footer = () => (
  <footer
    data-testid="site-footer"
    className="relative border-t"
    style={{ borderColor: "#1E1E1E" }}
  >
    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="flex items-center gap-3">
        <JhaxLogo size={22} markSize={26} />
      </div>
      <div className="text-muted-warm text-[14px] md:mx-auto text-center max-w-md">
        Your AI COO. Built for restaurant operators who refuse to guess.
      </div>
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ghost">
        © 2026 JHAX.ai — All rights reserved
      </div>
    </div>
  </footer>
);

export default Footer;
