"use client";

import React from "react";
import {
  Sprout,
  ShieldCheck,
  Globe,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Heart,
  Share2,
  MessageCircle,
} from "lucide-react";

interface SocialProofFooterProps {
  lang: "en" | "km";
}

export const SocialProofFooter: React.FC<SocialProofFooterProps> = ({ lang }) => {
  const partners = [
    {
      name: "Ministry of Agriculture, Forestry & Fisheries (MAFF)",
      nameKm: "ក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ",
      tag: "Institutional Data Partner",
    },
    {
      name: "Cambodian Federation of Agricultural Producer Cooperatives",
      nameKm: "សហព័ន្ធសហគមន៍កសិកម្មកម្ពុជា (CACP)",
      tag: "48 Pilot Cooperatives",
    },
    {
      name: "UNDP Cambodia Climate Resilience Fund",
      nameKm: "មូលនិធិ UNDP កម្ពុជា",
      tag: "Climate Grant Supporter",
    },
    {
      name: "USAID Feed the Future Initiative",
      nameKm: "គម្រោង USAID Feed the Future",
      tag: "Technology Partner",
    },
    {
      name: "CIRAD Agricultural Research Center",
      nameKm: "វិទ្យាស្ថានស្រាវជ្រាវ CIRAD",
      tag: "Agronomic Models",
    },
  ];

  return (
    <footer id="partners" className="border-t border-[#E3E9E1] bg-white">
      {/* Partner Logos Banner */}
      <div className="border-b border-[#E3E9E1] bg-[#F7F9F6] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#58695B]">
              {lang === "en"
                ? "Supported by Government Development Funds, Agricultural Cooperatives, and NGOs"
                : "គាំទ្រដោយមូលនិធិអភិវឌ្ឍន៍រាជរដ្ឋាភិបាល សហគមន៍កសិកម្ម និងអង្គការអន្តរជាតិ"}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((p, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center rounded-2xl border border-[#E3E9E1] bg-white p-5 text-center shadow-2xs transition hover:border-[#1E6B38]/40 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#1E6B38] mb-2 font-bold text-xs">
                  {p.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-xs font-bold text-[#1C241D] line-clamp-2">
                  {lang === "en" ? p.name : p.nameKm}
                </div>
                <div className="mt-1 text-[10px] font-medium text-[#2D924F]">
                  {p.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E6B38] text-white">
                <Sprout className="h-5 w-5 text-[#E8F7EC]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#1C241D]">
                CropWise<span className="text-[#2D924F]">.org</span>
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#58695B]">
              {lang === "en"
                ? "CropWise is Cambodia's premier open agricultural intelligence platform, dedicated to synchronizing seasonal planting and eliminating market price gluts."
                : "CropWise គឺជាវេទិកាទិន្នន័យកសិកម្មវៃឆ្លាតដំបូងគេនៅកម្ពុជា ជួយសម្របសម្រួលការដាំដុះ និងទប់ស្កាត់ការលើសចំណុះដំណាំ។"}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3E9E1] text-[#58695B] transition hover:border-[#1E6B38] hover:text-[#1E6B38]"
                aria-label="Telegram"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3E9E1] text-[#58695B] transition hover:border-[#1E6B38] hover:text-[#1E6B38]"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E3E9E1] text-[#58695B] transition hover:border-[#1E6B38] hover:text-[#1E6B38]"
                aria-label="Open Web"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C241D]">
              {lang === "en" ? "Platform" : "វេទិកា"}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#58695B]">
              <li>
                <a href="#how-it-works" className="transition hover:text-[#1E6B38]">
                  {lang === "en" ? "How It Works" : "របៀបដំណើរការ"}
                </a>
              </li>
              <li>
                <a href="#live-signals" className="transition hover:text-[#1E6B38]">
                  {lang === "en" ? "Live Market Pulse" : "សញ្ញាទីផ្សារផ្ទាល់"}
                </a>
              </li>
              <li>
                <a href="#proxy-model" className="transition hover:text-[#1E6B38]">
                  {lang === "en" ? "Proxy-Agent Network" : "បណ្តាញតំណាងសហគមន៍"}
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#1E6B38]">
                  {lang === "en" ? "Open API & Scrapers" : "Open API & Scrapers"}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C241D]">
              {lang === "en" ? "Transparency & Trust" : "តម្លាភាព និងទំនុកចិត្ត"}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#58695B]">
              <li>
                <a href="#" className="transition hover:text-[#1E6B38]">
                  {lang === "en" ? "Data Privacy Policy" : "គោលការណ៍ឯកជនភាពទិន្នន័យ"}
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#1E6B38]">
                  {lang === "en" ? "Terms of Service" : "លក្ខខណ្ឌប្រើប្រាស់"}
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#1E6B38]">
                  {lang === "en" ? "Cooperative Data Charter" : "ធម្មនុញ្ញទិន្នន័យកសិកម្ម"}
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-[#1E6B38]">
                  {lang === "en" ? "Farmer Feedback Portal" : "មតិស្ថាបនារបស់កសិករ"}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C241D]">
              {lang === "en" ? "Support Hotline" : "ទំនាក់ទំនងជំនួយ"}
            </h4>
            <div className="mt-4 space-y-3 text-xs text-[#58695B]">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#1E6B38]" />
                <span className="font-semibold text-[#1C241D]">+855 (0) 23 888 221</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#1E6B38]" />
                <span>support@cropwise.org</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#1E6B38] shrink-0 mt-0.5" />
                <span>Phnom Penh & Battambang Field Office, Cambodia</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E3E9E1] pt-8 sm:flex-row text-xs text-[#58695B]">
          <div>
            © 2026 CropWise Cambodia. All rights reserved. Plant with Information, Not Assumptions.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#1E6B38] font-semibold">
              <ShieldCheck className="h-4 w-4" /> Secure Agri-Data Node
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
