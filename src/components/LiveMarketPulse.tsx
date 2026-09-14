"use client";

import React from "react";
import {
  TrendingDown,
  TrendingUp,
  AlertCircle,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  Radio,
  Flame,
} from "lucide-react";

interface LiveMarketPulseProps {
  onSelectPulseCard: (province: string, crop: string) => void;
  lang: "en" | "km";
}

interface PulseItem {
  crop: string;
  cropKm: string;
  province: string;
  provinceKm: string;
  status: "high" | "ideal" | "moderate";
  badgeText: string;
  badgeTextKm: string;
  capacityReached: number;
  marketNote: string;
  marketNoteKm: string;
  priceTrend: string;
  isPositive: boolean;
}

export const LiveMarketPulse: React.FC<LiveMarketPulseProps> = ({ onSelectPulseCard, lang }) => {
  const pulseData: PulseItem[] = [
    {
      crop: "Cassava",
      cropKm: "ដំឡូងមី",
      province: "Battambang",
      provinceKm: "បាត់ដំបង",
      status: "high",
      badgeText: "🔴 High Risk (92% Capacity Reached)",
      badgeTextKm: "🔴 ហានិភ័យខ្ពស់ (ដល់ ៩២% នៃសមត្ថភាព)",
      capacityReached: 92,
      marketNote: "Massive uncoordinated harvest expected in Oct-Nov. Starch factories oversupplied.",
      marketNoteKm: "ការប្រមូលផលស្របគ្នាច្រើនពេកនៅខែតុលា-វិច្ឆិកា។ រោងចក្រកែច្នៃលើសស្តុក។",
      priceTrend: "-38% Price Crash Expected",
      isPositive: false,
    },
    {
      crop: "Mung Beans",
      cropKm: "សណ្ដែកបាយ",
      province: "Takeo",
      provinceKm: "តាកែវ",
      status: "ideal",
      badgeText: "🟢 Ideal to Plant (High Export Demand)",
      badgeTextKm: "🟢 ល្អបំផុតក្នុងការដាំ (តម្រូវការនាំចេញខ្ពស់)",
      capacityReached: 34,
      marketNote: "High export demand to Vietnam & Japan. Local storage underfilled.",
      marketNoteKm: "តម្រូវការនាំចេញទៅវៀតណាម និងជប៉ុនខ្ពស់។ ឃ្លាំងស្តុកក្នុងស្រុកខ្វះទំនិញ។",
      priceTrend: "+18% Target Premium",
      isPositive: true,
    },
    {
      crop: "Corn",
      cropKm: "ពោតក្រហម",
      province: "Kampong Cham",
      provinceKm: "កំពង់ចាម",
      status: "moderate",
      badgeText: "🟡 Moderate Risk (Proceed with Caution)",
      badgeTextKm: "🟡 ហានិភ័យមធ្យម (គួរប្រុងប្រយ័ត្ន)",
      capacityReached: 68,
      marketNote: "Feedmill quotas near ceiling. Early contract agreements recommended.",
      marketNoteKm: "កូតារោងចក្រចំណីសត្វជិតពេញ។ ណែនាំឱ្យចុះកិច្ចសន្យាជាមុន។",
      priceTrend: "Neutral Price Outlook",
      isPositive: true,
    },
    {
      crop: "Cashew Nuts",
      cropKm: "គ្រាប់ស្វាយចន្ទី",
      province: "Kampong Thom",
      provinceKm: "កំពង់ធំ",
      status: "ideal",
      badgeText: "🟢 Low Risk (Strong Liquidity)",
      badgeTextKm: "🟢 ហានិភ័យទាប (ទីផ្សាររឹងមាំ)",
      capacityReached: 41,
      marketNote: "New processing hubs active in Kampong Thom. High buyer interest.",
      marketNoteKm: "រោងចក្រកែច្នៃថ្មីដំណើរការនៅកំពង់ធំ។ អ្នកទិញមានតម្រូវការខ្ពស់។",
      priceTrend: "+12% Spot Stability",
      isPositive: true,
    },
  ];

  return (
    <section id="live-signals" className="relative border-y border-[#E3E9E1] bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Live Ticker Badge */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#D55E00]">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D55E00]">
                {lang === "en" ? "Live Market Pulse • Real-Time Stream" : "ចរន្តទីផ្សារផ្ទាល់ • ទិន្នន័យជាក់ស្តែង"}
              </span>
            </div>
            <h2 className="mt-1.5 text-2xl font-black tracking-tight text-[#1C241D] sm:text-3xl">
              {lang === "en" ? "Pre-Planting Market Capacity Signals" : "សញ្ញាសមត្ថភាពទីផ្សារ មុនរដូវដាំដុះ"}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#58695B]">
            <Radio className="h-4 w-4 text-[#1E6B38] animate-pulse" />
            <span>
              {lang === "en"
                ? "Aggregated from 14 Wholesale Depots & 48 Agricultural Co-ops"
                : "ប្រមូលទិន្នន័យពីដេប៉ូបោះដុំ ១៤ កន្លែង និងសហគមន៍កសិកម្ម ៤៨"}
            </span>
          </div>
        </div>

        {/* Interactive Cards Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pulseData.map((item, idx) => {
            const isHigh = item.status === "high";
            const isIdeal = item.status === "ideal";
            const isModerate = item.status === "moderate";

            const borderHighlight = isHigh
              ? "hover:border-[#D55E00] hover:ring-2 hover:ring-[#D55E00]/20"
              : isIdeal
              ? "hover:border-[#2D924F] hover:ring-2 hover:ring-[#2D924F]/20"
              : "hover:border-[#E69F00] hover:ring-2 hover:ring-[#E69F00]/20";

            const badgeBg = isHigh
              ? "bg-[#FDEFE6] text-[#D55E00] border-[#D55E00]/30"
              : isIdeal
              ? "bg-[#E8F7EC] text-[#1E6B38] border-[#2D924F]/30"
              : "bg-[#FEF7E6] text-[#E69F00] border-[#E69F00]/30";

            const barColor = isHigh
              ? "bg-[#D55E00]"
              : isIdeal
              ? "bg-[#2D924F]"
              : "bg-[#E69F00]";

            return (
              <div
                key={idx}
                onClick={() => onSelectPulseCard(item.province, item.crop)}
                className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-[#E3E9E1] bg-[#F7F9F6] p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-lg ${borderHighlight}`}
              >
                <div>
                  {/* Top Header: Province & Crop */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#58695B]">
                        {lang === "en" ? item.province : item.provinceKm} Province
                      </span>
                      <h3 className="text-xl font-bold text-[#1C241D] group-hover:text-[#1E6B38]">
                        {lang === "en" ? item.crop : item.cropKm}
                      </h3>
                    </div>
                    <div className="rounded-full bg-white p-1.5 shadow-xs transition group-hover:bg-[#1E6B38] group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Status Indicator Badge */}
                  <div className="mt-3">
                    <span
                      className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold ${badgeBg}`}
                    >
                      {lang === "en" ? item.badgeText : item.badgeTextKm}
                    </span>
                  </div>

                  {/* Capacity Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-medium text-[#58695B]">
                      <span>{lang === "en" ? "Market Quota Saturated" : "សមត្ថភាពស្រូបយកទីផ្សារ"}</span>
                      <span className="font-bold text-[#1C241D]">{item.capacityReached}%</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#E3E9E1]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${item.capacityReached}%` }}
                      />
                    </div>
                  </div>

                  {/* Market Note */}
                  <p className="mt-3.5 text-xs leading-relaxed text-[#58695B]">
                    {lang === "en" ? item.marketNote : item.marketNoteKm}
                  </p>
                </div>

                {/* Bottom Interactive CTA Trigger */}
                <div className="mt-5 border-t border-[#E3E9E1] pt-3">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span
                      className={
                        item.isPositive ? "text-[#2D924F]" : "text-[#D55E00]"
                      }
                    >
                      {item.priceTrend}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#1E6B38] transition-colors group-hover:text-[#17532B] group-hover:underline">
                    <span>
                      {lang === "en"
                        ? "Click to calculate your risk in this region"
                        : "ចុចដើម្បីគណនាហានិភ័យរបស់អ្នកក្នុងតំបន់នេះ"}
                    </span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
