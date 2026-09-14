"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";
import {
  X,
  Sprout,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  Lock,
  User,
  CheckCircle2,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
  prefillData?: { province?: string; crop?: string };
  lang: "en" | "km";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = "farmer",
  prefillData,
  lang,
}) => {
  const router = useRouter();
  const { loginWithGoogle, loginWithCredentials } = useAuth();

  const [tab, setTab] = useState<"login" | "register">("register");
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [name, setName] = useState<string>("");
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const navigateToDashboard = (selectedRole: UserRole) => {
    const params = new URLSearchParams();
    params.set("role", selectedRole);
    if (prefillData?.province) params.set("province", prefillData.province);
    if (prefillData?.crop) params.set("crop", prefillData.crop);
    onClose();
    router.push(`/dashboard?${params.toString()}`);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginWithGoogle(role);
      setIsLoading(false);
      navigateToDashboard(role);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginWithCredentials(emailOrPhone || "sokha.chan@cropwise.kh", role, name);
      setIsLoading(false);
      navigateToDashboard(role);
    }, 600);
  };

  const handleQuickDemoLogin = (demoRole: UserRole) => {
    loginWithCredentials(
      demoRole === "proxy" ? "sopheak.agent@cropwise.kh" : "sokha.farmer@cropwise.kh",
      demoRole,
      demoRole === "proxy" ? "Seng Sopheak (Co-op Agent)" : "Lok Ta Seng (Farmer)"
    );
    navigateToDashboard(demoRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all overflow-y-auto">
      <div className="relative my-8 w-full max-w-md overflow-hidden rounded-3xl border border-[#E3E9E1] bg-white shadow-2xl">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#E3E9E1] bg-[#F7F9F6] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1E6B38] text-white">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#1C241D]">CropWise Portal</span>
              <span className="ml-2 rounded-full bg-[#E8F7EC] px-2 py-0.5 text-[10px] font-bold text-[#1E6B38]">
                {role === "proxy" ? "Proxy Access" : "Farmer Portal"}
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

        <div className="p-6">
          {/* Headline */}
          <div className="text-center">
            <h3 className="text-2xl font-black text-[#1C241D]">
              {tab === "register"
                ? lang === "en"
                  ? "Create Your Account"
                  : "បង្កើតគណនីថ្មី"
                : lang === "en"
                ? "Welcome Back"
                : "សូមស្វាគមន៍មកវិញ"}
            </h3>
            <p className="mt-1 text-xs text-[#58695B]">
              {lang === "en"
                ? "Sign in to view real-time market quotas and test crop risk."
                : "ចូលដើម្បីមើលកូតាទីផ្សារផ្ទាល់ និងពិនិត្យហានិភ័យដំណាំ។"}
            </p>
          </div>

          {/* User Role Selection Tabs */}
          <div className="mt-5">
            <label className="block text-xs font-bold text-[#1C241D] mb-1.5">
              {lang === "en" ? "Select Your Role" : "ជ្រើសរើសតួនាទីរបស់អ្នក"}
            </label>
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#F7F9F6] p-1.5 border border-[#E3E9E1]">
              <button
                type="button"
                onClick={() => setRole("farmer")}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                  role === "farmer"
                    ? "bg-[#1E6B38] text-white shadow-xs"
                    : "text-[#58695B] hover:bg-white"
                }`}
              >
                <Sprout className="h-3.5 w-3.5" />
                <span>{lang === "en" ? "Farmer (កសិករ)" : "កសិករផ្ទាល់"}</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("proxy")}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                  role === "proxy"
                    ? "bg-[#2D924F] text-white shadow-xs"
                    : "text-[#58695B] hover:bg-white"
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                <span>{lang === "en" ? "Proxy / Agent" : "តំណាងសហគមន៍"}</span>
              </button>
            </div>
          </div>

          {/* Google Login Button */}
          <div className="mt-5">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#E3E9E1] bg-white py-3 px-4 text-xs font-bold text-[#1C241D] shadow-xs transition hover:border-[#1E6B38] hover:bg-[#F7F9F6] active:scale-99"
            >
              {/* Google multi-color SVG icon */}
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>
                {isLoading
                  ? "Connecting..."
                  : lang === "en"
                  ? "Continue with Google"
                  : "បន្តជាមួយគណនី Google"}
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full border-t border-[#E3E9E1]"></div>
            <span className="absolute bg-white px-3 text-[11px] font-medium text-[#58695B]">
              {lang === "en" ? "Or with phone / email" : "ឬតាមរយៈលេខទូរស័ព្ទ / អ៊ីមែល"}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === "register" && (
              <div>
                <label className="block text-xs font-bold text-[#1C241D]">
                  {lang === "en" ? "Full Name" : "ឈ្មោះពេញ"}
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-[#58695B]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === "proxy" ? "Seng Sopheak" : "Sokha Chan"}
                    className="w-full rounded-xl border border-[#E3E9E1] bg-white py-2 pl-9 pr-3 text-xs text-[#1C241D] placeholder:text-[#58695B]/50 focus:border-[#1E6B38] focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#1C241D]">
                {lang === "en" ? "Phone Number or Email" : "លេខទូរស័ព្ទ ឬអ៊ីមែល"}
              </label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-[#58695B]" />
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="012 345 678 or name@gmail.com"
                  className="w-full rounded-xl border border-[#E3E9E1] bg-white py-2 pl-9 pr-3 text-xs text-[#1C241D] placeholder:text-[#58695B]/50 focus:border-[#1E6B38] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C241D]">
                {lang === "en" ? "Password" : "ពាក្យសម្ងាត់"}
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#58695B]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#E3E9E1] bg-white py-2 pl-9 pr-3 text-xs text-[#1C241D] placeholder:text-[#58695B]/50 focus:border-[#1E6B38] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1E6B38] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#17532B] active:scale-99"
            >
              <span>
                {isLoading
                  ? "Authenticating..."
                  : tab === "register"
                  ? lang === "en"
                    ? "Create Account & Go to Dashboard"
                    : "បង្កើតគណនី & ចូលផ្ទាំងគ្រប់គ្រង"
                  : lang === "en"
                  ? "Sign In & Go to Dashboard"
                  : "ចូលគណនី & ចូលផ្ទាំងគ្រប់គ្រង"}
              </span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Toggle between Register and Login */}
          <div className="mt-4 text-center text-xs text-[#58695B]">
            {tab === "register" ? (
              <span>
                {lang === "en" ? "Already have an account?" : "មានគណនីរួចហើយ?"}{" "}
                <button
                  type="button"
                  onClick={() => setTab("login")}
                  className="font-bold text-[#1E6B38] hover:underline"
                >
                  {lang === "en" ? "Sign In" : "ចូលគណនី"}
                </button>
              </span>
            ) : (
              <span>
                {lang === "en" ? "Don't have an account?" : "មិនទាន់មានគណនី?"}{" "}
                <button
                  type="button"
                  onClick={() => setTab("register")}
                  className="font-bold text-[#1E6B38] hover:underline"
                >
                  {lang === "en" ? "Create One Free" : "បង្កើតឥតគិតថ្លៃ"}
                </button>
              </span>
            )}
          </div>

          {/* Fast 1-Click Demo Shortcut */}
          <div className="mt-5 border-t border-[#E3E9E1] pt-3">
            <div className="flex items-center justify-between text-[11px] text-[#58695B]">
              <span className="flex items-center gap-1 font-semibold">
                <Sparkles className="h-3 w-3 text-[#E69F00]" />
                {lang === "en" ? "Quick Preview:" : "សាកល្បងរហ័ស:"}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("farmer")}
                  className="rounded-lg bg-[#EAF4EE] px-2 py-1 text-[10px] font-bold text-[#1E6B38] hover:bg-[#1E6B38] hover:text-white transition"
                >
                  1-Click Farmer
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("proxy")}
                  className="rounded-lg bg-[#FEF7E6] px-2 py-1 text-[10px] font-bold text-[#E69F00] hover:bg-[#E69F00] hover:text-white transition"
                >
                  1-Click Proxy
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
