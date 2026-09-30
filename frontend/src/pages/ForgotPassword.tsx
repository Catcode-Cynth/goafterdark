import React, { useState } from "react";
import { Mail, ArrowLeft, Loader2, CheckCircle2, Flame, ShieldAlert, Sparkles } from "lucide-react";

interface ForgotPasswordProps {
  onBackToLogin?: () => void;
  onNavigateToReset?: (email: string) => void;
}

export default function ForgotPassword({ onBackToLogin, onNavigateToReset }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#0B0714] text-[#F5F0FF] flex flex-col justify-start items-center px-4 pt-8 sm:pt-14 pb-36 relative overflow-y-auto font-sans selection:bg-[#FF1E83] selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FF1E83]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#9333EA]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Bar */}
      <div className="w-full max-w-md flex items-center justify-between mb-6 z-20">
        <button
          type="button"
          onClick={onBackToLogin}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161022] border border-[#2A1E38] text-xs font-bold text-[#C8BDD4] hover:text-white hover:border-[#FF1E83] transition shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Log In</span>
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF1E83]">GoAfterDark Auth</span>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-5 my-auto">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#FF5364] flex items-center justify-center text-white shadow-xl shadow-[#FF1E83]/30">
            <Flame className="h-6 w-6 fill-white" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF1E83]">
            GoAfterDark Security
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F0FF]">
            Reset password
          </h1>
          <p className="text-xs sm:text-sm text-[#C8BDD4] max-w-xs">
            We'll send you a secure verification link to regain access to your account.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#161022] rounded-3xl p-6 sm:p-8 border border-[#2A1E38] shadow-2xl space-y-6">
          {sent ? (
            <div className="text-center space-y-5 py-2">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-900/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-[#F5F0FF]">Check your inbox</h3>
                <p className="text-xs text-[#C8BDD4] leading-relaxed">
                  If an account exists for <span className="font-bold text-[#FF1E83]">{email}</span>, you'll receive a password reset link shortly.
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                {onNavigateToReset && (
                  <button
                    type="button"
                    onClick={() => onNavigateToReset(email)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] text-white text-xs font-bold shadow-lg shadow-[#FF1E83]/30 hover:brightness-110 active:scale-95 transition cursor-pointer"
                  >
                    Enter 6-Digit Reset Code
                  </button>
                )}

                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="w-full py-3 rounded-2xl border border-[#2A1E38] bg-[#0B0714] text-xs font-bold text-[#C8BDD4] hover:text-white hover:border-[#FF1E83] transition cursor-pointer"
                >
                  Back to Log In
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Mail className="h-4 w-4 text-[#FF1E83]" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-[#2A1E38] bg-[#0B0714] py-3.5 pl-11 pr-4 text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] hover:from-[#FF0070] hover:to-[#FF1E83] py-3.5 px-6 text-xs sm:text-sm font-black text-white shadow-xl shadow-[#FF1E83]/30 transition hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Send Reset Link</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Back to Login Link */}
          {!sent && (
            <div className="text-center pt-2 border-t border-[#2A1E38]">
              <button
                type="button"
                onClick={onBackToLogin}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF1E83] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Log In</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
