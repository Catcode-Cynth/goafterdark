import React from 'react';
import { Ticket, LogIn, UserPlus, ShieldCheck, Zap, Flame, Sparkles } from 'lucide-react';
import ConfettiParticles from './ConfettiParticles.jsx';

export default function BookingCTA({ onOpenAuth, isNight = true }) {
  return (
    <section
      className={`w-full py-12 sm:py-16 md:py-20 border-y transition-colors duration-200 ${
        isNight
          ? 'border-[#2A1E38] bg-[#0A070D]'
          : 'border-[#EBE4F0] bg-[#FAF8FC]'
      }`}
      id="ready-to-book-section"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A0C24] via-[#15091E] to-[#0A060E] border border-[#FF1E83]/30 p-8 sm:p-14 text-center shadow-2xl text-[#FAF5FF]">
          {/* Sparse Pink + Mustard Confetti accents */}
          <ConfettiParticles count={12} className="z-10" />

          {/* Glowing hot pink aura in background */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF1E83]/15 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-10 w-72 h-72 bg-[#F59E0B]/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            {/* GoAfterDark Icon Badge */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-white shadow-lg shadow-[#FF1E83]/40 ring-1 ring-white/30 mb-6">
              <Flame className="h-8 w-8 fill-white" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-[#FAF5FF]">
              Ready to Book?
            </h2>

            {/* Supporting Text */}
            <p className="mt-3 text-sm sm:text-base text-[#C8BDD4] leading-relaxed max-w-lg">
              Sign in or create a free account to purchase tickets instantly and access exclusive nightlife guest lists.
            </p>

            {/* Feature highlights */}
            <div className="mt-6 flex flex-wrap justify-center items-center gap-6 text-xs font-bold text-[#FAF5FF]/90">
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-[#F59E0B]" />
                <span>Instant QR pass delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>100% Authentic verified entry</span>
              </div>
            </div>

            {/* Action Buttons: Sign In (outline) + Create Account (hot pink fill) */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              {/* Sign In (Outline) */}
              <button
                onClick={() => onOpenAuth('login')}
                id="cta-sign-in-btn"
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/30 bg-white/5 hover:bg-white/15 px-8 py-3.5 text-sm font-black text-white backdrop-blur-md shadow-sm transition active:scale-95 hover:border-white/60"
              >
                <LogIn className="h-4 w-4 text-[#FF1E83]" />
                <span>Sign In</span>
              </button>

              {/* Create Account (Hot Pink Fill) */}
              <button
                onClick={() => onOpenAuth('signup')}
                id="cta-create-account-btn"
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF1E83] hover:bg-[#E6006E] px-8 py-3.5 text-sm font-black text-white shadow-xl shadow-[#FF1E83]/40 transition active:scale-95 ring-1 ring-white/20"
              >
                <UserPlus className="h-4 w-4" />
                <span>Create Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
