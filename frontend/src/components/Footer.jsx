import React from 'react';
import { Flame, Shield, Heart, Sparkles } from 'lucide-react';

export default function Footer({ onExploreClick, onOpenAuth, isNight = true }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`w-full border-t transition-colors duration-200 ${
        isNight
          ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF]'
          : 'border-[#EBE4F0] bg-white text-[#140E1E]'
      }`}
      id="homepage-footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-white shadow-md shadow-[#FF1E83]/30">
                <Flame className="h-5 w-5 fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight font-sans">
                Go<span className="text-[#FF1E83]">AfterDark</span>
              </span>
            </div>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
              }`}
            >
              Your pass to the night. Premier event ticketing for concerts, nightlife, beach raves, and live shows in Lagos and beyond.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-black uppercase tracking-wider ${
                isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'
              }`}
            >
              Navigation
            </h4>
            <ul
              className={`space-y-2 text-xs sm:text-sm font-semibold ${
                isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
              }`}
            >
              <li>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FF1E83] transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreClick}
                  className="hover:text-[#FF1E83] transition"
                >
                  Explore Events
                </button>
              </li>
              <li>
                <a href="#categories-section" className="hover:text-[#FF1E83] transition">
                  Nightlife Vibes
                </a>
              </li>
              <li>
                <a href="#search-section" className="hover:text-[#FF1E83] transition">
                  Search Lagos Shows
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-black uppercase tracking-wider ${
                isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'
              }`}
            >
              Top Experiences
            </h4>
            <ul
              className={`space-y-2 text-xs sm:text-sm font-semibold ${
                isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
              }`}
            >
              <li className="hover:text-[#FF1E83] transition cursor-pointer">Afrobeats Stadium Concerts</li>
              <li className="hover:text-[#FF1E83] transition cursor-pointer">Midnight Beach Raves</li>
              <li className="hover:text-[#FF1E83] transition cursor-pointer">Rooftop Sunset Mixers</li>
              <li className="hover:text-[#FF1E83] transition cursor-pointer">Standup Comedy Nights</li>
            </ul>
          </div>

          {/* Col 4: Account & Security */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-black uppercase tracking-wider ${
                isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'
              }`}
            >
              Pass Holders
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={() => onOpenAuth('login')}
                className={`text-xs sm:text-sm font-semibold hover:text-[#FF1E83] transition block text-left ${
                  isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
                }`}
              >
                Sign In to Account
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="text-xs sm:text-sm font-bold text-[#FF1E83] hover:underline block text-left"
              >
                Get Started Free →
              </button>

              <div
                className={`flex items-center gap-2 pt-2 text-[11px] font-semibold ${
                  isNight ? 'text-[#C8BDD4]/80' : 'text-[#8E7F9A]'
                }`}
              >
                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                <span>Verified Anti-Scalp Entry</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold ${
            isNight ? 'border-[#2A1E38] text-[#C8BDD4]/70' : 'border-[#EBE4F0] text-[#8E7F9A]'
          }`}
        >
          <div>
            © {currentYear} GoAfterDark. All rights reserved. Your pass to the night.
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-[#FF1E83] transition cursor-pointer">Terms</span>
            <span>•</span>
            <span className="hover:text-[#FF1E83] transition cursor-pointer">Privacy</span>
            <span>•</span>
            <span className="hover:text-[#FF1E83] transition cursor-pointer">Security</span>
            <span>•</span>
            <span className="hover:text-[#FF1E83] transition cursor-pointer">Lagos, Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
