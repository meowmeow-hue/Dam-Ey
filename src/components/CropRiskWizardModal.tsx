"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Users,
  Sprout,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Printer,
  Share2,
  TrendingDown,
  TrendingUp,
  Droplets,
  RotateCcw,
} from "lucide-react";

interface CropRiskWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "farmer" | "proxy";
  initialData?: { province?: string; crop?: string };
  lang: "en" | "km";
}

export const CropRiskWizardModal: React.FC<CropRiskWizardModalProps> = ({
  isOpen,
  onClose,
  initialMode = "farmer",
  initialData,
  lang,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [mode, setMode] = useState<"farmer" | "proxy">(initialMode);
  const [province, setProvince] = useState<string>(initialData?.province || "Battambang");
  const [crop, setCrop] = useState<string>(initialData?.crop || "Cassava");
  const [landSize, setLandSize] = useState<number>(2.5);
  const [farmerName, setFarmerName] = useState<string>("");
  const [proxyName, setProxyName] = useState<string>("");
  const [plantingMonth, setPlantingMonth] = useState<string>("October 2026");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [printedSlipView, setPrintedSlipView] = useState<boolean>(false);

  // Sync initial props if changed
  useEffect(() => {
    if (initialMode) setMode(initialMode);
    if (initialData?.province) setProvince(initialData.province);
    if (initialData?.crop) setCrop(initialData.crop);
    if (isOpen) {
      setCurrentStep(1);
      setPrintedSlipView(false);
    }
  }, [isOpen, initialMode, initialData]);

  if (!isOpen) return null;

  // Determine dynamic risk result based on province + crop
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
            ? "Feedmill demand is stable, but high fertilizer costs narrow profitability. We advise securing an advance off-take agreement with local co-ops."
            : "តម្រូវការរោងចក្រចំណីសត្វមានស្ថិរភាព ប៉ុន្តែតម្លៃជីខ្ពស់ធ្វើឱ្យប្រាក់ចំណេញរួមតូច។ គួរមានកិច្ចសន្យាទិញជាមុនជាមួយសហគមន៍។",
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

  const handleNextToStep2 = () => {
    setIsSimulating(true);
    setCurrentStep(2);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all overflow-y-auto">
      <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-3xl border border-[#E3E9E1] bg-white shadow-2xl">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-[#E3E9E1] bg-[#F7F9F6] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E6B38] text-white">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#1C241D]">
                {lang === "en" ? "CropWise 3-Step Risk Wizard" : "CropWise ការវាយតម្លៃហានិភ័យ ៣ ជំហាន"}
              </span>
              <span className="ml-2 rounded-full bg-[#E8F7EC] px-2 py-0.5 text-[10px] font-bold text-[#1E6B38]">
                {mode === "proxy" ? "Proxy Mode (ជំនួយតំណាង)" : "Direct Farmer (កសិករផ្ទាល់)"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#58695B] hover:bg-[#E3E9E1] hover:text-[#1C241D]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wizard Step Progress Tracker */}
        <div className="border-b border-[#E3E9E1] bg-white px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  currentStep >= 1 ? "bg-[#1E6B38] text-white" : "bg-[#E3E9E1] text-[#58695B]"
                }`}
              >
                1
              </span>
              <span className={`text-xs font-bold ${currentStep >= 1 ? "text-[#1C241D]" : "text-[#58695B]"}`}>
                {lang === "en" ? "Farm Details" : "ព័ត៌មានកសិដ្ឋាន"}
              </span>
            </div>
            <div className="h-0.5 w-12 bg-[#E3E9E1]">
              <div
                className="h-full bg-[#1E6B38] transition-all duration-300"
                style={{ width: currentStep >= 2 ? "100%" : "0%" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  currentStep >= 2 ? "bg-[#1E6B38] text-white" : "bg-[#E3E9E1] text-[#58695B]"
                }`}
              >
                2
              </span>
              <span className={`text-xs font-bold ${currentStep >= 2 ? "text-[#1C241D]" : "text-[#58695B]"}`}>
                {lang === "en" ? "Live Cross-Check" : "ផ្ទៀងផ្ទាត់ទិន្នន័យ"}
              </span>
            </div>
            <div className="h-0.5 w-12 bg-[#E3E9E1]">
              <div
                className="h-full bg-[#1E6B38] transition-all duration-300"
                style={{ width: currentStep >= 3 ? "100%" : "0%" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  currentStep === 3 ? "bg-[#1E6B38] text-white" : "bg-[#E3E9E1] text-[#58695B]"
                }`}
              >
                3
              </span>
              <span className={`text-xs font-bold ${currentStep === 3 ? "text-[#1C241D]" : "text-[#58695B]"}`}>
                {lang === "en" ? "Traffic Signal" : "សញ្ញាភ្លើងណែនាំ"}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          
          {/* STEP 1: FARM INPUTS & PROXY CONFIG */}
          {currentStep === 1 && (
            <div className="space-y-5">
              {/* Mode Switcher Banner */}
              <div className="flex items-center justify-between rounded-2xl border border-[#E3E9E1] bg-[#F7F9F6] p-3.5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#EAF4EE] p-2 text-[#1E6B38]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C241D]">
                      {lang === "en" ? "Assessment Mode" : "ទម្រង់វាយតម្លៃ"}
                    </div>
                    <div className="text-[11px] text-[#58695B]">
                      {mode === "proxy"
                        ? lang === "en"
                          ? "Entering on behalf of a parent, relative, or co-op member"
                          : "បញ្ចូលជំនួសឪពុកម្តាយ សាច់ញាតិ ឬសមាជិកសហគមន៍"
                        : lang === "en"
                        ? "Entering for my own farm"
                        : "បញ្ចូលសម្រាប់ដីស្រែចម្ការផ្ទាល់ខ្លួន"}
                    </div>
                  </div>
                </div>
                <div className="flex rounded-xl bg-white p-1 border border-[#E3E9E1]">
                  <button
                    type="button"
                    onClick={() => setMode("farmer")}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                      mode === "farmer" ? "bg-[#1E6B38] text-white" : "text-[#58695B]"
                    }`}
                  >
                    Farmer
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("proxy")}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                      mode === "proxy" ? "bg-[#2D924F] text-white" : "text-[#58695B]"
                    }`}
                  >
                    Proxy
                  </button>
                </div>
              </div>

              {/* Proxy Agent details if mode === proxy */}
              {mode === "proxy" && (
                <div className="grid grid-cols-2 gap-3 rounded-2xl bg-[#E8F7EC]/60 border border-[#2D924F]/30 p-3.5">
                  <div>
                    <label className="text-[11px] font-bold text-[#1E6B38]">
                      {lang === "en" ? "Farmer / Relative Name" : "ឈ្មោះកសិករ / ម្ចាស់ដី"}
                    </label>
                    <input
                      type="text"
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      placeholder="e.g. Lok Ta Seng"
                      className="mt-1 w-full rounded-xl border border-[#C4D4C7] bg-white px-3 py-1.5 text-xs text-[#1C241D] focus:border-[#1E6B38] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#1E6B38]">
                      {lang === "en" ? "Proxy / Agent Name" : "ឈ្មោះអ្នកជួយវាយតម្លៃ"}
                    </label>
                    <input
                      type="text"
                      value={proxyName}
                      onChange={(e) => setProxyName(e.target.value)}
                      placeholder="e.g. Sopheak (Daughter)"
                      className="mt-1 w-full rounded-xl border border-[#C4D4C7] bg-white px-3 py-1.5 text-xs text-[#1C241D] focus:border-[#1E6B38] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Province Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#1C241D]">
                    {lang === "en" ? "Province / Location" : "ខេត្ត / ទីតាំង"}
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#E3E9E1] bg-white p-2.5 text-sm font-medium text-[#1C241D] focus:border-[#1E6B38] focus:ring-1 focus:ring-[#1E6B38] focus:outline-none"
                  >
                    <option value="Battambang">Battambang (បាត់ដំបង)</option>
                    <option value="Takeo">Takeo (តាកែវ)</option>
                    <option value="Kampong Cham">Kampong Cham (កំពង់ចាម)</option>
                    <option value="Kampong Thom">Kampong Thom (កំពង់ធំ)</option>
                    <option value="Banteay Meanchey">Banteay Meanchey (បន្ទាយមានជ័យ)</option>
                    <option value="Siem Reap">Siem Reap (សៀមរាប)</option>
                    <option value="Prey Veng">Prey Veng (ព្រៃវែង)</option>
                    <option value="Pursat">Pursat (ពោធិ៍សាត់)</option>
                  </select>
                </div>

                {/* Crop Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#1C241D]">
                    {lang === "en" ? "Prospective Crop Choice" : "ប្រភេទដំណាំគ្រោងដាំ"}
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#E3E9E1] bg-white p-2.5 text-sm font-medium text-[#1C241D] focus:border-[#1E6B38] focus:ring-1 focus:ring-[#1E6B38] focus:outline-none"
                  >
                    <option value="Cassava">Cassava (ដំឡូងមី)</option>
                    <option value="Mung Beans">Mung Beans (សណ្ដែកបាយ)</option>
                    <option value="Corn">Corn / Red Maize (ពោតក្រហម)</option>
                    <option value="Cashew Nuts">Cashew Nuts (គ្រាប់ស្វាយចន្ទី)</option>
                    <option value="Soybeans">Soybeans (សណ្ដែកសៀង)</option>
                    <option value="Wet Season Rice">Wet Season Rice (ស្រូវវស្សា)</option>
                  </select>
                </div>

                {/* Land Size */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#1C241D]">
                    <span>{lang === "en" ? "Planned Land Area" : "ទំហំដីដាំដុះ"}</span>
                    <span className="text-[#1E6B38]">{landSize} Hectares (ហិកតា)</span>
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
                  <div className="flex justify-between text-[10px] text-[#58695B]">
                    <span>0.5 ha</span>
                    <span>10 ha</span>
                    <span>20 ha</span>
                  </div>
                </div>

                {/* Planting Month */}
                <div>
                  <label className="block text-xs font-bold text-[#1C241D]">
                    {lang === "en" ? "Target Planting Window" : "រដូវកាលគ្រោងដាំ"}
                  </label>
                  <select
                    value={plantingMonth}
                    onChange={(e) => setPlantingMonth(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#E3E9E1] bg-white p-2.5 text-sm font-medium text-[#1C241D] focus:border-[#1E6B38] focus:ring-1 focus:ring-[#1E6B38] focus:outline-none"
                  >
                    <option value="October 2026">October 2026 (Mid-Monsoon)</option>
                    <option value="November 2026">November 2026 (Post-Monsoon)</option>
                    <option value="December 2026">December 2026 (Dry Season)</option>
                  </select>
                </div>
              </div>

              {/* Step 1 Action Button */}
              <div className="pt-4 border-t border-[#E3E9E1]">
                <button
                  type="button"
                  onClick={handleNextToStep2}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1E6B38] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#17532B]"
                >
                  <span>{lang === "en" ? "Proceed to Real-Time Market Check" : "បន្តទៅការផ្ទៀងផ្ទាត់ទីផ្សារផ្ទាល់"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: REAL-TIME MARKET AGGREGATION SIMULATION */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {isSimulating ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1E6B38] opacity-30"></span>
                    <div className="h-12 w-12 rounded-full border-4 border-[#1E6B38] border-t-transparent animate-spin"></div>
                  </div>
                  <h4 className="mt-4 text-base font-bold text-[#1C241D]">
                    {lang === "en" ? "Cross-referencing National Data..." : "កំពុងផ្ទៀងផ្ទាត់ទិន្នន័យទូទាំងប្រទេស..."}
                  </h4>
                  <p className="mt-1 text-xs text-[#58695B]">
                    Aggregating planting intentions in {province} & satellite rainfall index.
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-2xl border border-[#E3E9E1] bg-[#F7F9F6] p-4">
                    <div className="flex items-center justify-between text-xs font-bold text-[#58695B] pb-2 border-b border-[#E3E9E1]">
                      <span>{province} Regional Aggregation Matrix</span>
                      <span className="text-[#1E6B38] font-bold">Synchronized</span>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-xl bg-white p-3 border border-[#E3E9E1]">
                        <div className="text-[11px] text-[#58695B]">Registered Land</div>
                        <div className="mt-1 text-lg font-black text-[#1C241D]">
                          {crop === "Cassava" ? "12,400 ha" : "3,200 ha"}
                        </div>
                      </div>
                      <div className="rounded-xl bg-white p-3 border border-[#E3E9E1]">
                        <div className="text-[11px] text-[#58695B]">Local Depots</div>
                        <div className="mt-1 text-lg font-black text-[#1E6B38]">14 Active</div>
                      </div>
                      <div className="rounded-xl bg-white p-3 border border-[#E3E9E1]">
                        <div className="text-[11px] text-[#58695B]">Mekong Rainfall</div>
                        <div className="mt-1 text-lg font-black text-[#2D924F]">Normal Index</div>
                      </div>
                    </div>

                    {/* Capacity Meter */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-semibold text-[#1C241D]">
                        <span>Market Saturation for {crop} in {province}:</span>
                        <span className={evaluation.signal === "red" ? "text-[#D55E00]" : "text-[#2D924F]"}>
                          {evaluation.capacityText}
                        </span>
                      </div>
                      <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-[#E3E9E1]">
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

                  {/* Summary preview */}
                  <div className="rounded-2xl border border-dashed border-[#C4D4C7] bg-[#EAF4EE] p-4 text-xs text-[#1E6B38]">
                    <div className="font-bold flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-[#2D924F]" />
                      AI Prediction Model Result Ready
                    </div>
                    <div className="mt-1 text-[#58695B]">
                      {lang === "en"
                        ? "Calculated risk score based on planned planting month and regional processing factory caps."
                        : "គណនាពិន្ទុហានិភ័យរួចរាល់ ផ្អែកលើរដូវកាល និងកូតាស្រូបយករបស់រោងចក្រក្នុងតំបន់។"}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-1.5 rounded-2xl border border-[#E3E9E1] px-4 py-3 text-xs font-bold text-[#58695B] hover:bg-[#F0F4EF]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#1E6B38] py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#17532B]"
                    >
                      <span>{lang === "en" ? "View Traffic Light Signal & Advice" : "មើលសញ្ញាភ្លើង និងអនុសាសន៍"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 3: TRAFFIC LIGHT SIGNAL RESULT */}
          {currentStep === 3 && (
            <div className="space-y-5">
              {!printedSlipView ? (
                <>
                  {/* Signal Card Banner */}
                  <div
                    className={`rounded-3xl border p-5 text-center ${
                      evaluation.signal === "red"
                        ? "border-[#D55E00]/30 bg-[#FDEFE6]"
                        : evaluation.signal === "yellow"
                        ? "border-[#E69F00]/30 bg-[#FEF7E6]"
                        : "border-[#2D924F]/30 bg-[#E8F7EC]"
                    }`}
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
                      {evaluation.signal === "red" && <ShieldAlert className="h-8 w-8 text-[#D55E00]" />}
                      {evaluation.signal === "yellow" && <AlertTriangle className="h-8 w-8 text-[#E69F00]" />}
                      {evaluation.signal === "green" && <ShieldCheck className="h-8 w-8 text-[#2D924F]" />}
                    </div>

                    <h3 className="mt-3 text-xl font-black text-[#1C241D]">
                      {evaluation.statusTitle}
                    </h3>

                    <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-[#58695B]">
                      {evaluation.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
                      <div className="rounded-xl bg-white px-3 py-1.5 shadow-2xs font-bold text-[#1C241D]">
                        Est. Price: {evaluation.projectedPrice}
                      </div>
                      <div
                        className={`rounded-xl bg-white px-3 py-1.5 shadow-2xs font-bold ${
                          evaluation.signal === "red" ? "text-[#D55E00]" : "text-[#2D924F]"
                        }`}
                      >
                        {evaluation.priceChange}
                      </div>
                    </div>
                  </div>

                  {/* Alternative Crop Recommendation if Red or Yellow */}
                  {evaluation.alternativeCrop && (
                    <div className="rounded-2xl border border-[#2D924F]/30 bg-[#E8F7EC] p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#1E6B38]">
                            {lang === "en" ? "Smart Pivot Recommendation" : "ដំណាំជម្រើសឆ្លាតវៃ"}
                          </div>
                          <div className="mt-1 text-base font-bold text-[#1C241D]">
                            Switch to {evaluation.alternativeCrop} ({lang === "en" ? "Low Risk" : "ហានិភ័យទាប"})
                          </div>
                          <div className="text-xs text-[#58695B]">
                            {lang === "en"
                              ? "High export market buffer with local buyers in your province."
                              : "ទីផ្សារនាំចេញទូលាយ និងមានឈ្មួញកណ្តាលចុះទិញដល់ចម្ការ។"}
                          </div>
                        </div>
                        <span className="rounded-xl bg-[#2D924F] px-2.5 py-1 text-xs font-bold text-white">
                          {evaluation.alternativeGain}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action buttons: Print slip & Reset */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setPrintedSlipView(true)}
                      className="flex w-full sm:flex-1 items-center justify-center gap-2 rounded-2xl bg-[#1E6B38] py-3 text-sm font-bold text-white shadow-md hover:bg-[#17532B]"
                    >
                      <Printer className="h-4 w-4" />
                      <span>{lang === "en" ? "Generate Printable Offline Slip" : "បោះពុម្ពប័ណ្ណក្រដាសក្រៅបណ្តាញ"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center justify-center gap-1.5 rounded-2xl border border-[#E3E9E1] px-4 py-3 text-xs font-bold text-[#58695B] hover:bg-[#F0F4EF] w-full sm:w-auto"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>{lang === "en" ? "Test Another Crop" : "សាកល្បងដំណាំផ្សេង"}</span>
                    </button>
                  </div>
                </>
              ) : (
                /* PRINTED SLIP RECEIPT VIEW */
                <div className="space-y-4">
                  <div className="rounded-2xl border-2 border-dashed border-[#C4D4C7] bg-[#F7F9F6] p-5 font-mono text-xs text-[#1C241D]">
                    <div className="border-b border-dashed border-[#C4D4C7] pb-3 text-center">
                      <div className="font-black text-[#1E6B38] text-sm">CROPWISE CAMBODIA</div>
                      <div className="text-[11px] text-[#58695B]">OFFLINE RISK RECEIPT • វិញ្ញាបនបត្រវាយតម្លៃ</div>
                      <div className="text-[10px] text-zinc-400">ID: CW-{Date.now().toString().slice(-6)}</div>
                    </div>

                    <div className="py-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#58695B]">Province:</span>
                        <span className="font-bold">{province}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#58695B]">Crop Assessed:</span>
                        <span className="font-bold">{crop}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#58695B]">Land Area:</span>
                        <span className="font-bold">{landSize} Hectares</span>
                      </div>
                      {mode === "proxy" && (
                        <div className="flex justify-between text-[#1E6B38]">
                          <span>Proxy Agent:</span>
                          <span className="font-bold">{proxyName || "Community Member"}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-dashed border-[#C4D4C7] pt-2">
                        <span className="text-[#58695B]">Signal Result:</span>
                        <span
                          className={`font-black ${
                            evaluation.signal === "red"
                              ? "text-[#D55E00]"
                              : evaluation.signal === "yellow"
                              ? "text-[#E69F00]"
                              : "text-[#2D924F]"
                          }`}
                        >
                          {evaluation.signal.toUpperCase()} • {evaluation.capacityText}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white p-2.5 text-center text-[11px] border border-[#E3E9E1]">
                      {evaluation.summary}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#1E6B38] py-3 text-sm font-bold text-white hover:bg-[#17532B]"
                    >
                      <Printer className="h-4 w-4" />
                      <span>{lang === "en" ? "Print Now" : "បោះពុម្ពភ្លាម"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrintedSlipView(false)}
                      className="rounded-2xl border border-[#E3E9E1] px-4 py-3 text-xs font-bold text-[#58695B] hover:bg-[#F0F4EF]"
                    >
                      Back to Signal
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
