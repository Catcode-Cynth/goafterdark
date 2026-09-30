import React, { useState } from "react";
import {
  Lock,
  Loader2,
  AlertTriangle,
  Flame,
  CheckCircle2,
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles
} from "lucide-react";

interface ResetPasswordProps {
  token?: string | null;
  onBackToLogin?: () => void;
  onRequestNewLink?: () => void;
  onResetSuccess?: () => void;
}

export default function ResetPassword({
  token = "mock-reset-token-2026",
  onBackToLogin,
  onRequestNewLink,
  onResetSuccess,
}: ResetPasswordProps) {
  const [resetToken, setResetToken] = useState<string | null>(token);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onResetSuccess) {
        setTimeout(onResetSuccess, 1800);
      }
    }, 1100);
  };

  // Case 1: Missing or invalid token
  if (!resetToken) {
    return (
      <div className="min-h-screen bg-[#0B0714] text-[#F5F0FF] flex flex-col justify-start items-center px-4 pt-8 sm:pt-14 pb-36 relative overflow-y-auto font-sans selection:bg-[#FF1E83] selection:text-white">
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

        <div className="w-full max-w-md relative z-10 space-y-6 my-auto">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="h-12 w-12 rounded-2xl bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-900/30">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-[#F5F0FF]">Invalid reset link</h1>
            <p className="text-xs text-[#C8BDD4] max-w-xs">
              This password reset link is missing, expired, or invalid.
            </p>
          </div>

          <div className="bg-[#161022] rounded-3xl p-6 sm:p-8 border border-[#2A1E38] shadow-2xl space-y-5 text-center">
            <p className="text-xs text-[#C8BDD4] leading-relaxed">
              The link you used appears to be incomplete or expired. Please request a new password reset link to safely access your GoAfterDark account.
            </p>

            <button
              type="button"
              onClick={onRequestNewLink}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] text-white text-xs font-bold shadow-xl shadow-[#FF1E83]/30 hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              Request a new reset link
            </button>

            <div className="pt-2 border-t border-[#2A1E38]">
              <button
                type="button"
                onClick={onBackToLogin}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF1E83] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Log In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Success state
  if (success) {
    return (
      <div className="min-h-screen bg-[#0B0714] text-[#F5F0FF] flex flex-col justify-start items-center px-4 pt-8 sm:pt-14 pb-36 relative overflow-y-auto font-sans selection:bg-[#FF1E83] selection:text-white">
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

        <div className="w-full max-w-md relative z-10 space-y-6 text-center my-auto">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 shadow-xl shadow-emerald-900/30">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-[#F5F0FF]">Password reset successfully!</h1>
            <p className="text-xs text-[#C8BDD4] max-w-xs mx-auto">
              Your password has been updated. You can now log into your GoAfterDark account with your new credentials.
            </p>
          </div>

          <div className="bg-[#161022] rounded-3xl p-6 border border-[#2A1E38] shadow-2xl">
            <button
              type="button"
              onClick={onBackToLogin}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] text-white text-xs font-bold shadow-xl shadow-[#FF1E83]/30 hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              Log in to your account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: Standard New Password Form
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
            <KeyRound className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF1E83]">
            GoAfterDark Security
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F0FF]">
            Set new password
          </h1>
          <p className="text-xs sm:text-sm text-[#C8BDD4] max-w-xs">
            Create a strong, secure password for your GoAfterDark account.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#161022] rounded-3xl p-6 sm:p-8 border border-[#2A1E38] shadow-2xl space-y-5">
          {error && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold">
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
                New Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-4 w-4 text-[#FF1E83]" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  autoFocus
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-2xl border border-[#2A1E38] bg-[#0B0714] py-3.5 pl-11 pr-11 text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#C8BDD4] hover:text-[#FF1E83] transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="confirm" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
                Confirm Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-4 w-4 text-[#FF1E83]" aria-hidden="true" />
                </div>
                <input
                  id="confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-2xl border border-[#2A1E38] bg-[#0B0714] py-3.5 pl-11 pr-11 text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#C8BDD4] hover:text-[#FF1E83] transition cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password strength tips */}
            <div className="p-3 rounded-2xl bg-[#0B0714] border border-[#2A1E38] text-[11px] text-[#C8BDD4] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#F5F0FF]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Security Guidelines</span>
              </div>
              <p>Minimum 6 characters, including a combination of letters and numbers.</p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] hover:from-[#FF0070] hover:to-[#FF1E83] py-3.5 px-6 text-xs sm:text-sm font-black text-white shadow-xl shadow-[#FF1E83]/30 transition hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Reset password</span>
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
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
        </div>
      </div>
    </div>
  );
}
