"use client";

import React, { useState } from "react";
import {
  FileText,
  Layers,
  Cpu,
  TrafficCone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  Database,
  BarChart3,
  Smartphone,
} from "lucide-react";

interface HowItWorksProps {
  onOpenWizard: (mode?: "farmer" | "proxy") => void;
  lang: "en" | "km";
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenWizard, lang }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: "Data Input",
      titleKm: "ការបញ្ចូលទិន្នន័យ",
      subtitle: "Farmers or family proxies enter location, land size, and crop choices.",
      subtitleKm: "កសិករ ឬកូនចៅតំណាង បញ្ចូលទីតាំង ទំហំដី និងប្រភេទដំណាំដែលគ្រោងនឹងដាំ។",
      icon: FileText,
      badge: "Fast & Mobile Friendly",
      badgeKm: "ងាយស្រួលលើទូរស័ព្ទ",
      details: [
        { en: "Select your province and district", km: "ជ្រើសរើសខេត្ត និងស្រុករបស់អ្នក" },
        { en: "Enter planned farm size in hectares", km: "បញ្ចូលទំហំដីគិតជាហិកតា" },
        { en: "Choose prospective crop (Cassava, Corn, Mung Bean, etc.)", km: "ជ្រើសរើសដំណាំគ្រោងដាំ (ដំឡូងមី, ពោត, សណ្ដែក...)" },
        { en: "Proxy toggle for cooperative agents or family members", km: "មុខងារជំនួយសម្រាប់ភ្នាក់ងារសហគមន៍ ឬកូនចៅ" },
      ],
      metric: "< 2 Minutes to complete",
      metricKm: "ចំណាយពេលតិចជាង ២ នាទី",
    },
    {
      step: 2,
      title: "Real-Time Aggregation",
      titleKm: "ការបូកសរុបទិន្នន័យផ្ទាល់",
      subtitle: "System aggregates nationwide planting intentions before seeds touch the ground.",
      subtitleKm: "ប្រព័ន្ធបូកសរុបបំណងដាំដុះទូទាំងប្រទេសភ្លាមៗ មុនពេលគ្រាប់ពូជត្រូវបានព្រោះ។",
      icon: Layers,
      badge: "Nationwide Visibility",
      badgeKm: "មើលឃើញទូទាំងប្រទេស",
      details: [
        { en: "Real-time summation of committed land area per crop", km: "បូកសរុបទំហំដីដាំដុះជាក់ស្តែងតាមប្រភេទដំណាំ" },
        { en: "Prevents duplicate clusters in adjacent provinces", km: "ការពារការដាំជាន់គ្នាក្នុងខេត្តជិតខាង" },
        { en: "Syncs with agricultural cooperative depots and seed suppliers", km: "ភ្ជាប់ទិន្នន័យជាមួយដេប៉ូសហគមន៍កសិកម្ម" },
        { en: "Dynamic capacity meters updated continuously", km: "របារសមត្ថភាពទីផ្សារធ្វើបច្ចុប្បន្នភាពជាប់ជានិច្ច" },
      ],
      metric: "Aggregated across 25 provinces",
      metricKm: "ទិន្នន័យ ២៥ ខេត្ត-ក្រុង",
    },
    {
      step: 3,
      title: "Predictive Analytics",
      titleKm: "ការវិភាគព្យាករណ៍ AI",
      subtitle: "Cross-references market capacity, factory absorption, and climate forecasts.",
      subtitleKm: "ផ្ទៀងផ្ទាត់សមត្ថភាពទិញរបស់រោងចក្រ និងការព្យាករណ៍អាកាសធាតុស្វ័យប្រវត្តិ។",
      icon: Cpu,
      badge: "AI & Climate Engine",
      badgeKm: "ម៉ាស៊ីន AI & អាកាសធាតុ",
      details: [
        { en: "Estimates total yield vs. domestic & export demand quotas", km: "ប៉ាន់ស្មានទិន្នផលសរុប ធៀបនឹងកូតាតម្រូវការនាំចេញ" },
        { en: "Cross-checks NOAA & Mekong rainfall radar projections", km: "ផ្ទៀងផ្ទាត់រ៉ាដាទឹកភ្លៀងតំបន់ទន្លេមេគង្គ" },
        { en: "Identifies high-risk price collapse thresholds early", km: "កំណត់ចំណុចប្រឈមនៃការធ្លាក់ថ្លៃជាមុន" },
        { en: "Calculates profit margin confidence intervals", km: "គណនាសមាមាត្រប្រាក់ចំណេញរំពឹងទុក" },
      ],
      metric: "XGBoost + PostGIS Spatial Engine",
      metricKm: "ប្រព័ន្ធគណនា XGBoost & PostGIS",
    },
    {
      step: 4,
      title: "Traffic-Light Signal",
      titleKm: "សញ្ញាភ្លើងចរាចរណ៍",
      subtitle: "Delivers simple Green, Yellow, or Red planting guidance with clear alternatives.",
      subtitleKm: "ផ្តល់អនុសាសន៍សាមញ្ញ បៃតង លឿង ឬក្រហម រួមជាមួយដំណាំជម្រើស។",
      icon: TrafficCone,
      badge: "Intuitive Action",
      badgeKm: "ងាយយល់ និងអនុវត្ត",
      details: [
        { en: "🟢 Green: Safe to plant, high market appetite", km: "🟢 បៃតង: មានសុវត្ថិភាពខ្ពស់ក្នុងការដាំ តម្រូវការខ្លាំង" },
        { en: "🟡 Yellow: Caution, proceed only with forward contract", km: "🟡 លឿង: គួរប្រុងប្រយ័ត្ន គួរមានកុងត្រាទិញជាមុន" },
        { en: "🔴 Red: High glut risk, alternative crop suggested immediately", km: "🔴 ក្រហម: ហានិភ័យលើសចំណុះ ណែនាំដំណាំជម្រើសភ្លាមៗ" },
        { en: "Generate printable physical slip or SMS/Telegram alert", km: "អាចបោះពុម្ពប័ណ្ណសង្ខេប ឬទទួលសារ Telegram" },
      ],
      metric: "Clear go/no-go recommendation",
      metricKm: "ការសម្រេចចិត្តច្បាស់លាស់",
    },
  ];

  const current = steps.find((s) => s.step === activeStep) || steps[0];
  const StepIcon = current.icon;

  return (
    <section id="how-it-works" className="border-t border-[#E3E9E1] bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2D924F]/30 bg-[#E8F7EC] px-3.5 py-1 text-xs font-bold text-[#1E6B38]">
            <Zap className="h-3.5 w-3.5 text-[#2D924F]" />
            <span>{lang === "en" ? "4-Step Intelligence Loop" : "ដំណើរការវៃឆ្លាត ៤ ជំហាន"}</span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#1C241D] sm:text-4xl">
            {lang === "en" ? "How CropWise Protects Your Harvest" : "របៀបដែល CropWise ការពារការប្រមូលផលរបស់អ្នក"}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#58695B]">
            {lang === "en"
              ? "From a simple smartphone input to nationwide real-time aggregation, our platform transforms fragmented farming into a synchronized powerhouse."
              : "ពីការបញ្ចូលទិន្នន័យងាយៗលើទូរស័ព្ទ រហូតដល់ការបូកសរុបទូទាំងប្រទេស CropWise ប្រែក្លាយការដាំដុះដោយឯកឯង ទៅជាផែនការរួមដ៏រឹងមាំ។"}
          </p>
        </div>

        {/* 4 Steps Horizontal Selector Cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const isSelected = s.step === activeStep;
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-all duration-200 ${
                  isSelected
                    ? "border-[#1E6B38] bg-[#EAF4EE] shadow-md ring-2 ring-[#1E6B38]/30"
                    : "border-[#E3E9E1] bg-[#F7F9F6] hover:border-[#2D924F]/50 hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm font-black transition-colors ${
                        isSelected
                          ? "bg-[#1E6B38] text-white"
                          : "bg-white text-[#58695B] border border-[#E3E9E1]"
                      }`}
                    >
                      0{s.step}
                    </span>
                    <Icon
                      className={`h-5 w-5 transition-colors ${
                        isSelected ? "text-[#1E6B38]" : "text-[#58695B]"
                      }`}
                    />
                  </div>
                  <h3
                    className={`mt-4 text-lg font-bold transition-colors ${
                      isSelected ? "text-[#1E6B38]" : "text-[#1C241D]"
                    }`}
                  >
                    {lang === "en" ? s.title : s.titleKm}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#58695B]">
                    {lang === "en" ? s.subtitle : s.subtitleKm}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E3E9E1]">
                  <span
                    className={`text-[11px] font-bold ${
                      isSelected ? "text-[#1E6B38]" : "text-[#58695B]"
                    }`}
                  >
                    {lang === "en" ? s.badge : s.badgeKm}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Step Interactive Spotlight Showcase */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-[#1E6B38]/20 bg-gradient-to-br from-[#EAF4EE] via-white to-[#F7F9F6] p-6 lg:p-10 shadow-sm">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-lg bg-[#1E6B38] px-3 py-1 text-xs font-bold text-white">
                <span>{lang === "en" ? `Step 0${current.step} In Depth` : `ជំហានទី ០${current.step} លម្អិត`}</span>
              </div>
              <h3 className="mt-3 text-2xl font-black text-[#1C241D] sm:text-3xl">
                {lang === "en" ? current.title : current.titleKm}
              </h3>
              <p className="mt-2 text-base text-[#58695B]">
                {lang === "en" ? current.subtitle : current.subtitleKm}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {current.details.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-xl bg-white p-3 border border-[#E3E9E1] shadow-2xs">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2D924F] mt-0.5" />
                    <span className="text-xs font-medium text-[#1C241D]">
                      {lang === "en" ? d.en : d.km}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E3E9E1] bg-white p-6 text-center shadow-xs lg:col-span-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F7EC] text-[#1E6B38]">
                <StepIcon className="h-8 w-8" />
              </div>
              <div className="mt-4 text-xs font-bold uppercase tracking-wider text-[#58695B]">
                {lang === "en" ? "System Metric" : "សន្ទស្សន៍ប្រព័ន្ធ"}
              </div>
              <div className="mt-1 text-xl font-extrabold text-[#1E6B38]">
                {lang === "en" ? current.metric : current.metricKm}
              </div>
              <p className="mt-2 text-xs text-[#58695B]">
                {lang === "en"
                  ? "Integrated with localized Khmer language support & SMS alerts."
                  : "គាំទ្រភាសាខ្មែរពេញលេញ និងផ្ញើសារ SMS ទៅកាន់កសិករ។"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section Prominent Full-Width CTA */}
        <div className="mt-10">
          <button
            onClick={() => onOpenWizard("farmer")}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#1E6B38] py-5 px-6 text-center text-lg font-bold text-white shadow-lg shadow-[#1E6B38]/25 transition-all duration-200 hover:bg-[#17532B] hover:shadow-xl active:scale-99"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>{lang === "en" ? "Start Step 1: Input Your Farm Details" : "ចាប់ផ្តើមជំហានទី ១: បញ្ចូលព័ត៌មានកសិដ្ឋានរបស់អ្នក"}</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1.5" />
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
        </div>

      </div>
    </section>
  );
};
