"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, UserRole } from "@/context/AuthContext";
import {
  Sprout,
  Users,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Printer,
  FileCheck,
  Plus,
  Radio,
  MapPin,
  TrendingDown,
  TrendingUp,
  RotateCcw,
  Sparkles,
  LogOut,
  Globe,
  Bell,
  CheckCircle2,
  Calendar,
  Layers,
  Phone,
} from "lucide-react";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout } = useAuth();

  // Role can come from auth context or query param
  const initialRole = (searchParams.get("role") as UserRole) || user?.role || "farmer";
  const initialProvince = searchParams.get("province") || user?.province || "Battambang";
  const initialCrop = searchParams.get("crop") || "Cassava";

  const [role, setRole] = useState<UserRole>(initialRole);
  const [lang, setLang] = useState<"en" | "km">("en");
  const [activeTab, setActiveTab] = useState<"wizard" | "plots" | "quotas" | "proxy">("wizard");

  // Wizard state in dashboard
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [province, setProvince] = useState<string>(initialProvince);
  const [crop, setCrop] = useState<string>(initialCrop);
  const [landSize, setLandSize] = useState<number>(3.0);
  const [plantingMonth, setPlantingMonth] = useState<string>("October 2026");
  const [farmerName, setFarmerName] = useState<string>(
    role === "proxy" ? "Lok Ta Seng (Father)" : user?.name || "Sokha Chan"
  );
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [showPrintReceipt, setShowPrintReceipt] = useState<boolean>(false);

  // Sync if query param changed
  useEffect(() => {
    if (searchParams.get("province")) setProvince(searchParams.get("province")!);
    if (searchParams.get("crop")) setCrop(searchParams.get("crop")!);
    if (searchParams.get("role")) setRole(searchParams.get("role") as UserRole);
  }, [searchParams]);

  // Compute evaluation
  const getRiskEvaluation = () => {
    if (crop === "Cassava" && (province === "Battambang" || province === "Banteay Meanchey" || province === "Pailin")) {
      return {
        signal: "red" as const,
        statusTitle: lang === "en" ? "🔴 High Risk of Oversupply Glut" : "🔴 ហានិភ័យខ្ពស់នៃការលើសចំណុះ",
        capacity: 92,
        capacityText: lang === "en" ? "92% Quota Saturated" : "៩២% នៃកូតាត្រូវបានបំពេញ",
        projectedPrice: "280 - 320 KHR/kg",
        priceChange: "-38% Below Cost of Production",
        summary:
          lang === "en"
            ? "Critical alert: 12,400 hectares of cassava have already been registered in your district. Starch processors have capped forward purchasing."
            : "ការប្រកាសអាសន្ន: ដី ១២,៤០០ ហិកតា ត្រូវបានចុះបញ្ជីដាំដំឡូងមីក្នុងស្រុករបស់អ្នក។ រោងចក្រម្សៅបានកាត់បន្ថយការទិញជាមុន។",
        alternativeCrop: "Mung Beans",
        alternativeCropKm: "សណ្ដែកបាយ",
        alternativeGain: "+42% Higher Profit Margin",
      };
    } else if (crop === "Corn" || crop === "Rubber") {
      return {
        signal: "yellow" as const,
        statusTitle: lang === "en" ? "🟡 Moderate Risk (Proceed With Caution)" : "🟡 ហានិភ័យមធ្យម (គួរប្រុងប្រយ័ត្ន)",
        capacity: 68,
        capacityText: lang === "en" ? "68% Quota Committed" : "៦៨% នៃកូតាត្រូវបានកក់",
        projectedPrice: "1,150 KHR/kg",
        priceChange: "Neutral Margin / Thin Profit Buffer",
        summary:
          lang === "en"
            ? "Feedmill demand is stable, but high fertilizer costs narrow profitability. Secure an off-take agreement with local co-ops before planting."
            : "តម្រូវការរោងចក្រចំណីសត្វមានស្ថិរភាព ប៉ុន្តែតម្លៃជីខ្ពស់ធ្វើឱ្យប្រាក់ចំណេញរួមតូច។ គួរមានកិច្ចសន្យាទិញជាមុន។",
        alternativeCrop: "Soybeans",
        alternativeCropKm: "សណ្ដែកសៀង",
        alternativeGain: "+25% Lower Fertilizer Requirement",
      };
    } else {
      return {
        signal: "green" as const,
        statusTitle: lang === "en" ? "🟢 Ideal to Plant (High Demand)" : "🟢 ល្អបំផុតក្នុងការដាំ (តម្រូវការទីផ្សារខ្ពស់)",
        capacity: 34,
        capacityText: lang === "en" ? "34% Quota Reached (Under-Supplied)" : "៣៤% នៃកូតា (ទីផ្សារនៅខ្វះទំនិញ)",
        projectedPrice: "2,700 - 3,100 KHR/kg",
        priceChange: "+24% Price Premium Expected",
        summary:
          lang === "en"
            ? "Outstanding market appetite! Export aggregators in Takeo and Vietnam borders are actively reserving volume. Climate radar predicts ideal rainfall."
            : "ទីផ្សារមានតម្រូវការខ្ពស់ណាស់! អ្នកប្រមូលទិញនាំចេញនៅតាកែវ និងព្រំដែនកំពុងកក់ទំនិញ។ អាកាសធាតុអំណោយផលល្អ។",
        alternativeCrop: null,
        alternativeCropKm: null,
        alternativeGain: null,
      };
    }
  };

  const evaluation = getRiskEvaluation();

  const handleNextStep = () => {
    setIsSimulating(true);
    setWizardStep(2);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1000);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#F7F9F6] text-[#1C241D] flex flex-col font-sans">
      
      {/* Top Navigation Bar for Dashboard */}
      <header className="sticky top-0 z-30 border-b border-[#E3E9E1] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* Logo & Portal Mode */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E6B38] text-white shadow-xs">
                <Sprout className="h-5 w-5 text-[#E8F7EC]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1C241D]">
                CropWise<span className="text-[#2D924F]">.org</span>
              </span>
            </Link>

            <span className="hidden sm:inline text-zinc-300">|</span>

            {/* Role Switcher Pill */}
            <div className="hidden sm:flex items-center rounded-xl bg-[#F7F9F6] p-1 border border-[#E3E9E1]">
              <button
                onClick={() => setRole("farmer")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                  role === "farmer"
                    ? "bg-[#1E6B38] text-white shadow-xs"
                    : "text-[#58695B] hover:text-[#1C241D]"
                }`}
              >
                🌾 {lang === "en" ? "Farmer Portal" : "កសិករផ្ទាល់"}
              </button>
              <button
                onClick={() => setRole("proxy")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                  role === "proxy"
                    ? "bg-[#2D924F] text-white shadow-xs"
                    : "text-[#58695B] hover:text-[#1C241D]"
                }`}
              >
                🤝 {lang === "en" ? "Proxy / Co-op Agent" : "ភ្នាក់ងារតំណាង"}
              </button>
            </div>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-3">
            {/* Language switch */}
            <button
              onClick={() => setLang(lang === "en" ? "km" : "en")}
              className="flex items-center gap-1.5 rounded-lg border border-[#E3E9E1] bg-[#F7F9F6] px-2.5 py-1.5 text-xs font-bold text-[#1C241D] hover:bg-[#EAF4EE]"
            >
              <Globe className="h-3.5 w-3.5 text-[#1E6B38]" />
              <span>{lang === "en" ? "🇰🇭 KH" : "🇬🇧 EN"}</span>
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2.5 rounded-xl border border-[#E3E9E1] bg-[#F7F9F6] py-1 px-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1E6B38] text-xs font-bold text-white">
                {role === "proxy" ? "SP" : "SK"}
              </div>
              <div className="hidden text-left md:block">
                <div className="text-xs font-bold text-[#1C241D]">
                  {role === "proxy" ? "Seng Sopheak (Agent)" : "Sokha Chan (Farmer)"}
                </div>
                <div className="text-[10px] text-[#58695B]">
                  {province} Province
                </div>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="rounded-xl border border-[#E3E9E1] p-2 text-[#58695B] hover:bg-[#FDEFE6] hover:text-[#D55E00] transition"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        
        {/* Welcome Banner & Quick Overview */}
        <div className="rounded-3xl border border-[#E3E9E1] bg-gradient-to-r from-white via-[#F7F9F6] to-[#EAF4EE] p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#E8F7EC] px-2.5 py-0.5 text-xs font-bold text-[#1E6B38]">
                  {role === "proxy" ? "Co-op Agent Network • Takeo Hub" : "Active Farm Account • Verified"}
                </span>
                <span className="text-xs text-[#58695B]">Season: 2026 Monsoon-Dry Transition</span>
              </div>
              <h1 className="mt-1.5 text-2xl sm:text-3xl font-black text-[#1C241D]">
                {role === "proxy"
                  ? lang === "en"
                    ? "Cooperative Agent & Proxy Portal"
                    : "ផ្ទាំងគ្រប់គ្រងភ្នាក់ងារសហគមន៍កសិកម្ម"
                  : lang === "en"
                  ? `Welcome, ${user?.name || "Sokha Chan"}`
                  : `សូមស្វាគមន៍, ${user?.name || "សុខា ចាន់"}`}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-[#58695B]">
                {role === "proxy"
                  ? lang === "en"
                    ? "Manage family plots, evaluate prospective plantings, and print thermal slips for local farmers."
                    : "គ្រប់គ្រងដីកសិករក្នុងគ្រួសារ វាយតម្លៃដំណាំ និងបោះពុម្ពប័ណ្ណក្រដាសជូនពួកគាត់។"
                  : lang === "en"
                  ? "Test your planned crops against national market capacity before spending money on seeds and fertilizers."
                  : "ផ្ទៀងផ្ទាត់ដំណាំគ្រោងដាំ ធៀបនឹងសមត្ថភាពទីផ្សារជាតិ មុននឹងចំណាយទិញពូជ និងជី។"}
              </p>
            </div>

            {/* Quick action button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab("wizard");
                  setWizardStep(1);
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#1E6B38] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#17532B] transition active:scale-98"
              >
                <Plus className="h-4 w-4" />
                <span>{lang === "en" ? "Run New Risk Assessment" : "វាយតម្លៃដំណាំថ្មី"}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 pt-6 border-t border-[#E3E9E1]">
            <div className="rounded-2xl bg-white p-3.5 border border-[#E3E9E1] shadow-2xs">
              <div className="text-[11px] font-semibold text-[#58695B]">
                {lang === "en" ? "Monitored Land" : "ដីស្ថិតក្រោមការតាមដាន"}
              </div>
              <div className="mt-1 text-xl font-black text-[#1C241D]">5.5 Hectares</div>
              <div className="mt-0.5 text-[10px] text-[#1E6B38]">2 Registered Plots</div>
            </div>

            <div className="rounded-2xl bg-white p-3.5 border border-[#E3E9E1] shadow-2xs">
              <div className="text-[11px] font-semibold text-[#58695B]">
                {lang === "en" ? "Regional Market Status" : "ស្ថានភាពទីផ្សារតំបន់"}
              </div>
              <div className="mt-1 text-xl font-black text-[#D55E00]">🔴 92% Quota</div>
              <div className="mt-0.5 text-[10px] text-[#D55E00]">Cassava Glut Warning</div>
            </div>

            <div className="rounded-2xl bg-white p-3.5 border border-[#E3E9E1] shadow-2xs">
              <div className="text-[11px] font-semibold text-[#58695B]">
                {lang === "en" ? "Protected Revenue Buffer" : "ការការពារប្រាក់ចំណូល"}
              </div>
              <div className="mt-1 text-xl font-black text-[#2D924F]">+24% Margin</div>
              <div className="mt-0.5 text-[10px] text-[#2D924F]">Mung Bean Recommended</div>
            </div>

            <div className="rounded-2xl bg-white p-3.5 border border-[#E3E9E1] shadow-2xs">
              <div className="text-[11px] font-semibold text-[#58695B]">
                {lang === "en" ? "Agricultural Cooperative" : "សហគមន៍កសិកម្ម"}
              </div>
              <div className="mt-1 text-xl font-black text-[#1C241D]">Battambang Co-op</div>
              <div className="mt-0.5 text-[10px] text-[#58695B]">14 Depots Syncing</div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E3E9E1] pb-1">
          <button
            onClick={() => setActiveTab("wizard")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              activeTab === "wizard"
                ? "bg-[#1E6B38] text-white shadow-xs"
                : "text-[#58695B] hover:bg-white hover:text-[#1C241D]"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>{lang === "en" ? "3-Step Risk Wizard" : "ការវាយតម្លៃ ៣ ជំហាន"}</span>
          </button>

          <button
            onClick={() => setActiveTab("plots")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              activeTab === "plots"
                ? "bg-[#1E6B38] text-white shadow-xs"
                : "text-[#58695B] hover:bg-white hover:text-[#1C241D]"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>{lang === "en" ? "Registered Farm Plots" : "ដីកសិដ្ឋានរបស់ខ្ញុំ"}</span>
          </button>

          <button
            onClick={() => setActiveTab("quotas")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              activeTab === "quotas"
                ? "bg-[#1E6B38] text-white shadow-xs"
                : "text-[#58695B] hover:bg-white hover:text-[#1C241D]"
            }`}
          >
            <Radio className="h-4 w-4" />
            <span>{lang === "en" ? "Provincial Quotas" : "កូតាទីផ្សារតាមខេត្ត"}</span>
          </button>

          {role === "proxy" && (
            <button
              onClick={() => setActiveTab("proxy")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === "proxy"
                  ? "bg-[#2D924F] text-white shadow-xs"
                  : "text-[#58695B] hover:bg-white hover:text-[#1C241D]"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>{lang === "en" ? "Proxy Print Station" : "ស្ថានីយបោះពុម្ពប័ណ្ណ"}</span>
            </button>
          )}
        </div>

        {/* TAB 1: EMBEDDED 3-STEP RISK WIZARD */}
        {activeTab === "wizard" && (
          <div className="overflow-hidden rounded-3xl border border-[#E3E9E1] bg-white p-6 sm:p-8 shadow-sm">
            
            {/* Wizard Header Tracker */}
            <div className="mb-6 flex items-center justify-between border-b border-[#E3E9E1] pb-5">
              <div>
                <h2 className="text-xl font-bold text-[#1C241D]">
                  {lang === "en" ? "Run Crop Risk Assessment" : "ដំណើរការវាយតម្លៃហានិភ័យដំណាំ"}
                </h2>
                <p className="text-xs text-[#58695B]">
                  Simulates nationwide land commitments and Mekong climate radar.
                </p>
              </div>

              {/* Steps Progress */}
              <div className="flex items-center gap-2 text-xs font-bold">
                <span
                  className={`rounded-full px-2.5 py-1 ${
                    wizardStep >= 1 ? "bg-[#1E6B38] text-white" : "bg-[#F7F9F6] text-[#58695B]"
                  }`}
                >
                  Step 1: Input
                </span>
                <span>→</span>
                <span
                  className={`rounded-full px-2.5 py-1 ${
                    wizardStep >= 2 ? "bg-[#1E6B38] text-white" : "bg-[#F7F9F6] text-[#58695B]"
                  }`}
                >
                  Step 2: Cross-Check
                </span>
                <span>→</span>
                <span
                  className={`rounded-full px-2.5 py-1 ${
                    wizardStep === 3 ? "bg-[#1E6B38] text-white" : "bg-[#F7F9F6] text-[#58695B]"
                  }`}
                >
                  Step 3: Signal
                </span>
              </div>
            </div>

            {/* Step 1 in Dashboard */}
            {wizardStep === 1 && (
              <div className="space-y-6 max-w-3xl">
                {role === "proxy" && (
                  <div className="rounded-2xl border border-[#2D924F]/30 bg-[#E8F7EC]/60 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1E6B38]">
                      <Users className="h-4 w-4" />
                      <span>{lang === "en" ? "Proxy Assessment Active" : "កំពុងវាយតម្លៃជំនួសកសិករ"}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#58695B]">Farmer Name:</label>
                        <input
                          type="text"
                          value={farmerName}
                          onChange={(e) => setFarmerName(e.target.value)}
                          className="mt-1 w-full rounded-xl border border-[#C4D4C7] bg-white p-2 text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#58695B]">Agent ID:</label>
                        <input
                          type="text"
                          disabled
                          value="CW-AGENT-8849"
                          className="mt-1 w-full rounded-xl border border-[#C4D4C7] bg-[#F7F9F6] p-2 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-[#1C241D]">
                      {lang === "en" ? "Select Province" : "ជ្រើសរើសខេត្ត"}
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#E3E9E1] bg-white p-3 text-sm font-semibold text-[#1C241D] focus:border-[#1E6B38] focus:outline-none"
                    >
                      <option value="Battambang">Battambang (បាត់ដំបង)</option>
                      <option value="Takeo">Takeo (តាកែវ)</option>
                      <option value="Kampong Cham">Kampong Cham (កំពង់ចាម)</option>
                      <option value="Kampong Thom">Kampong Thom (កំពង់ធំ)</option>
                      <option value="Banteay Meanchey">Banteay Meanchey (បន្ទាយមានជ័យ)</option>
                      <option value="Siem Reap">Siem Reap (សៀមរាប)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C241D]">
                      {lang === "en" ? "Prospective Crop Choice" : "ដំណាំគ្រោងដាំ"}
                    </label>
                    <select
                      value={crop}
                      onChange={(e) => setCrop(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#E3E9E1] bg-white p-3 text-sm font-semibold text-[#1C241D] focus:border-[#1E6B38] focus:outline-none"
                    >
                      <option value="Cassava">Cassava (ដំឡូងមី)</option>
                      <option value="Mung Beans">Mung Beans (សណ្ដែកបាយ)</option>
                      <option value="Corn">Corn (ពោតក្រហម)</option>
                      <option value="Cashew Nuts">Cashew Nuts (គ្រាប់ស្វាយចន្ទី)</option>
                      <option value="Soybeans">Soybeans (សណ្ដែកសៀង)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#1C241D]">
                      <span>{lang === "en" ? "Land Size" : "ទំហំដីដាំដុះ"}</span>
                      <span className="text-[#1E6B38] font-bold">{landSize} Hectares</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="20"
                      step="0.5"
                      value={landSize}
                      onChange={(e) => setLandSize(parseFloat(e.target.value))}
                      className="mt-3 w-full accent-[#1E6B38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C241D]">
                      {lang === "en" ? "Target Planting Window" : "រដូវកាលគ្រោងដាំ"}
                    </label>
                    <select
                      value={plantingMonth}
                      onChange={(e) => setPlantingMonth(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#E3E9E1] bg-white p-3 text-sm font-semibold text-[#1C241D] focus:border-[#1E6B38] focus:outline-none"
                    >
                      <option value="October 2026">October 2026 (Mid-Monsoon)</option>
                      <option value="November 2026">November 2026 (Post-Monsoon)</option>
                      <option value="December 2026">December 2026 (Dry Season)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E3E9E1]">
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#1E6B38] px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#17532B] transition"
                  >
                    <span>{lang === "en" ? "Proceed to Market Cross-Check" : "បន្តទៅការផ្ទៀងផ្ទាត់ទិន្នន័យ"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 in Dashboard */}
            {wizardStep === 2 && (
              <div className="space-y-6 max-w-3xl">
                {isSimulating ? (
                  <div className="py-12 text-center">
                    <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
                      <div className="h-10 w-10 rounded-full border-4 border-[#1E6B38] border-t-transparent animate-spin"></div>
                    </div>
                    <div className="mt-4 text-base font-bold text-[#1C241D]">
                      Querying Satellite Feeds & Wholesale Quotas...
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="rounded-2xl border border-[#E3E9E1] bg-[#F7F9F6] p-5">
                      <div className="flex items-center justify-between text-xs font-bold text-[#58695B] pb-2 border-b border-[#E3E9E1]">
                        <span>Regional Cross-Check: {province}</span>
                        <span className="text-[#1E6B38]">Active Connection</span>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                        <div className="rounded-xl bg-white p-3 border border-[#E3E9E1]">
                          <div className="text-[11px] text-[#58695B]">Target Crop</div>
                          <div className="text-base font-black text-[#1C241D]">{crop}</div>
                        </div>
                        <div className="rounded-xl bg-white p-3 border border-[#E3E9E1]">
                          <div className="text-[11px] text-[#58695B]">Planned Area</div>
                          <div className="text-base font-black text-[#1E6B38]">{landSize} ha</div>
                        </div>
                        <div className="rounded-xl bg-white p-3 border border-[#E3E9E1]">
                          <div className="text-[11px] text-[#58695B]">Wholesale Depots</div>
                          <div className="text-base font-black text-[#2D924F]">14 Synced</div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>Regional Market Saturation:</span>
                          <span className={evaluation.signal === "red" ? "text-[#D55E00]" : "text-[#2D924F]"}>
                            {evaluation.capacityText}
                          </span>
                        </div>
                        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[#E3E9E1]">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              evaluation.signal === "red"
                                ? "bg-[#D55E00]"
                                : evaluation.signal === "yellow"
                                ? "bg-[#E69F00]"
                                : "bg-[#2D924F]"
                            }`}
                            style={{ width: `${evaluation.capacity}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setWizardStep(1)}
                        className="rounded-2xl border border-[#E3E9E1] px-5 py-3 text-xs font-bold text-[#58695B] hover:bg-[#F0F4EF]"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setWizardStep(3)}
                        className="flex-1 rounded-2xl bg-[#1E6B38] py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#17532B]"
                      >
                        Generate Traffic Light Signal & Recommendation
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 3 in Dashboard */}
            {wizardStep === 3 && (
              <div className="space-y-6 max-w-3xl">
                {!showPrintReceipt ? (
                  <>
                    <div
                      className={`rounded-3xl border p-6 text-center ${
                        evaluation.signal === "red"
                          ? "border-[#D55E00]/30 bg-[#FDEFE6]"
                          : evaluation.signal === "yellow"
                          ? "border-[#E69F00]/30 bg-[#FEF7E6]"
                          : "border-[#2D924F]/30 bg-[#E8F7EC]"
                      }`}
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                        {evaluation.signal === "red" && <ShieldAlert className="h-8 w-8 text-[#D55E00]" />}
                        {evaluation.signal === "yellow" && <AlertTriangle className="h-8 w-8 text-[#E69F00]" />}
                        {evaluation.signal === "green" && <ShieldCheck className="h-8 w-8 text-[#2D924F]" />}
                      </div>

                      <h3 className="mt-3 text-2xl font-black text-[#1C241D]">
                        {evaluation.statusTitle}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[#58695B]">
                        {evaluation.summary}
                      </p>

                      <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs font-bold">
                        <div className="rounded-xl bg-white px-3 py-1.5 shadow-2xs">
                          Est. Price: {evaluation.projectedPrice}
                        </div>
                        <div
                          className={`rounded-xl bg-white px-3 py-1.5 shadow-2xs ${
                            evaluation.signal === "red" ? "text-[#D55E00]" : "text-[#2D924F]"
                          }`}
                        >
                          {evaluation.priceChange}
                        </div>
                      </div>
                    </div>

                    {evaluation.alternativeCrop && (
                      <div className="rounded-2xl border border-[#2D924F]/30 bg-[#E8F7EC] p-4 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] font-bold text-[#1E6B38] uppercase tracking-wider">
                            Smart Recommendation
                          </div>
                          <div className="text-base font-bold text-[#1C241D]">
                            Pivot to {evaluation.alternativeCrop} ({evaluation.alternativeGain})
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setCrop(evaluation.alternativeCrop!);
                            setWizardStep(1);
                          }}
                          className="rounded-xl bg-[#2D924F] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#1E6B38]"
                        >
                          Adopt Alternative
                        </button>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <button
                        onClick={() => setShowPrintReceipt(true)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#1E6B38] py-3 text-sm font-bold text-white shadow-md hover:bg-[#17532B] w-full"
                      >
                        <Printer className="h-4 w-4" />
                        <span>{lang === "en" ? "Generate Printable Receipt Slip" : "បោះពុម្ពប័ណ្ណសង្ខេប"}</span>
                      </button>
                      <button
                        onClick={() => setWizardStep(1)}
                        className="rounded-2xl border border-[#E3E9E1] px-4 py-3 text-xs font-bold text-[#58695B] hover:bg-[#F0F4EF] w-full sm:w-auto"
                      >
                        Test Another Plot
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-2xl border-2 border-dashed border-[#C4D4C7] bg-[#F7F9F6] p-6 font-mono text-xs text-[#1C241D]">
                      <div className="border-b border-dashed border-[#C4D4C7] pb-3 text-center">
                        <div className="font-black text-[#1E6B38] text-base">CROPWISE CAMBODIA</div>
                        <div className="text-[11px] text-[#58695B]">OFFLINE RISK SLIP • វិញ្ញាបនបត្រវាយតម្លៃ</div>
                        <div className="text-[10px] text-zinc-400">ID: CW-{Date.now().toString().slice(-6)}</div>
                      </div>

                      <div className="py-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Farmer:</span>
                          <span className="font-bold">{farmerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Province:</span>
                          <span className="font-bold">{province}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Crop:</span>
                          <span className="font-bold">{crop}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Area:</span>
                          <span className="font-bold">{landSize} Hectares</span>
                        </div>
                        <div className="flex justify-between border-t border-dashed border-[#C4D4C7] pt-2 font-black">
                          <span>Signal:</span>
                          <span
                            className={
                              evaluation.signal === "red"
                                ? "text-[#D55E00]"
                                : evaluation.signal === "yellow"
                                ? "text-[#E69F00]"
                                : "text-[#2D924F]"
                            }
                          >
                            {evaluation.signal.toUpperCase()} • {evaluation.capacityText}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl bg-white p-3 text-center text-[11px] border border-[#E3E9E1]">
                        {evaluation.summary}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => window.print()}
                        className="flex-1 rounded-2xl bg-[#1E6B38] py-3 text-sm font-bold text-white hover:bg-[#17532B]"
                      >
                        Print Slip (Thermal / Standard)
                      </button>
                      <button
                        onClick={() => setShowPrintReceipt(false)}
                        className="rounded-2xl border border-[#E3E9E1] px-4 py-3 text-xs font-bold text-[#58695B]"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: REGISTERED FARM PLOTS */}
        {activeTab === "plots" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1C241D]">
                {lang === "en" ? "My Registered Farm Plots" : "ដីកសិដ្ឋានបានចុះបញ្ជី"}
              </h3>
              <button
                onClick={() => {
                  setActiveTab("wizard");
                  setWizardStep(1);
                }}
                className="flex items-center gap-1.5 rounded-xl bg-[#1E6B38] px-3.5 py-2 text-xs font-bold text-white shadow-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Plot</span>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Plot 1 */}
              <div className="rounded-2xl border border-[#D55E00]/30 bg-white p-5 shadow-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-md bg-[#FDEFE6] px-2 py-0.5 text-[10px] font-bold text-[#D55E00]">
                      🔴 High Risk Glut Alert
                    </span>
                    <h4 className="mt-2 text-lg font-bold text-[#1C241D]">Battambang North Plot</h4>
                    <div className="text-xs text-[#58695B]">Cassava • 3.0 Hectares</div>
                  </div>
                  <ShieldAlert className="h-6 w-6 text-[#D55E00]" />
                </div>
                <div className="mt-4 pt-3 border-t border-[#E3E9E1] flex justify-between text-xs">
                  <span className="text-[#58695B]">Status: Saturated Market</span>
                  <span className="font-bold text-[#D55E00]">Advised: Switch to Mung Bean</span>
                </div>
              </div>

              {/* Plot 2 */}
              <div className="rounded-2xl border border-[#2D924F]/30 bg-white p-5 shadow-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-md bg-[#E8F7EC] px-2 py-0.5 text-[10px] font-bold text-[#2D924F]">
                      🟢 Low Risk • Protected
                    </span>
                    <h4 className="mt-2 text-lg font-bold text-[#1C241D]">Takeo Bati Plot</h4>
                    <div className="text-xs text-[#58695B]">Mung Beans • 2.5 Hectares</div>
                  </div>
                  <ShieldCheck className="h-6 w-6 text-[#2D924F]" />
                </div>
                <div className="mt-4 pt-3 border-t border-[#E3E9E1] flex justify-between text-xs">
                  <span className="text-[#58695B]">Buyer Matched:</span>
                  <span className="font-bold text-[#2D924F]">Export Contract Available</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROVINCIAL QUOTAS */}
        {activeTab === "quotas" && (
          <div className="rounded-3xl border border-[#E3E9E1] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#1C241D]">
              {lang === "en" ? "Provincial Processing Caps & Quotas" : "កូតាកែច្នៃតាមបណ្តាខេត្ត"}
            </h3>
            <div className="divide-y divide-[#E3E9E1]">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#1C241D]">Battambang — Cassava Starch Hub</div>
                  <div className="text-xs text-[#58695B]">14 processing plants operating near capacity</div>
                </div>
                <span className="rounded-lg bg-[#FDEFE6] px-2.5 py-1 text-xs font-bold text-[#D55E00]">
                  92% Filled (Red Alert)
                </span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#1C241D]">Takeo — Grain & Legume Terminal</div>
                  <div className="text-xs text-[#58695B]">Export pipeline to southern corridors open</div>
                </div>
                <span className="rounded-lg bg-[#E8F7EC] px-2.5 py-1 text-xs font-bold text-[#1E6B38]">
                  34% Filled (Ideal to Plant)
                </span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#1C241D]">Kampong Cham — Feedmill Depot</div>
                  <div className="text-xs text-[#58695B]">Animal feed quota contracted with co-ops</div>
                </div>
                <span className="rounded-lg bg-[#FEF7E6] px-2.5 py-1 text-xs font-bold text-[#E69F00]">
                  68% Filled (Proceed with Caution)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROXY PRINT STATION */}
        {activeTab === "proxy" && role === "proxy" && (
          <div className="rounded-3xl border border-[#E3E9E1] bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1C241D]">
                  {lang === "en" ? "Proxy Agent Print Station" : "ស្ថានីយបោះពុម្ពប័ណ្ណសម្រាប់ភ្នាក់ងារ"}
                </h3>
                <p className="text-xs text-[#58695B]">
                  Issue verification slips for non-smartphone farmers and co-op members.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab("wizard");
                  setWizardStep(1);
                }}
                className="rounded-xl bg-[#2D924F] px-4 py-2 text-xs font-bold text-white shadow-xs"
              >
                + New Farmer Assessment
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E3E9E1] bg-[#F7F9F6] p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#1C241D]">Lok Ta Seng (Family Member)</div>
                  <div className="text-[11px] text-[#58695B]">Bati, Takeo • Mung Beans (2.5 ha)</div>
                  <span className="mt-1 inline-block text-[10px] font-bold text-[#2D924F]">
                    🟢 Green Verified
                  </span>
                </div>
                <button
                  onClick={() => {
                    setFarmerName("Lok Ta Seng");
                    setCrop("Mung Beans");
                    setProvince("Takeo");
                    setActiveTab("wizard");
                    setWizardStep(3);
                    setShowPrintReceipt(true);
                  }}
                  className="rounded-xl border border-[#E3E9E1] bg-white p-2 text-xs font-bold text-[#1E6B38] hover:bg-[#EAF4EE]"
                >
                  <Printer className="h-4 w-4" />
                </button>
              </div>

              <div className="rounded-2xl border border-[#E3E9E1] bg-[#F7F9F6] p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#1C241D]">Om Phalla (Co-op Member)</div>
                  <div className="text-[11px] text-[#58695B]">Sangkhe, Battambang • Cassava (4.0 ha)</div>
                  <span className="mt-1 inline-block text-[10px] font-bold text-[#D55E00]">
                    🔴 Red Glut Advisory
                  </span>
                </div>
                <button
                  onClick={() => {
                    setFarmerName("Om Phalla");
                    setCrop("Cassava");
                    setProvince("Battambang");
                    setActiveTab("wizard");
                    setWizardStep(3);
                    setShowPrintReceipt(true);
                  }}
                  className="rounded-xl border border-[#E3E9E1] bg-white p-2 text-xs font-bold text-[#1E6B38] hover:bg-[#EAF4EE]"
                >
                  <Printer className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading CropWise Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
