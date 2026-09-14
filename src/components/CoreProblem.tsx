"use client";

import React from "react";
import {
  TrendingDown,
  CloudLightning,
  AlertOctagon,
  ArrowDownRight,
  ShieldX,
  Droplets,
  SunMedium,
  TrendingUp,
  Flame,
} from "lucide-react";

interface CoreProblemProps {
  lang: "en" | "km";
}

export const CoreProblem: React.FC<CoreProblemProps> = ({ lang }) => {
  return (
    <section className="relative bg-[#F7F9F6] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D55E00]/20 bg-[#FDEFE6] px-3.5 py-1 text-xs font-bold text-[#D55E00]">
            <AlertOctagon className="h-3.5 w-3.5 text-[#D55E00]" />
            <span>{lang === "en" ? "Systemic Vulnerabilities" : "បញ្ហាប្រឈមជាប្រព័ន្ធ"}</span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#1C241D] sm:text-4xl">
            {lang === "en"
              ? "Why Cambodian Farmers Lose Despite Working Hard"
              : "មូលហេតុដែលកសិករខ្មែរប្រឈមនឹងការខាតបង់ ទោះបីខិតខំធ្វើការ"}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#58695B]">
            {lang === "en"
              ? "Without coordinated visibility into what neighboring provinces are planting or impending monsoon anomalies, rural farmers bear 100% of market volatility."
              : "ដោយសារគ្មានទិន្នន័យរួមថាខេត្តជិតខាងកំពុងដាំអ្វី ឬអាកាសធាតុកំពុងប្រែប្រួលយ៉ាងណា កសិករត្រូវរែកពន់ហានិភ័យទាំងស្រុងនៃទីផ្សារ។"}
          </p>
        </div>

        {/* 2-Column Split Cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          
          {/* Card 1: The Oversupply Trap */}
          <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E3E9E1] bg-white p-7 shadow-sm transition hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDEFE6] text-[#D55E00]">
                    <TrendingDown className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D55E00]">
                      {lang === "en" ? "Economic Breakdown" : "វិបត្តិសេដ្ឋកិច្ច"}
                    </span>
                    <h3 className="text-2xl font-bold text-[#1C241D]">
                      {lang === "en" ? "The Oversupply Trap" : "អន្ទាក់នៃការលើសទិន្នផល"}
                    </h3>
                  </div>
                </div>
                <span className="rounded-full bg-[#FDEFE6] px-3 py-1 text-xs font-black text-[#D55E00]">
                  -45% Margin Crash
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#58695B]">
                {lang === "en"
                  ? "When high prices occur in Year 1, thousands of independent farmers switch to the same crop simultaneously in Year 2. Saturated wholesale depots drop buying prices below harvesting costs, pushing smallholders into predatory debt cycles."
                  : "នៅពេលឆ្នាំទី១ ដំណាំណាមួយមានតម្លៃថ្លៃ កសិកររាប់ពាន់គ្រួសារសម្រុកដាំដំណាំនោះក្នុងឆ្នាំទី២។ នៅពេលប្រមូលផលស្របគ្នា ទីផ្សារលើសចំណុះ តម្លៃធ្លាក់ចុះក្រោមថ្លៃដើម បង្កជាបំណុលវណ្ឌក។"}
              </p>

              {/* Visual Graph: Price Collapse Simulation */}
              <div className="mt-6 rounded-2xl border border-[#E3E9E1] bg-[#F7F9F6] p-4">
                <div className="flex items-center justify-between text-xs font-bold text-[#58695B] pb-2 border-b border-[#E3E9E1]">
                  <span>{lang === "en" ? "Cassava Price Curve (KHR/kg)" : "ក្រាហ្វិកតម្លៃដំឡូងមី (រៀល/គីឡូ)"}</span>
                  <span className="text-[#D55E00] flex items-center gap-1">
                    <ArrowDownRight className="h-3.5 w-3.5" /> Uncoordinated Gluts
                  </span>
                </div>

                {/* SVG Visualized Chart */}
                <div className="mt-3 relative h-36 w-full">
                  <svg className="h-full w-full overflow-visible" viewBox="0 0 400 120">
                    <defs>
                      <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#D55E00" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#D55E00" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="greenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1E6B38" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#1E6B38" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Background Grid Lines */}
                    <line x1="0" y1="30" x2="400" y2="30" stroke="#E3E9E1" strokeDasharray="3 3" />
                    <line x1="0" y1="70" x2="400" y2="70" stroke="#E3E9E1" strokeDasharray="3 3" />
                    <line x1="0" y1="110" x2="400" y2="110" stroke="#E3E9E1" />

                    {/* Uncoordinated Curve (Crash) */}
                    <path
                      d="M 10,25 Q 120,20 190,60 T 390,110 L 390,110 L 10,110 Z"
                      fill="url(#redGrad)"
                    />
                    <path
                      d="M 10,25 Q 120,20 190,60 T 390,110"
                      fill="none"
                      stroke="#D55E00"
                      strokeWidth="3"
                    />

                    {/* CropWise Managed Curve (Stabilized) */}
                    <path
                      d="M 10,40 Q 120,38 200,42 T 390,36"
                      fill="none"
                      stroke="#1E6B38"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />

                    {/* Annotations */}
                    <circle cx="10" cy="25" r="4" fill="#D55E00" />
                    <circle cx="190" cy="60" r="4" fill="#D55E00" />
                    <circle cx="390" cy="110" r="5" fill="#D55E00" />

                    <circle cx="390" cy="36" r="4" fill="#1E6B38" />
                  </svg>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-[#58695B]">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#D55E00]" />
                    {lang === "en" ? "Uncoordinated: 280 KHR/kg (Loss)" : "គ្មានការសម្របសម្រួល: ២៨០ រៀល"}
                  </span>
                  <span className="flex items-center gap-1 text-[#1E6B38] font-bold">
                    <span className="h-2 w-2 rounded-full bg-[#1E6B38]" />
                    {lang === "en" ? "CropWise Protected: 680 KHR/kg" : "ការពារដោយ CropWise: ៦៨០ រៀល"}
                  </span>
                </div>
              </div>
            </div>

            {/* Impact Metric */}
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#FDEFE6]/70 p-3 text-xs text-[#D55E00]">
              <ShieldX className="h-4 w-4 shrink-0" />
              <span>
                {lang === "en"
                  ? "Over 62% of Cambodian cassava farmers experienced a severe price shock in the last 3 seasons."
                  : "ជាង ៦២% នៃកសិករដាំដំឡូងមីនៅកម្ពុជា ធ្លាប់ជួបវិបត្តិធ្លាក់ថ្លៃធ្ងន់ធ្ងរក្នុងរយៈពេល ៣ រដូវកាលចុងក្រោយ។"}
              </span>
            </div>
          </div>

          {/* Card 2: Climate Vulnerability */}
          <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E3E9E1] bg-white p-7 shadow-sm transition hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEF7E6] text-[#E69F00]">
                    <CloudLightning className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E69F00]">
                      {lang === "en" ? "Environmental Shock" : "គ្រោះធម្មជាតិ"}
                    </span>
                    <h3 className="text-2xl font-bold text-[#1C241D]">
                      {lang === "en" ? "Climate Vulnerability" : "ភាពងាយរងគ្រោះដោយអាកាសធាតុ"}
                    </h3>
                  </div>
                </div>
                <span className="rounded-full bg-[#FEF7E6] px-3 py-1 text-xs font-black text-[#E69F00]">
                  Monsoon Shifts
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#58695B]">
                {lang === "en"
                  ? "Late rains, prolonged mid-season dry spells, and sudden flooding in lowlands destroy seasonal crops unsuited to shifting rainfall patterns. Without localized climate warnings, investment in seeds and fertilizer is wiped out."
                  : "របបទឹកភ្លៀងមកយឺត រាំងស្ងួតកណ្តាលរដូវ និងទឹកជំនន់ភ្លាមៗ បានបំផ្លាញដំណាំដែលមិនធន់នឹងការប្រែប្រួលអាកាសធាតុ។ បើគ្មានការព្យាករណ៍ច្បាស់លាស់ ការចំណាយលើពូជ និងជីត្រូវខាតបង់ទាំងស្រុង។"}
              </p>

              {/* Visual Graphic: Climate Indicators */}
              <div className="mt-6 rounded-2xl border border-[#E3E9E1] bg-[#F7F9F6] p-4">
                <div className="flex items-center justify-between text-xs font-bold text-[#58695B] pb-2 border-b border-[#E3E9E1]">
                  <span>{lang === "en" ? "Regional Climate Risk Indicators" : "សន្ទស្សន៍ហានិភ័យអាកាសធាតុប្រចាំតំបន់"}</span>
                  <span className="text-[#E69F00] flex items-center gap-1 font-semibold">
                    <SunMedium className="h-3.5 w-3.5" /> High Irregularity
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  {/* Gauge 1 */}
                  <div className="rounded-xl border border-[#E3E9E1] bg-white p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#58695B]">
                        {lang === "en" ? "Precipitation Anomaly" : "កម្រិតទឹកភ្លៀងប្រែប្រួល"}
                      </span>
                      <Droplets className="h-4 w-4 text-[#2D924F]" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-xl font-bold text-[#D55E00]">-32%</span>
                      <span className="text-[10px] text-[#58695B]">vs. 10-yr average</span>
                    </div>
                    <div className="mt-1 text-[11px] text-[#D55E00] font-medium">
                      Battambang & Banteay Meanchey
                    </div>
                  </div>

                  {/* Gauge 2 */}
                  <div className="rounded-xl border border-[#E3E9E1] bg-white p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#58695B]">
                        {lang === "en" ? "Soil Moisture Stress" : "កម្រិតសំណើមដី"}
                      </span>
                      <Flame className="h-4 w-4 text-[#E69F00]" />
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-xl font-bold text-[#E69F00]">High</span>
                      <span className="text-[10px] text-[#58695B]">Dry spell window</span>
                    </div>
                    <div className="mt-1 text-[11px] text-[#E69F00] font-medium">
                      Requires Drought-Resistant Crops
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-[#EAF4EE] p-2.5 text-center text-xs font-bold text-[#1E6B38]">
                  {lang === "en"
                    ? "✓ CropWise cross-references seasonal rainfall forecasts before recommending planting"
                    : "✓ CropWise ផ្ទៀងផ្ទាត់ការព្យាករណ៍ទឹកភ្លៀង មុននឹងផ្តល់អនុសាសន៍ដាំដុះ"}
                </div>
              </div>
            </div>

            {/* Impact Metric */}
            <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#FEF7E6]/70 p-3 text-xs text-[#E69F00]">
              <CloudLightning className="h-4 w-4 shrink-0" />
              <span>
                {lang === "en"
                  ? "Over \$120M in agricultural loss occurs annually in Cambodia due to unpredicted seasonal weather shocks."
                  : "ការខាតបង់ក្នុងវិស័យកសិកម្មប្រមាណជាង ១២០ លានដុល្លារកើតឡើងជារៀងរាល់ឆ្នាំនៅកម្ពុជា ដោយសារគ្រោះអាកាសធាតុដែលមិនអាចដឹងមុន។"}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
