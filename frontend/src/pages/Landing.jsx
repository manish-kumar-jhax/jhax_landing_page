import React from "react";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import TrustStrip from "@/components/site/TrustStrip";
import ProblemSection from "@/components/site/ProblemSection";
import RealRestaurantProof from "@/components/site/RealRestaurantProof";
import ProductDemo from "@/components/site/ProductDemo";
import HowItWorks from "@/components/site/HowItWorks";
import Features from "@/components/site/Features";
import TheLoop from "@/components/site/TheLoop";
import Marquee from "@/components/site/Marquee";
import FAQ from "@/components/site/FAQ";
import Stats from "@/components/site/Stats";
import FinalCTA from "@/components/site/FinalCTA";
import Footer from "@/components/site/Footer";

const Landing = () => {
  return (
    <div data-testid="landing-page" className="relative">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <RealRestaurantProof />
        <ProductDemo />
        <HowItWorks />
        <Features />
        <TheLoop />
        <Marquee />
        <FAQ />
        <Stats />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
