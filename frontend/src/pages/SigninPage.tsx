import React, { useState } from "react";
import {
  Mail,
  Lock,
  Ticket,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  Flame,
  Sparkles,
  CheckCircle2
} from "lucide-react";

import { loginRequest, setToken, setStoredUser } from '../lib/api';

export interface SignInPageProps {
  onBack?: () => void;
  onLoginSuccess?: (user: {
    email: string;
    name?: string;
    role?: 'CREATOR' | 'EVENTEE';
  }) => void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
}

export default function SignInPage({
  onBack,
  onLoginSuccess,
  onForgotPassword,
  onSignUp,
}: SignInPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password");
      return;
    }

    setLoading(true);
    try {
      const data = await loginRequest(email, password);
      const token = data.access_token || data.accessToken || data.token;
      if (!token) {
        setErrorMessage("Login succeeded but no token was returned");
        return;
      }

      setToken(token);
      setStoredUser({
        email: data.user?.email || email,
        role: data.user?.role,
      });

      setSuccessMessage("Logged in successfully! Welcome back.");
      onLoginSuccess?.({
        email: data.user?.email || email,
        name: data.user?.firstName || email.split('@')[0],
        role: data.user?.role,
      });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    
    }
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
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161022] border border-[#2A1E38] text-xs font-bold text-[#C8BDD4] hover:text-white hover:border-[#FF1E83] transition shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF1E83]">GoAfterDark Auth</span>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6 my-auto">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#FF5364] flex items-center justify-center text-white shadow-xl shadow-[#FF1E83]/30">
            <Ticket className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF1E83]">
            Eventful • GoAfterDark
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F0FF]">
            Welcome back
          </h1>
          <p className="text-xs sm:text-sm text-[#C8BDD4] max-w-xs">
            Sign in to your GoAfterDark account to manage your tickets and events
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#161022] rounded-3xl p-6 sm:p-8 border border-[#2A1E38] shadow-2xl space-y-5">
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold animate-in fade-in">
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-4 w-4 text-[#FF1E83]" aria-hidden="true" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                  required
                  className="w-full rounded-2xl border border-[#2A1E38] bg-[#0B0714] py-3.5 pl-11 pr-4 text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="login-password" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-4 w-4 text-[#FF1E83]" aria-hidden="true" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-2xl border border-[#2A1E38] bg-[#0B0714] py-3.5 pl-11 pr-11 text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
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

            {/* Forgot password link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs text-[#FF1E83] font-bold hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] hover:from-[#FF0070] hover:to-[#FF1E83] py-3.5 px-6 text-xs sm:text-sm font-black text-white shadow-xl shadow-[#FF1E83]/30 transition hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Sign up toggle footer */}
          <div className="text-center pt-2 border-t border-[#2A1E38]">
            <p className="text-xs text-[#C8BDD4]">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSignUp}
                className="text-[#FF1E83] font-bold hover:underline cursor-pointer ml-1"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
