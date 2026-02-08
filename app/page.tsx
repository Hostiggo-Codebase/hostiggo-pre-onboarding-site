"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import WhyHostiggo from "@/components/ui/WhyHostiggo";
import HowItWorks from "@/components/ui/HowItWorks";
import OnboardingForm from "@/components/ui/OnboardingForm";
import Footer from "@/components/ui/Footer";
import FAQ from "@/components/ui/FAQ";
import { Copy, Copyright } from "lucide-react";
import CopyrightBar from "@/components/ui/Copyrightbar";

function HomeContent() {
  const [showForm, setShowForm] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("start") === "1") {
      setShowForm(true);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        {!showForm ? (
          <>
            <Header />
            <Hero onStartOnboarding={() => setShowForm(true)} />
            <WhyHostiggo />
            <HowItWorks onStartOnboarding={() => setShowForm(true)} />
            <FAQ />
          </>
        ) : (
          <OnboardingForm
            onBack={() => setShowForm(false)}
            onExit={() => setShowForm(false)}
          />
        )}
        {!showForm && <Footer />}
      </div>
      {!showForm && <CopyrightBar />}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
