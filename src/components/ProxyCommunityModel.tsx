"use client";

import React from "react";
import {
  Users,
  Printer,
  QrCode,
  CheckCircle2,
  Smartphone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  FileCheck2,
} from "lucide-react";

interface ProxyCommunityModelProps {
  onOpenWizard: (mode: "farmer" | "proxy") => void;
  lang: "en" | "km";
}

export const ProxyCommunityModel: React.FC<ProxyCommunityModelProps> = ({
  onOpenWizard,
  lang,
}) => {
  return (
    <section id="proxy-model" className="relative bg-[#F7F9F6] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Tag */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E6B38]/30 bg-[#E8F7EC] px-3.5 py-1 text-xs font-bold text-[#1E6B38]">
            <HeartHandshake className="h-3.5 w-3.5 text-[#2D924F]" />
            <span>{lang === "en" ? "Bridging the Digital Divide" : "លុបបំបាត់គម្លាតបច្ចេកវិទ្យា"}</span>
          </div>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-[#1C241D] sm:text-4xl">
            {lang === "en"
              ? "Designed for Rural Reality: The Proxy-Agent Model"
              : "រចនាឡើងស្របតាមជីវភាពជនបទពិតប្រាកដ: គំរូតំណាងសហគមន៍"}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#58695B]">
            {lang === "en"
              ? "Over 70% of older smallholder farmers don't use smartphones. CropWise enables tech-savvy youth and local agricultural co-op agents to act as authorized proxies, generating offline physical slips."
              : "កសិករវ័យចំណាស់ជាង ៧០% មិនប្រើប្រាស់ស្មាតហ្វូន។ CropWise អនុញ្ញាតឱ្យយុវជន និងភ្នាក់ងារសហគមន៍កសិកម្ម ធ្វើជាតំណាងបញ្ចូលទិន្នន័យ និងបោះពុម្ពប័ណ្ណក្រដាសដោយផ្ទាល់ជូនពួកគាត់។"}
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
          
          {/* Left: Interactive/Visual Graphic of Mobile Printer & Physical Slip */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Background Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#1E6B38] to-[#2D924F] opacity-20 blur-xl"></div>

              {/* Physical Slip Card */}
              <div className="relative rounded-3xl border border-[#E3E9E1] bg-white p-6 shadow-xl">
                
                {/* Mobile Slip Header */}
                <div className="border-b-2 border-dashed border-[#C4D4C7] pb-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-sm font-black text-[#1E6B38]">
                    <FileCheck2 className="h-4 w-4" />
                    <span>CROPWISE CAMBODIA • វិញ្ញាបនបត្រ</span>
                  </div>
                  <div className="mt-1 text-[11px] text-[#58695B]">
                    Field Assessment Summary Receipt
                  </div>
                  <div className="mt-1 text-[10px] font-mono text-zinc-400">
                    ID: CW-TA-2026-8849 | 06-Sep-2026
                  </div>
                </div>

                {/* Slip Details Body */}
                <div className="py-4 space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-[#F0F4EF] pb-1.5">
                    <span className="text-[#58695B]">Farmer / កសិករ:</span>
                    <span className="font-bold text-[#1C241D]">Lok Ta Seng (លោកតា សេង)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F0F4EF] pb-1.5">
                    <span className="text-[#58695B]">Proxy Agent / អ្នកជួយ:</span>
                    <span className="font-bold text-[#1E6B38]">Seng Sopheak (Daughter / កូនស្រី)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F0F4EF] pb-1.5">
                    <span className="text-[#58695B]">Location / ទីតាំង:</span>
                    <span className="font-bold text-[#1C241D]">Bati District, Takeo (ខេត្តតាកែវ)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F0F4EF] pb-1.5">
                    <span className="text-[#58695B]">Planned Crop / ដំណាំ:</span>
                    <span className="font-bold text-[#1C241D]">Mung Beans • 1.5 Hectares</span>
                  </div>

                  {/* Highlighted Recommendation Stamp */}
                  <div className="mt-3 rounded-2xl bg-[#E8F7EC] border border-[#2D924F]/30 p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-sm font-black text-[#1E6B38]">
                      <ShieldCheck className="h-5 w-5 text-[#2D924F]" />
                      <span>🟢 LOW RISK • APPROVED TO PLANT</span>
                    </div>
                    <div className="text-[11px] text-[#1E6B38] font-semibold mt-0.5">
                      ល្អប្រសើរក្នុងការដាំ • សមត្ថភាពស្រូបយកទីផ្សារ ៣៤%
                    </div>
                    <div className="text-[10px] text-[#58695B] mt-1">
                      Forward contract buyer match available at Bati Agri-Coop
                    </div>
                  </div>
                </div>

                {/* Slip Footer with QR & Thermal Printer Icon */}
                <div className="border-t-2 border-dashed border-[#C4D4C7] pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-[#F7F9F6] p-2 border border-[#E3E9E1]">
                      <QrCode className="h-9 w-9 text-[#1C241D]" />
                    </div>
                    <div className="text-[10px] text-[#58695B] leading-tight">
                      <div className="font-bold text-[#1C241D]">Scan for Digital Ledger</div>
                      <div>Khmer Audio Summary</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#1E6B38] bg-[#EAF4EE] px-2.5 py-1.5 rounded-xl">
                    <Printer className="h-3.5 w-3.5" />
                    <span>Printed in Field</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right: Explanations & Dedicated Proxy CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="rounded-2xl border border-[#E3E9E1] bg-white p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F7EC] text-[#1E6B38]">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C241D]">
                    {lang === "en" ? "1. Youth Agritech Ambassadors" : "១. យុវជនជាឯកអគ្គរដ្ឋទូតកសិកម្ម"}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#58695B]">
                    {lang === "en"
                      ? "Family members studying in provincial towns or Phnom Penh can evaluate farm plots remotely on behalf of their parents, saving them from costly planting mistakes."
                      : "កូនចៅដែលរៀននៅទីប្រជុំជន ឬភ្នំពេញ អាចជួយវាយតម្លៃដីស្រែចម្ការពីចម្ងាយជូនឪពុកម្តាយ ដោយជួយសន្សំប្រាក់ និងបញ្ចៀសការខាតបង់។"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E3E9E1] bg-white p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FEF7E6] text-[#E69F00]">
                  <Printer className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C241D]">
                    {lang === "en" ? "2. Field Agents with Portable Printers" : "២. ភ្នាក់ងារសហគមន៍ជាមួយម៉ាស៊ីនព្រីនចល័ត"}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#58695B]">
                    {lang === "en"
                      ? "Agricultural cooperative officers visit villages with handheld devices and mini Bluetooth thermal printers, issuing tangible verification slips farmers can take to local banks or seed shops."
                      : "មន្ត្រីសហគមន៍កសិកម្មចុះតាមភូមិជាមួយម៉ាស៊ីនព្រីនខ្នាតតូច បោះពុម្ពប័ណ្ណអនុសាសន៍ជាក់ស្តែង ដែលកសិករអាចយកទៅបង្ហាញធនាគារ ឬដេប៉ូគ្រាប់ពូជ។"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E3E9E1] bg-white p-6 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF4EE] text-[#2D924F]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C241D]">
                    {lang === "en" ? "3. Audio & Voice Guidance in Khmer" : "៣. សំឡេងណែនាំជាភាសាខ្មែរ"}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#58695B]">
                    {lang === "en"
                      ? "Every risk advisory is equipped with one-tap Khmer voice playback, ensuring total accessibility regardless of reading literacy."
                      : "គ្រប់អនុសាសន៍ហានិភ័យមានប៊ូតុងចាក់សំឡេងជាភាសាខ្មែរ ធានាថាកសិករគ្រប់រូបអាចស្តាប់ និងយល់បានយ៉ាងងាយ។"}
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated Proxy CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => onOpenWizard("proxy")}
                className="group inline-flex items-center gap-3 rounded-2xl bg-[#2D924F] px-8 py-4 text-base font-bold text-white shadow-md shadow-[#2D924F]/20 transition-all duration-200 hover:bg-[#1E6B38] hover:shadow-lg active:scale-98"
              >
                <Users className="h-5 w-5" />
                <span>
                  {lang === "en"
                    ? "Manage Farm for Family / Co-op"
                    : "គ្រប់គ្រងកសិដ្ឋានសម្រាប់គ្រួសារ / សហគមន៍"}
                </span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
