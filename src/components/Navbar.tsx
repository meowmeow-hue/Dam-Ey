"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Sprout, ShieldAlert, Globe, Menu, X, ArrowRight, User } from "lucide-react";

interface NavbarProps {
  onOpenAuth: (role?: "farmer" | "proxy", initialData?: { province?: string; crop?: string }) => void;
  lang: "en" | "km";
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, lang, onToggleLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E3E9E1] bg-[#F7F9F6]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E6B38] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Sprout className="h-6 w-6 text-[#E8F7EC]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-[#1C241D]">CropWise</span>
              <span className="rounded-full bg-[#E8F7EC] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#1E6B38]">
                CAMBODIA
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#58695B]">
              {lang === "en" ? "Agricultural Intelligence" : "បច្ចេកវិទ្យាកសិកម្មវៃឆ្លាត"}
            </span>
          </div>
        </Link>

        {/* Center Desktop Links */}
        <nav className="hidden items-center gap-7 lg:flex">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-[#1C241D] transition-colors hover:text-[#1E6B38]"
          >
            {lang === "en" ? "How It Works" : "របៀបដំណើរការ"}
          </a>
          <a
            href="#live-signals"
            className="flex items-center gap-1.5 text-sm font-medium text-[#1C241D] transition-colors hover:text-[#1E6B38]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2D924F] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2D924F]"></span>
            </span>
            {lang === "en" ? "Live Market Signals" : "សញ្ញាទីផ្សារផ្ទាល់"}
          </a>
          <a
            href="#proxy-model"
            className="text-sm font-medium text-[#1C241D] transition-colors hover:text-[#1E6B38]"
          >
            {lang === "en" ? "Proxy Model" : "គំរូតំណាងសហគមន៍"}
          </a>
          <a
            href="#partners"
            className="text-sm font-medium text-[#1C241D] transition-colors hover:text-[#1E6B38]"
          >
            {lang === "en" ? "Partners" : "ដៃគូសហការ"}
          </a>
        </nav>

        {/* Right Action & Language Toggle */}
        <div className="hidden items-center gap-3 sm:flex">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 rounded-lg border border-[#E3E9E1] bg-white px-3 py-1.5 text-xs font-semibold text-[#1C241D] shadow-xs transition hover:border-[#1E6B38] hover:bg-[#F0F4EF]"
            title="Switch Language"
          >
            <Globe className="h-3.5 w-3.5 text-[#1E6B38]" />
            <span>{lang === "en" ? "🇰🇭 ភាសាខ្មែរ" : "🇬🇧 EN"}</span>
          </button>

          {/* Primary Action Button or Dashboard Link if Logged In */}
          {user ? (
            <Link
              href={`/dashboard?role=${user.role}`}
              className="group inline-flex items-center gap-2 rounded-xl bg-[#1E6B38] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#17532B] hover:shadow-md active:scale-98"
            >
              <User className="h-4 w-4" />
              <span>{lang === "en" ? "My Dashboard" : "ផ្ទាំងគ្រប់គ្រងខ្ញុំ"}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <button
              onClick={() => onOpenAuth("farmer")}
              className="group inline-flex items-center gap-2 rounded-xl bg-[#1E6B38] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#17532B] hover:shadow-md active:scale-98"
            >
              <span>{lang === "en" ? "Check My Crop Risk" : "ពិនិត្យហានិភ័យដំណាំ"}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 rounded-lg border border-[#E3E9E1] bg-white px-2 py-1.5 text-xs font-medium text-[#1C241D]"
          >
            {lang === "en" ? "🇰🇭" : "🇬🇧"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-[#1C241D] hover:bg-[#E8F7EC]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#E3E9E1] bg-white px-4 pt-3 pb-5 shadow-lg lg:hidden">
          <div className="flex flex-col space-y-3">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-base font-medium text-[#1C241D] hover:bg-[#F7F9F6]"
            >
              {lang === "en" ? "How It Works" : "របៀបដំណើរការ"}
            </a>
            <a
              href="#live-signals"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-base font-medium text-[#1C241D] hover:bg-[#F7F9F6]"
            >
              {lang === "en" ? "Live Market Signals" : "សញ្ញាទីផ្សារផ្ទាល់"}
            </a>
            <a
              href="#proxy-model"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-base font-medium text-[#1C241D] hover:bg-[#F7F9F6]"
            >
              {lang === "en" ? "Proxy Model" : "គំរូតំណាងសហគមន៍"}
            </a>
            <a
              href="#partners"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-base font-medium text-[#1C241D] hover:bg-[#F7F9F6]"
            >
              {lang === "en" ? "Partners" : "ដៃគូសហការ"}
            </a>
            <div className="pt-2">
              {user ? (
                <Link
                  href={`/dashboard?role=${user.role}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E6B38] py-3 text-center text-sm font-semibold text-white shadow-sm"
                >
                  <User className="h-4 w-4" />
                  <span>{lang === "en" ? "Go to Dashboard" : "ទៅកាន់ផ្ទាំងគ្រប់គ្រង"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("farmer");
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E6B38] py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#17532B]"
                >
                  <span>{lang === "en" ? "Check My Crop Risk" : "ពិនិត្យហានិភ័យដំណាំ"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
