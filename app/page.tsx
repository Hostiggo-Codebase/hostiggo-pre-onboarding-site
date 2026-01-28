"use client";

import { useState } from "react";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import WhyHostiggo from "@/components/ui/WhyHostiggo";
import HowItWorks from "@/components/ui/HowItWorks";
import OnboardingForm from "@/components/ui/OnboardingForm";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      {!showForm ? (
        <>
          <Hero onStartOnboarding={() => setShowForm(true)} />
          <WhyHostiggo />
          <HowItWorks onStartOnboarding={() => setShowForm(true)} />
        </>
      ) : (
        <OnboardingForm onBack={() => setShowForm(false)} />
      )}
      <Footer />
    </main>
  );
}
