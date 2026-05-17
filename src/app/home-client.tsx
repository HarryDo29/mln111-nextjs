"use client";

import { ThemeProvider } from "@/components/theme";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { VisualLearning } from "@/components/VisualLearning";
import { Thinkers } from "@/components/Thinkers";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export function HomePage() {
  return (
    <ThemeProvider>
      <main className="min-h-screen relative">
        <Navbar />
        <Hero />
        <Features />
        <VisualLearning />
        <Thinkers />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
