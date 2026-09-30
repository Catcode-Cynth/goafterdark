import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Ticket,
  Mail,
  Lock,
  Sparkles,
  Check,
  ArrowLeft,
  Smartphone,
  Maximize2,
  RefreshCw,
  Sun,
  Moon,
  User,
  LogOut,
  Flame
} from 'lucide-react';

const CONCERT_HERO_IMG = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80";

export interface MobileLoginScreenProps {
  key?: React.Key;
  onBackToHome?: () => void;
  onLoginSuccess?: (user: { email: string; name?: string }) => void;
  onForgotPassword?: () => void;
  standalone?: boolean;
  initialMode?: 'login' | 'signup';
}

export const MobileLoginScreen: React.FC<MobileLoginScreenProps> = ({
  onBackToHome,
  onLoginSuccess,
  onForgotPassword,
  standalone = false,
  initialMode = 'login',
}) => {
  // Theme state: default this mockup to NIGHT mode as specified
  const [theme, setTheme] = useState<'night' | 'day'>('night');
  const isNight = theme === 'night';

  const [authMode, setAuthMode] = useState(initialMode); // 'login' | 'signup'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deviceTheme, setDeviceTheme] = useState('phone-frame'); // 'phone-frame' | 'fullscreen'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (authMode === 'signup' && !fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (authMode === 'login') {
        setSuccessMessage('Logged in successfully! Welcome to GoAfterDark.');
      } else {
        setSuccessMessage('Account created successfully! Welcome to GoAfterDark.');
      }
      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess({
            email,
            name: authMode === 'signup' && fullName ? fullName : email.split('@')[0],
          });
        }, 1200);
      }
    }, 900);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Google authentication verified. Welcome!');
      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess({ email: 'cynthia@goafterdark.live', name: 'Cynthia Vance' });
        }, 1200);
      }
    }, 800);
  };

  const handleAutofill = () => {
    if (authMode === 'signup') {
      setFullName('Cynthia Vance');
      setEmail('cynthia@goafterdark.live');
      setPassword('goafterdark2026');
    } else {
      setEmail('cynthia@goafterdark.live');
      setPassword('goafterdark2026');
    }
    setErrorMessage('');
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-between p-3 sm:p-6 lg:p-10 font-sans transition-colors duration-300 relative overflow-x-hidden ${
        isNight
          ? 'bg-[#0B0714] text-[#F5F0FF] selection:bg-[#A78BFA] selection:text-[#0B0714]'
          : 'bg-[#F7F5FB] text-[#1A1228] selection:bg-[#7C3AED] selection:text-white'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] ${
            isNight ? 'bg-[#7C3AED]/15' : 'bg-[#7C3AED]/5'
          }`}
        />
        <div
          className={`absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full blur-[120px] ${
            isNight ? 'bg-[#A78BFA]/10' : 'bg-[#7C3AED]/5'
          }`}
        />
      </div>

      {/* Top Presentation & Navigation Bar with Theme Toggle */}
      <header
        className={`w-full max-w-5xl mb-6 z-20 flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-2xl border backdrop-blur-md transition-colors ${
          isNight
            ? 'bg-[#161022]/90 border-[#2E2545] text-[#F5F0FF]'
            : 'bg-white/90 border-[#E8E2F3] text-[#1A1228] shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3 flex-wrap">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              id="back-to-web-btn"
              type="button"
              className={`inline-flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                isNight
                  ? 'border-[#2E2545] bg-[#0B0714] text-[#F5F0FF] hover:border-[#A78BFA] hover:bg-[#1E162E]'
                  : 'border-[#E8E2F3] bg-white text-[#1A1228] hover:bg-[#F7F5FB] hover:text-[#7C3AED] shadow-xs'
              }`}
            >
              <ArrowLeft className={`h-4 w-4 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
              <span>Back to Dashboard</span>
            </button>
          )}

          <div
            className={`flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-2xl border ${
              isNight
                ? 'bg-[#0B0714] border-[#2E2545] text-[#A78BFA]'
                : 'bg-white border-[#E8E2F3] text-[#7C3AED] shadow-xs'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{authMode === 'login' ? 'Login Screen' : 'Signup Screen'} • Mobile Mockup</span>
          </div>
        </div>

        {/* View mode toggle & theme toggle */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleAutofill}
            id="autofill-demo-btn"
            className={`inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-2xl border transition cursor-pointer ${
              isNight
                ? 'bg-[#0B0714] border-[#2E2545] text-[#B8A9D4] hover:text-[#F5F0FF] hover:bg-[#1E162E]'
                : 'bg-white border-[#E8E2F3] text-[#6B6280] hover:text-[#7C3AED] hover:bg-[#F7F5FB] shadow-xs'
            }`}
            title="Auto-fill sample credentials"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
            <span>Fill Demo</span>
          </button>

          {/* Device Frame Switcher */}
          <div
            className={`inline-flex rounded-2xl p-1 border ${
              isNight
                ? 'bg-[#0B0714] border-[#2E2545]'
                : 'bg-white border-[#E8E2F3] shadow-xs'
            }`}
          >
            <button
              type="button"
              onClick={() => setDeviceTheme('phone-frame')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                deviceTheme === 'phone-frame'
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : isNight
                  ? 'text-[#B8A9D4] hover:text-[#F5F0FF]'
                  : 'text-[#6B6280] hover:text-[#1A1228]'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Device Frame</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceTheme('fullscreen')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                deviceTheme === 'fullscreen'
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : isNight
                  ? 'text-[#B8A9D4] hover:text-[#F5F0FF]'
                  : 'text-[#6B6280] hover:text-[#1A1228]'
              }`}
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Flat Portrait</span>
            </button>
          </div>

          {/* DAY / NIGHT THEME TOGGLE (Exact Sunshine & Moon segmented design) */}
          <div
            className={`flex items-center rounded-2xl border p-1 transition-all duration-200 ${
              isNight
                ? 'border-[#2E2545] bg-[#0B0714] shadow-inner shadow-black/60 ring-1 ring-[#7C3AED]/20'
                : 'border-[#E8E2F3] bg-[#F7F5FB] shadow-xs'
            }`}
            id="login-theme-toggle-container"
            title="Toggle Day / Night Mode"
          >
            {/* Day / Sunshine */}
            <button
              type="button"
              onClick={() => setTheme('day')}
              id="login-theme-day-btn"
              title="Switch to Day Mode (Sunshine)"
              aria-label="Switch to Day Mode (Sunshine)"
              className={`flex h-7 w-8 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                !isNight
                  ? 'bg-[#7C3AED] text-white shadow-sm shadow-[#7C3AED]/50'
                  : 'text-amber-400/80 hover:text-amber-300 hover:bg-[#2E2545] hover:scale-105'
              }`}
            >
              <Sun
                className={`h-4 w-4 transition-all duration-200 ${
                  !isNight
                    ? 'fill-amber-300 text-amber-200 stroke-amber-200'
                    : 'text-amber-400 stroke-amber-400'
                }`}
                strokeWidth={2.2}
              />
            </button>

            {/* Night / Moon */}
            <button
              type="button"
              onClick={() => setTheme('night')}
              id="login-theme-night-btn"
              title="Night Mode Active (Moon)"
              aria-label="Switch to Night Mode (Moon)"
              className={`flex h-7 w-8 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                isNight
                  ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/50 ring-1 ring-purple-400/40'
                  : 'text-[#6B6280] hover:text-[#7C3AED] hover:bg-[#E8E2F3]'
              }`}
            >
              <Moon
                className={`h-4 w-4 transition-all duration-200 ${
                  isNight
                    ? 'fill-purple-200 text-white stroke-purple-200'
                    : 'text-[#6B6280] stroke-current'
                }`}
                strokeWidth={2.2}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Mockup Container */}
      <main className="relative z-10 w-full flex items-center justify-center">
        <div
          id="goafterdark-mobile-login-mockup"
          className={`relative w-full max-w-[390px] overflow-hidden transition-all duration-300 ${
            deviceTheme === 'phone-frame'
              ? isNight
                ? 'rounded-[50px] border-[10px] border-[#161022] bg-[#0B0714] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(124,58,237,0.25)] ring-1 ring-[#2E2545]'
                : 'rounded-[50px] border-[10px] border-[#1A1228] bg-black shadow-[0_25px_70px_rgba(26,18,40,0.25),0_0_40px_rgba(124,58,237,0.15)] ring-1 ring-[#E8E2F3]'
              : isNight
              ? 'rounded-2xl border border-[#2E2545] bg-[#161022] shadow-2xl'
              : 'rounded-2xl border border-[#E8E2F3] bg-black shadow-xl'
          }`}
          style={{ minHeight: '820px' }}
        >
          {/* Hardware Glass Reflection Overlay (for device frame) */}
          {deviceTheme === 'phone-frame' && (
            <>
              {/* Dynamic Island / Camera Notch */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-50 h-7 w-28 rounded-full bg-black flex items-center justify-between px-2.5 border border-white/10 shadow-md">
                <div className="h-3 w-3 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-950/80" />
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-slate-900 border border-slate-800" />
              </div>
            </>
          )}

          {/* iOS Status Bar */}
          <div className="relative z-40 flex items-center justify-between px-7 pt-4 pb-2 text-[13px] font-semibold text-white tracking-tight">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              {/* Cellular signal */}
              <svg className="w-4 h-3.5 fill-current" viewBox="0 0 16 12">
                <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
                <rect x="4.5" y="6" width="2.5" height="6" rx="0.5" />
                <rect x="9" y="3" width="2.5" height="9" rx="0.5" />
                <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" />
              </svg>
              {/* Wifi */}
              <svg className="w-4 h-3.5 fill-current" viewBox="0 0 16 12">
                <path d="M8 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                <path d="M4.5 6.5a4.95 4.95 0 017 0 .75.75 0 001.06-1.06 6.45 6.45 0 00-9.12 0 .75.75 0 001.06 1.06z" />
                <path d="M2 4a8.45 8.45 0 0112 0 .75.75 0 101.06-1.06 9.95 9.95 0 00-14.12 0 .75.75 0 101.06 1.06z" />
              </svg>
              {/* Battery */}
              <div className="w-5 h-2.5 rounded-sm border border-white/90 p-0.5 flex items-center">
                <div className="h-full w-full bg-white rounded-2xs" />
              </div>
            </div>
          </div>

          {/* TOP SECTION: Full-bleed Concert Hero */}
          <div className="relative h-[300px] w-full overflow-hidden flex flex-col items-center justify-between pt-4 pb-12 px-6">
            {/* Photorealistic Concert Background with Purple Lights and Haze */}
            <div className="absolute inset-0 bg-slate-950">
              <img
                src={CONCERT_HERO_IMG}
                alt="Concert crowd with purple stage floodlights"
                className="h-full w-full object-cover object-center scale-105 filter brightness-[0.75] contrast-[1.1] blur-[0.6px]"
                referrerPolicy="no-referrer"
              />
              {/* Dark Gradient Overlay for optimal readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-purple-950/40 to-black/90" />
              
              {/* Soft purple glow & electric stage light leak */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/35 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-4 -left-10 w-48 h-48 bg-indigo-500/25 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-4 -right-10 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Centered GoAfterDark Logo Wordmark */}
            <div className="relative z-20 flex flex-col items-center mt-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-white shadow-lg shadow-[#FF1E83]/40 ring-1 ring-white/30">
                  <Flame className="h-4 w-4 fill-white" />
                </div>
                <span className="text-xl font-black tracking-tight text-white drop-shadow-md">
                  Go<span className="text-[#FF1E83]">AfterDark</span>
                </span>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#C8BDD4] uppercase mt-1">
                Your pass to the night
              </span>
            </div>

            {/* Oval / Pill-shaped Heading Card */}
            <div className="relative z-20 w-full max-w-[320px] text-center rounded-[32px] bg-black/50 backdrop-blur-xl border border-white/20 px-6 py-3.5 shadow-2xl shadow-black/50 ring-1 ring-[#FF1E83]/20 transition-all duration-300">
              <h1 className="text-xl font-extrabold tracking-tight text-white drop-shadow-sm">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="mt-1 text-xs text-white/80 font-medium">
                {authMode === 'login'
                  ? 'Login to access your GoAfterDark Account'
                  : 'Join GoAfterDark for VIP access to live events'}
              </p>
            </div>
          </div>

          {/* BOTTOM SECTION: Form Sheet with day/night palette */}
          <div
            className={`relative z-30 -mt-8 rounded-t-[34px] px-6 pt-6 pb-8 flex flex-col transition-colors duration-300 ${
              isNight
                ? 'bg-[#161022] text-[#F5F0FF] shadow-[0_-15px_40px_rgba(0,0,0,0.6)] border-t border-[#2E2545]'
                : 'bg-white text-[#1A1228] shadow-[0_-15px_40px_rgba(26,18,40,0.15)]'
            }`}
          >
            {/* Subtle top pull handle for authentic iOS sheet feeling */}
            <div
              className={`w-10 h-1 rounded-full mx-auto -mt-2 mb-4 ${
                isNight ? 'bg-[#2E2545]' : 'bg-[#E8E2F3]'
              }`}
            />

            {/* Quick Segmented Switch for Login / Sign Up */}
            <div
              className={`grid grid-cols-2 gap-1 rounded-2xl p-1 mb-4 border ${
                isNight
                  ? 'bg-[#0B0714] border-[#2E2545]'
                  : 'bg-[#F7F5FB] border-[#E8E2F3]'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMessage('');
                }}
                id="mobile-tab-login"
                className={`rounded-xl py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-[#7C3AED] text-white shadow-sm'
                    : isNight
                    ? 'text-[#B8A9D4] hover:text-[#F5F0FF]'
                    : 'text-[#6B6280] hover:text-[#1A1228]'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMessage('');
                }}
                id="mobile-tab-signup"
                className={`rounded-xl py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-[#7C3AED] text-white shadow-sm'
                    : isNight
                    ? 'text-[#B8A9D4] hover:text-[#F5F0FF]'
                    : 'text-[#6B6280] hover:text-[#1A1228]'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Feedback Notifications */}
            {errorMessage && (
              <div
                className={`mb-4 rounded-2xl p-3 text-xs font-semibold border animate-in fade-in ${
                  isNight
                    ? 'bg-rose-950/50 border-rose-800/60 text-rose-300'
                    : 'bg-rose-50 border-rose-200 text-rose-700'
                }`}
              >
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div
                className={`mb-4 rounded-2xl p-3 text-xs font-semibold flex items-center gap-2 border animate-in fade-in ${
                  isNight
                    ? 'bg-emerald-950/50 border-emerald-800/60 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                <Check className={`h-4 w-4 shrink-0 ${isNight ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Full Name Field for Sign Up */}
              {authMode === 'signup' && (
                <div className="space-y-1.5 animate-in fade-in duration-200">
                  <label
                    htmlFor="mobile-signup-name"
                    className={`block text-xs font-bold tracking-wide ${
                      isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
                    }`}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="mobile-signup-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Cynthia Vance"
                      autoComplete="name"
                      className={`w-full rounded-2xl border px-4 py-3 text-sm transition-all font-normal focus:outline-none focus:ring-4 ${
                        isNight
                          ? 'bg-[#0B0714] border-[#2E2545] text-[#F5F0FF] placeholder:text-[#B8A9D4]/50 focus:border-[#A78BFA] focus:ring-[#A78BFA]/10'
                          : 'bg-[#F7F5FB] border-[#E8E2F3] text-[#1A1228] placeholder:text-[#6B6280]/60 focus:bg-white focus:border-[#7C3AED] focus:ring-[#7C3AED]/10 shadow-2xs'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* 1. Email Address Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="mobile-login-email"
                  className={`block text-xs font-bold tracking-wide ${
                    isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
                  }`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="mobile-login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className={`w-full rounded-2xl border px-4 py-3 text-sm transition-all font-normal focus:outline-none focus:ring-4 ${
                      isNight
                        ? 'bg-[#0B0714] border-[#2E2545] text-[#F5F0FF] placeholder:text-[#B8A9D4]/50 focus:border-[#A78BFA] focus:ring-[#A78BFA]/10'
                        : 'bg-[#F7F5FB] border-[#E8E2F3] text-[#1A1228] placeholder:text-[#6B6280]/60 focus:bg-white focus:border-[#7C3AED] focus:ring-[#7C3AED]/10 shadow-2xs'
                    }`}
                  />
                </div>
              </div>

              {/* 2. Password Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="mobile-login-password"
                  className={`block text-xs font-bold tracking-wide ${
                    isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="mobile-login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={authMode === 'login' ? 'Enter your password' : 'Create a strong password'}
                    autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
                    className={`w-full rounded-2xl border pl-4 pr-12 py-3 text-sm transition-all font-normal focus:outline-none focus:ring-4 ${
                      isNight
                        ? 'bg-[#0B0714] border-[#2E2545] text-[#F5F0FF] placeholder:text-[#B8A9D4]/50 focus:border-[#A78BFA] focus:ring-[#A78BFA]/10'
                        : 'bg-[#F7F5FB] border-[#E8E2F3] text-[#1A1228] placeholder:text-[#6B6280]/60 focus:bg-white focus:border-[#7C3AED] focus:ring-[#7C3AED]/10 shadow-2xs'
                    }`}
                  />
                  {/* Eye icon to toggle visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-0 flex items-center pr-3.5 transition cursor-pointer ${
                      isNight ? 'text-[#B8A9D4] hover:text-[#A78BFA]' : 'text-[#6B6280] hover:text-[#7C3AED]'
                    }`}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* 3. Row under the fields */}
              {authMode === 'login' ? (
                <div className="flex items-center justify-between pt-0.5">
                  {/* Remember me with checkbox */}
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded-md border-[#2E2545] text-[#7C3AED] focus:ring-[#7C3AED] accent-[#7C3AED] cursor-pointer"
                    />
                    <span className={`text-xs font-medium ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                      Remember me
                    </span>
                  </label>

                  {/* Forgot Password link */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onForgotPassword) {
                        onForgotPassword();
                      } else {
                        alert('Password reset instructions sent to your email.');
                      }
                    }}
                    className={`text-xs font-semibold hover:underline transition cursor-pointer ${
                      isNight ? 'text-[#FF1E83]' : 'text-[#FF1E83]'
                    }`}
                  >
                    Forgot Password?
                  </button>
                </div>
              ) : (
                <div className="pt-0.5">
                  <label className="inline-flex items-start gap-2 cursor-pointer select-none text-left">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="h-4 w-4 mt-0.5 rounded-md border-[#2E2545] text-[#7C3AED] focus:ring-[#7C3AED] accent-[#7C3AED] cursor-pointer"
                    />
                    <span className={`text-xs ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                      I agree to GoAfterDark's{' '}
                      <strong className={isNight ? 'text-[#FF1E83]' : 'text-[#FF1E83]'}>Terms of Service</strong> and{' '}
                      <strong className={isNight ? 'text-[#FF1E83]' : 'text-[#FF1E83]'}>Privacy Policy</strong>
                    </span>
                  </label>
                </div>
              )}

              {/* 4. Primary CTA: Large filled purple button labeled "Login" or "Create Account" */}
              <button
                type="submit"
                disabled={isLoading}
                id="mobile-login-submit-btn"
                className="w-full mt-1.5 inline-flex items-center justify-center rounded-2xl bg-[#7C3AED] py-3.5 px-6 text-sm font-bold text-white shadow-md shadow-[#7C3AED]/25 hover:bg-[#6D28D9] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#7C3AED]/20 transition-all disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{authMode === 'login' ? 'Signing in...' : 'Creating Account...'}</span>
                  </div>
                ) : (
                  <span>{authMode === 'login' ? 'Login' : 'Create Account'}</span>
                )}
              </button>

              {/* 5. Divider: Thin line with centered text "Or Continue with" */}
              <div className="relative my-3.5 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={`w-full border-t ${
                      isNight ? 'border-[#2E2545]' : 'border-[#E8E2F3]'
                    }`}
                  />
                </div>
                <div
                  className={`relative px-3 ${
                    isNight ? 'bg-[#161022]' : 'bg-white'
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
                    }`}
                  >
                    Or Continue with
                  </span>
                </div>
              </div>

              {/* 6. Social login: Google Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                id="mobile-google-login-btn"
                className={`w-full inline-flex items-center justify-center gap-3 rounded-2xl border py-3.5 px-6 text-sm font-semibold active:scale-[0.98] focus:outline-none focus:ring-4 transition-all cursor-pointer ${
                  isNight
                    ? 'bg-[#0B0714] border-[#2E2545] text-[#F5F0FF] hover:bg-[#1E162E] hover:border-[#A78BFA]/40 focus:ring-[#A78BFA]/10'
                    : 'bg-white border-[#E8E2F3] text-[#1A1228] shadow-2xs hover:bg-[#F7F5FB] hover:border-[#7C3AED]/30 focus:ring-[#7C3AED]/10'
                }`}
              >
                {/* Official Google G SVG icon */}
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
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* 7. Footer Toggle */}
              <div
                className={`pt-2 text-center text-xs ${
                  isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
                }`}
              >
                {authMode === 'login' ? (
                  <>
                    <span>Don’t have an account yet? </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setErrorMessage('');
                      }}
                      id="toggle-to-signup-btn"
                      className={`font-bold hover:underline transition cursor-pointer ${
                        isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'
                      }`}
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    <span>Already have an account? </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setErrorMessage('');
                      }}
                      id="toggle-to-login-btn"
                      className={`font-bold hover:underline transition cursor-pointer ${
                        isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'
                      }`}
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </form>

            {/* iOS Home Indicator Bar */}
            <div
              className={`mt-6 w-32 h-1 rounded-full mx-auto ${
                isNight ? 'bg-white/20' : 'bg-[#1A1228]/20'
              }`}
            />
          </div>
        </div>
      </main>

      {/* Footer Meta Note */}
      <footer
        className={`mt-8 text-center text-xs max-w-md ${
          isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
        }`}
      >
        Designed for GoAfterDark iOS & Android • Hot pink & deep charcoal concert crowd hero
      </footer>
    </div>
  );
};

export default MobileLoginScreen;
