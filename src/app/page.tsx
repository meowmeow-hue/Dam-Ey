"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LiveMarketPulse } from "@/components/LiveMarketPulse";
import { CoreProblem } from "@/components/CoreProblem";
import { HowItWorks } from "@/components/HowItWorks";
import { ProxyCommunityModel } from "@/components/ProxyCommunityModel";
import { SocialProofFooter } from "@/components/SocialProofFooter";
import { AuthModal } from "@/components/AuthModal";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const [lang, setLang] = useState<"en" | "km">("en");
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authRole, setAuthRole] = useState<UserRole>("farmer");
  const [authPrefill, setAuthPrefill] = useState<{
    province?: string;
    crop?: string;
  }>({});

  const handleTriggerAction = (
    role: "farmer" | "proxy" = "farmer",
    initialData?: { province?: string; crop?: string }
  ) => {
    // If user is already logged in, redirect directly to dashboard with params
    if (user) {
      const params = new URLSearchParams();
      params.set("role", role);
      if (initialData?.province) params.set("province", initialData.province);
      if (initialData?.crop) params.set("crop", initialData.crop);
      router.push(`/dashboard?${params.toString()}`);
      return;
    }

    // Otherwise open Auth modal with role & prefill
    setAuthRole(role);
    setAuthPrefill(initialData || {});
    setAuthModalOpen(true);
  };

  const handleSelectPulseCard = (province: string, crop: string) => {
    handleTriggerAction("farmer", { province, crop });
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === "en" ? "km" : "en"));
  };

  return (
    <div className="min-h-screen bg-[#F7F9F6] text-[#1C241D] flex flex-col font-sans">
      {/* 1. Navigation Bar */}
      <Navbar
        onOpenAuth={handleTriggerAction}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onOpenWizard={handleTriggerAction} lang={lang} />

        {/* 3. Live Market Pulse Widget (Interactive Teaser Banner) */}
        <LiveMarketPulse
          onSelectPulseCard={handleSelectPulseCard}
          lang={lang}
        />

        {/* 4. The Core Problem We Solve (Split 2-Column Cards) */}
        <CoreProblem lang={lang} />

        {/* 5. How CropWise Works (Interactive 4-Step Process Flow) */}
        <HowItWorks onOpenWizard={handleTriggerAction} lang={lang} />

        {/* 6. Community & Proxy Access Model (Impact Highlight) */}
        <ProxyCommunityModel onOpenWizard={handleTriggerAction} lang={lang} />
      </main>

      {/* 7. Social Proof & Footer */}
      <SocialProofFooter lang={lang} />

      {/* Authentication Modal with Continue with Google & Role Switcher */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultRole={authRole}
        prefillData={authPrefill}
        lang={lang}
      />
    </div>
  );
}
