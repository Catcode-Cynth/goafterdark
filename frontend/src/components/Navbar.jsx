 import React, { useState } from 'react';
import { Moon, Sun, Compass, User, LogIn, Heart, Menu, X, Flame, Sparkles } from 'lucide-react';

export default function Navbar({
  theme = 'night',
  onThemeToggle,
  onOpenAuth,
  onOpenMobileLogin,
  onOpenMobileSignup,
  currentUser,
  onExploreClick,
  favoriteCount = 0,
  onShowFavoritesOnly,
  isFavoritesFilterActive = false,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isNight = theme === 'night';

  const handleExplore = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onExploreClick();
  };

  const handleAuth = (mode) => {
    setMobileMenuOpen(false);
    if (mode === 'signup' && onOpenMobileSignup) {
      onOpenMobileSignup();
    } else if (mode === 'login' && onOpenMobileLogin) {
      onOpenMobileLogin();
    } else {
      onOpenAuth(mode);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 ${
        isNight
          ? 'border-[#2A1E38] bg-[#0A070D]/95 text-[#FAF5FF]'
          : 'border-[#EBE4F0] bg-white/95 text-[#140E1E] shadow-xs'
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: GoAfterDark Logo */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 transition-opacity hover:opacity-95 group"
            id="nav-brand-logo"
          >
            {/* GoAfterDark Logo Icon (Night flame / crescent moon badge with hot pink gradient) */}
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-white shadow-md shadow-[#FF1E83]/30 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
              <Flame className="h-5 w-5 fill-white" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-black tracking-tight font-sans">
                  Go<span className="text-[#FF1E83]">AfterDark</span>
                </span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
              </div>
              <span
                className={`text-[10px] font-bold tracking-wider uppercase -mt-0.5 ${
                  isNight ? 'text-[#C8BDD4]' : 'text-[#8E7F9A]'
                }`}
              >
                Your pass to the night
              </span>
            </div>
          </a>
        </div>

        {/* Center: Explore Events */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={handleExplore}
            id="nav-explore-btn"
            type="button"
            className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition-all duration-150 ${
              isNight
                ? 'text-[#C8BDD4] hover:text-[#FAF5FF] hover:bg-[#161022]'
                : 'text-[#6B5E78] hover:text-[#FF1E83] hover:bg-[#F7F2FA]'
            }`}
          >
            <Compass className="h-4 w-4 text-[#FF1E83]" />
            <span>Explore Events</span>
          </button>

          {/* Saved Events button if any */}
          {favoriteCount > 0 && (
            <button
              onClick={onShowFavoritesOnly}
              id="nav-favorites-btn"
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                isFavoritesFilterActive
                  ? isNight
                    ? 'bg-[#FF5364]/20 text-[#FF5364] border border-[#FF5364]/40'
                    : 'bg-[#FF5364]/10 text-[#FF5364] border border-[#FF5364]/30'
                  : isNight
                  ? 'border border-[#2A1E38] bg-[#161022] text-[#C8BDD4] hover:text-white'
                  : 'border border-[#EBE4F0] bg-white text-[#6B5E78] hover:text-[#140E1E]'
              }`}
              title="Filter by your saved events"
            >
              <Heart className={`h-3.5 w-3.5 ${isFavoritesFilterActive ? 'fill-[#FF5364] text-[#FF5364]' : 'text-[#FF5364]'}`} />
              <span>Saved ({favoriteCount})</span>
            </button>
          )}
        </nav>

        {/* TOP RIGHT, in this exact order:
            1. Day/night toggle with SUNSHINE (sun) icon and MOON icon — both visible (Night is default)
            2. Login
            3. Sign Up (hot pink filled button) */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* 1. Day / Night theme selector */}
          <div
            className={`flex items-center rounded-2xl p-1 shadow-sm border transition-all ${
              isNight
                ? 'border-[#2A1E38] bg-[#161022]'
                : 'border-[#EBE4F0] bg-[#F7F2FA]'
            }`}
            role="radiogroup"
            aria-label="Theme mode toggle"
            id="nav-theme-toggle"
          >
            {/* Sun / Sunshine button */}
            <button
              type="button"
              onClick={() => onThemeToggle('day')}
              id="btn-nav-theme-day"
              role="radio"
              aria-checked={!isNight}
              aria-label="Day mode"
              className={`flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                !isNight
                  ? 'bg-white text-[#FF1E83] shadow-sm ring-1 ring-[#EBE4F0]'
                  : 'text-[#C8BDD4] hover:text-[#FAF5FF] hover:bg-[#2A1E38]/40'
              }`}
            >
              <Sun className={`h-4 w-4 ${!isNight ? 'text-amber-500 fill-amber-400' : 'text-[#C8BDD4]'}`} />
              <span className="text-[11px] font-extrabold tracking-wide hidden lg:inline">Day</span>
            </button>

            {/* Moon / Night button (Default active) */}
            <button
              type="button"
              onClick={() => onThemeToggle('night')}
              id="btn-nav-theme-night"
              role="radio"
              aria-checked={isNight}
              aria-label="Night mode"
              className={`flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                isNight
                  ? 'bg-[#FF1E83] text-white shadow-md shadow-[#FF1E83]/30 ring-1 ring-white/20'
                  : 'text-[#6B5E78] hover:text-[#FF1E83] hover:bg-white/60'
              }`}
            >
              <Moon className={`h-4 w-4 ${isNight ? 'text-white fill-white' : 'text-[#6B5E78]'}`} />
              <span className="text-[11px] font-extrabold tracking-wide hidden lg:inline">Night</span>
            </button>
          </div>

          {/* User state / 2. Login + 3. Sign Up */}
          {currentUser ? (
            <div
              className={`flex items-center gap-2 rounded-2xl border px-3.5 py-1.5 text-xs font-bold ${
                isNight
                  ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]'
                  : 'border-[#EBE4F0] bg-white text-[#140E1E]'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentUser.name || currentUser.email}</span>
            </div>
          ) : (
            <>
              {/* 2. Login */}
              <button
                onClick={() => handleAuth('login')}
                id="nav-login-btn"
                type="button"
                className={`text-sm font-bold px-3 py-2 transition-colors duration-150 ${
                  isNight
                    ? 'text-[#C8BDD4] hover:text-white'
                    : 'text-[#6B5E78] hover:text-[#FF1E83]'
                }`}
              >
                Login
              </button>

              {/* 3. Sign Up (Hot Pink filled button) */}
              <button
                onClick={() => handleAuth('signup')}
                id="nav-signup-btn"
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#FF1E83] hover:bg-[#E6006E] px-5 py-2.5 text-sm font-black text-white shadow-md shadow-[#FF1E83]/30 transition-all duration-150 active:scale-95"
              >
                <User className="h-4 w-4" />
                <span>Sign Up</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Theme Toggle */}
          <button
            type="button"
            onClick={() => onThemeToggle(isNight ? 'day' : 'night')}
            className={`p-2 rounded-xl border ${
              isNight ? 'border-[#2A1E38] bg-[#161022] text-[#FF1E83]' : 'border-[#EBE4F0] bg-white text-amber-500'
            }`}
            title="Toggle theme"
          >
            {isNight ? <Moon className="h-4 w-4 fill-[#FF1E83]" /> : <Sun className="h-4 w-4 fill-amber-400" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-menu-btn"
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
              isNight
                ? 'border-[#2A1E38] bg-[#161022] text-white'
                : 'border-[#EBE4F0] bg-white text-[#140E1E]'
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`border-b px-4 py-4 md:hidden animate-in fade-in slide-in-from-top-2 duration-150 shadow-2xl ${
            isNight
              ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF]'
              : 'border-[#EBE4F0] bg-white text-[#140E1E]'
          }`}
        >
          <div className="flex flex-col gap-3">
            <button
              onClick={handleExplore}
              id="mobile-nav-explore-btn"
              className={`flex w-full items-center justify-start gap-2.5 rounded-2xl px-3 py-2.5 text-base font-bold ${
                isNight ? 'hover:bg-[#161022]' : 'hover:bg-[#F7F2FA]'
              }`}
            >
              <Compass className="h-5 w-5 text-[#FF1E83]" />
              <span>Explore Events</span>
            </button>

            {favoriteCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onShowFavoritesOnly();
                }}
                id="mobile-nav-favorites-btn"
                className={`flex w-full items-center justify-start gap-2.5 rounded-2xl px-3 py-2.5 text-base font-bold ${
                  isNight ? 'hover:bg-[#161022]' : 'hover:bg-[#F7F2FA]'
                }`}
              >
                <Heart className="h-5 w-5 fill-[#FF5364] text-[#FF5364]" />
                <span>Saved Events ({favoriteCount})</span>
              </button>
            )}

            <hr className={isNight ? 'border-[#2A1E38]' : 'border-[#EBE4F0]'} />

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => handleAuth('login')}
                id="mobile-nav-login-btn"
                className={`flex w-full items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-bold ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]'
                    : 'border-[#EBE4F0] bg-[#F7F2FA] text-[#140E1E]'
                }`}
              >
                <LogIn className="h-4 w-4 text-[#FF1E83]" />
                <span>Login</span>
              </button>

              <button
                onClick={() => handleAuth('signup')}
                id="mobile-nav-signup-btn"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF1E83] hover:bg-[#E6006E] py-3 text-sm font-black text-white shadow-md shadow-[#FF1E83]/30"
              >
                <User className="h-4 w-4" />
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
