"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingDown,
  TrendingUp,
  Activity,
  CheckCircle2,
  Users,
  Smartphone,
  ChevronRight,
  SunMedium,
  CloudRain,
} from "lucide-react";

interface HeroProps {
  onOpenWizard: (mode?: "farmer" | "proxy", initialData?: { province?: string; crop?: string }) => void;
  lang: "en" | "km";
}

export const Hero: React.FC<HeroProps> = ({ onOpenWizard, lang }) => {
  const [activeSignal, setActiveSignal] = useState<"green" | "yellow" | "red">("green");

  const signalDetails = {
    green: {
      status: "Ideal to Plant",
      statusKm: "ល្អប្រសើរក្នុងការដាំដុះ",
      badgeClass: "bg-[#2D924F] text-white",
      borderClass: "border-[#2D924F]/30",
      bgSubtle: "bg-[#E8F7EC]",
      crop: "Mung Beans (Takeo)",
      cropKm: "សណ្ដែកបាយ (ខេត្តតាកែវ)",
      capacity: "34% Regional Target",
      capacityKm: "៣៤% នៃទិសដៅតំបន់",
      demandTrend: "+42% Buyer Demand",
      priceOutlook: "High Price Stability (2,800 KHR/kg)",
      riskScore: "Low Risk • 18/100",
      icon: ShieldCheck,
      iconColor: "text-[#2D924F]",
    },
    yellow: {
      status: "Moderate Risk",
      statusKm: "ហានិភ័យមធ្យម",
      badgeClass: "bg-[#E69F00] text-white",
      borderClass: "border-[#E69F00]/30",
      bgSubtle: "bg-[#FEF7E6]",
      crop: "Corn (Kampong Cham)",
      cropKm: "ពោតក្រហម (កំពង់ចាម)",
      capacity: "68% Regional Target",
      capacityKm: "៦៨% នៃទិសដៅតំបន់",
      demandTrend: "Steady Factory Demand",
      priceOutlook: "Narrow Profit Margin (1,150 KHR/kg)",
      riskScore: "Caution • 56/100",
      icon: AlertTriangle,
      iconColor: "text-[#E69F00]",
    },
    red: {
      status: "High Risk of Glut",
      statusKm: "ហានិភ័យលើសតម្រូវការខ្ពស់",
      badgeClass: "bg-[#D55E00] text-white",
      borderClass: "border-[#D55E00]/30",
      bgSubtle: "bg-[#FDEFE6]",
      crop: "Cassava (Battambang)",
      cropKm: "ដំឡូងមី (បាត់ដំបង)",
      capacity: "92% Capacity Saturated",
      capacityKm: "៩២% នៃសមត្ថភាពស្រូបយក",
      demandTrend: "-38% Projected Factory Crash",
      priceOutlook: "Imminent Price Collapse (< 320 KHR/kg)",
      riskScore: "Severe Risk • 91/100",
      icon: ShieldAlert,
      iconColor: "text-[#D55E00]",
    },
  };

  const currentSignal = signalDetails[activeSignal];
  const SignalIcon = currentSignal.icon;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Subtle Gradient Blobs */}
      <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-radial from-[#2D924F]/10 via-[#1E6B38]/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-40 -z-10 h-[400px] w-[400px] rounded-full bg-radial from-[#E69F00]/10 via-transparent to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7">
            {/* Mission Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2D924F]/25 bg-[#E8F7EC] px-3.5 py-1.5 text-xs font-semibold text-[#1E6B38] shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#2D924F]" />
              <span>
                {lang === "en"
                  ? "Preventing Crop Oversupply & Climate Losses"
                  : "ទប់ស្កាត់ការលើសចំណុះដំណាំ និងគ្រោះអាកាសធាតុ"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[#1C241D] sm:text-5xl sm:leading-[1.15] lg:text-6xl">
              {lang === "en" ? (
                <>
                  Plant with Information,{" "}
                  <span className="text-[#1E6B38] underline decoration-[#2D924F]/40 decoration-wavy underline-offset-8">
                    Not Assumptions.
                  </span>
                </>
              ) : (
                <>
                  ដាំដុះដោយព័ត៌មានជាក់ច្បាស់{" "}
                  <span className="text-[#1E6B38] underline decoration-[#2D924F]/40 decoration-wavy underline-offset-8">
                    មិនមែនដោយការស្មាន។
                  </span>
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#58695B]">
              {lang === "en"
                ? "Empowering Cambodian farmers by combining real-time market demand and climate intelligence to stop price crashes before planting season."
                : "ពង្រឹងសមត្ថភាពកសិករកម្ពុជា តាមរយៈការរួមបញ្ចូលគ្នានូវទិន្នន័យតម្រូវការទីផ្សារ និងព័ត៌មានអាកាសធាតុ ដើម្បីបញ្ចៀសការធ្លាក់ចុះតម្លៃមុនរដូវដាំដុះ។"}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => onOpenWizard("farmer")}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1E6B38] px-7 py-4 text-base font-bold text-white shadow-md shadow-[#1E6B38]/20 transition-all duration-200 hover:bg-[#17532B] hover:shadow-lg hover:shadow-[#1E6B38]/30 sm:w-auto active:scale-98"
              >
                <span>{lang === "en" ? "Check Your Crop Risk Free" : "ពិនិត្យហានិភ័យដំណាំដោយឥតគិតថ្លៃ"}</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-[#58695B] sm:inline">•</span>
                <button
                  onClick={() => onOpenWizard("proxy")}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E6B38] hover:text-[#17532B] hover:underline"
                >
                  <Users className="h-4 w-4 text-[#2D924F]" />
                  <span>
                    {lang === "en"
                      ? "Entering for family? Start Proxy Assessment"
                      : "ជួយវាយតម្លៃឱ្យគ្រួសារ? ចាប់ផ្តើមជម្រើសតំណាង"}
                  </span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#E3E9E1] pt-6 sm:max-w-lg">
              <div>
                <div className="text-2xl font-black text-[#1C241D]">25</div>
                <div className="text-xs font-medium text-[#58695B]">
                  {lang === "en" ? "Provinces Covered" : "គ្របដណ្តប់ ២៥ ខេត្ត-ក្រុង"}
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#2D924F]">94.2%</div>
                <div className="text-xs font-medium text-[#58695B]">
                  {lang === "en" ? "Glut Prevention Rate" : "អត្រាការពារការធ្លាក់ថ្លៃ"}
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#1E6B38]">45,000+</div>
                <div className="text-xs font-medium text-[#58695B]">
                  {lang === "en" ? "Hectares Monitored" : "ហិកតាត្រូវបានតាមដាន"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Smartphone Mockup Preview */}
          <div className="relative flex justify-center lg:col-span-5">
            
            {/* Floating Decorative Elements */}
            <div className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-2.5 rounded-2xl border border-white/60 bg-white/95 p-3.5 shadow-xl backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#1E6B38]">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#58695B]">Pre-Planting Sync</div>
                <div className="text-sm font-bold text-[#1C241D]">Live Intentions Tracking</div>
              </div>
            </div>

            {/* Smartphone Shell */}
            <div className="relative w-full max-w-[340px] rounded-[44px] border-[8px] border-[#1C241D] bg-[#1C241D] p-3 shadow-2xl shadow-black/25 ring-1 ring-white/20">
              
              {/* Phone Speaker / Notch */}
              <div className="absolute top-4 left-1/2 h-4 w-28 -translate-x-1/2 rounded-full bg-black/80 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-zinc-700 mr-2" />
                <div className="h-1.5 w-10 rounded-full bg-zinc-800" />
              </div>

              {/* Phone Inner Screen */}
              <div className="relative overflow-hidden rounded-[32px] bg-[#F7F9F6] p-4 text-[#1C241D] shadow-inner pt-6">
                
                {/* Status Bar */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#58695B] pb-3 border-b border-[#E3E9E1]">
                  <span>CropWise Mobile</span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#2D924F]"></span>
                    Live GPS Sync
                  </span>
                </div>

                {/* Regional Risk Map Miniature */}
                <div className="mt-3 relative rounded-xl border border-[#E3E9E1] bg-white p-3 overflow-hidden">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold flex items-center gap-1 text-[#1C241D]">
                      <MapPin className="h-3.5 w-3.5 text-[#1E6B38]" />
                      Cambodia Risk Grid
                    </span>
                    <span className="text-[10px] text-[#58695B]">Updated 3m ago</span>
                  </div>

                  {/* Stylized Cambodia Province Nodes */}
                  <div className="relative h-28 w-full rounded-lg bg-[#F0F4EF] flex items-center justify-center p-2 border border-dashed border-[#C4D4C7]">
                    {/* Node 1: Battambang */}
                    <button
                      onClick={() => setActiveSignal("red")}
                      className={`absolute top-4 left-8 flex flex-col items-center transition-transform ${
                        activeSignal === "red" ? "scale-110 z-10" : "opacity-75"
                      }`}
                      title="Battambang - Red"
                    >
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D55E00] opacity-75"></span>
                        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#D55E00]"></span>
                      </span>
                      <span className="text-[9px] font-bold text-[#D55E00] bg-white/90 px-1 rounded shadow-xs mt-0.5">
                        Battambang
                      </span>
                    </button>

                    {/* Node 2: Kampong Cham */}
                    <button
                      onClick={() => setActiveSignal("yellow")}
                      className={`absolute top-9 left-28 flex flex-col items-center transition-transform ${
                        activeSignal === "yellow" ? "scale-110 z-10" : "opacity-75"
                      }`}
                      title="Kampong Cham - Yellow"
                    >
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#E69F00]"></span>
                      </span>
                      <span className="text-[9px] font-bold text-[#E69F00] bg-white/90 px-1 rounded shadow-xs mt-0.5">
                        K. Cham
                      </span>
                    </button>

                    {/* Node 3: Takeo */}
                    <button
                      onClick={() => setActiveSignal("green")}
                      className={`absolute bottom-3 left-20 flex flex-col items-center transition-transform ${
                        activeSignal === "green" ? "scale-110 z-10" : "opacity-75"
                      }`}
                      title="Takeo - Green"
                    >
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2D924F] opacity-75"></span>
                        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#2D924F]"></span>
                      </span>
                      <span className="text-[9px] font-bold text-[#2D924F] bg-white/90 px-1 rounded shadow-xs mt-0.5">
                        Takeo
                      </span>
                    </button>

                    <div className="absolute right-2 bottom-1 text-[8px] text-[#58695B] italic">
                      Tap any node to test
                    </div>
                  </div>
                </div>

                {/* Interactive Signal Selector Tabs */}
                <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-white p-1 border border-[#E3E9E1]">
                  <button
                    onClick={() => setActiveSignal("green")}
                    className={`rounded-lg py-1.5 text-[11px] font-bold transition-all ${
                      activeSignal === "green"
                        ? "bg-[#2D924F] text-white shadow-xs"
                        : "text-[#58695B] hover:bg-[#F0F4EF]"
                    }`}
                  >
                    🟢 Green
                  </button>
                  <button
                    onClick={() => setActiveSignal("yellow")}
                    className={`rounded-lg py-1.5 text-[11px] font-bold transition-all ${
                      activeSignal === "yellow"
                        ? "bg-[#E69F00] text-white shadow-xs"
                        : "text-[#58695B] hover:bg-[#F0F4EF]"
                    }`}
                  >
                    🟡 Yellow
                  </button>
                  <button
                    onClick={() => setActiveSignal("red")}
                    className={`rounded-lg py-1.5 text-[11px] font-bold transition-all ${
                      activeSignal === "red"
                        ? "bg-[#D55E00] text-white shadow-xs"
                        : "text-[#58695B] hover:bg-[#F0F4EF]"
                    }`}
                  >
                    🔴 Red
                  </button>
                </div>

                {/* Dynamic Traffic-Light Advice Card */}
                <div className={`mt-3 rounded-2xl border ${currentSignal.borderClass} ${currentSignal.bgSubtle} p-3.5 shadow-sm transition-all duration-200`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SignalIcon className={`h-5 w-5 ${currentSignal.iconColor}`} />
                      <span className="text-xs font-bold text-[#1C241D]">
                        {lang === "en" ? currentSignal.crop : currentSignal.cropKm}
                      </span>
                    </div>
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold ${currentSignal.badgeClass}`}>
                      {lang === "en" ? currentSignal.status : currentSignal.statusKm}
                    </span>
                  </div>

                  <div className="mt-2.5 space-y-1 text-xs">
                    <div className="flex justify-between text-[#1C241D]">
                      <span className="text-[#58695B]">Market Target:</span>
                      <span className="font-semibold">{currentSignal.capacity}</span>
                    </div>
                    <div className="flex justify-between text-[#1C241D]">
                      <span className="text-[#58695B]">Price Outlook:</span>
                      <span className="font-semibold text-right">{currentSignal.priceOutlook}</span>
                    </div>
                  </div>
                </div>

                {/* Embedded Glowing "Run Risk Check" Button */}
                <div className="mt-4">
                  <button
                    onClick={() => onOpenWizard("farmer", {
                      province: activeSignal === "red" ? "Battambang" : activeSignal === "yellow" ? "Kampong Cham" : "Takeo",
                      crop: activeSignal === "red" ? "Cassava" : activeSignal === "yellow" ? "Corn" : "Mung Beans"
                    })}
                    className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#1E6B38] to-[#2D924F] p-3 text-center text-xs font-bold text-white shadow-md shadow-[#1E6B38]/30 transition hover:brightness-105 active:scale-98"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      <Sparkles className="h-4 w-4" />
                      {lang === "en" ? "Run Full Risk Check for My Farm" : "ដំណើរការវាយតម្លៃសម្រាប់កសិដ្ឋានខ្ញុំ"}
                    </span>
                    <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity hover:opacity-100" />
                  </button>
                </div>

              </div>
            </div>

            {/* Bottom Floating Card */}
            <div className="absolute -bottom-6 -right-4 z-20 hidden sm:flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-3.5 shadow-xl backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF7E6] text-[#E69F00]">
                <SunMedium className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#58695B]">Mekong Climate Index</div>
                <div className="text-sm font-bold text-[#1C241D]">El Niño Safe Windows</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
