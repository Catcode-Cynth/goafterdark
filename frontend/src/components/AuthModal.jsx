import React, { useState, useEffect } from 'react';
import { X, LogIn, UserPlus, Mail, Lock, User, CheckCircle2, Flame } from 'lucide-react';

export default function AuthModal({
  isOpen = false,
  initialMode = 'login',
  onClose,
  onSuccess,
  isNight = true,
}) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  useEffect(() => {
    setMode(initialMode);
    setSubmittedMessage(null);
  }, [initialMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userDisplay = name || email.split('@')[0] || 'Pass Holder';
      setSubmittedMessage(
        mode === 'login'
          ? `Welcome back, ${userDisplay}! You are now signed in.`
          : `Account successfully created for ${userDisplay}! Welcome to GoAfterDark.`
      );

      if (onSuccess) {
        onSuccess(userDisplay);
      }

      setTimeout(() => {
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      id="auth-modal"
    >
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-2xl border p-6 shadow-2xl animate-in zoom-in-95 duration-200 ${
          isNight
            ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]'
            : 'border-[#EBE4F0] bg-white text-[#140E1E]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="auth-modal-close-btn"
          type="button"
          className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#C8BDD4] hover:text-white hover:bg-white/10 transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-white shadow-md shadow-[#FF1E83]/30">
            <Flame className="h-5 w-5 fill-white" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight">
              {mode === 'login' ? 'Sign In to GoAfterDark' : 'Create Night Pass Account'}
            </h3>
            <p className={`text-xs ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
              {mode === 'login' ? 'Access your booked tickets & VIP passes' : 'Book concert tickets instantly & join guest lists'}
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className={`mb-6 flex rounded-xl p-1 border ${
          isNight ? 'border-[#2A1E38] bg-[#0E0A16]' : 'border-[#EBE4F0] bg-[#F7F2FA]'
        }`}>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
              mode === 'login'
                ? 'bg-[#FF1E83] text-white shadow-xs'
                : isNight ? 'text-[#C8BDD4] hover:text-white' : 'text-[#6B5E78] hover:text-[#140E1E]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
              mode === 'signup'
                ? 'bg-[#FF1E83] text-white shadow-xs'
                : isNight ? 'text-[#C8BDD4] hover:text-white' : 'text-[#6B5E78] hover:text-[#140E1E]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Feedback message */}
        {submittedMessage ? (
          <div className="py-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold">{submittedMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-4 w-4 text-[#C8BDD4]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Cynthia Okechukwu"
                    className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF1E83]/40 ${
                      isNight
                        ? 'border-[#2A1E38] bg-[#0E0A16] text-[#FAF5FF] placeholder:text-[#C8BDD4]/50'
                        : 'border-[#EBE4F0] bg-[#F7F2FA] text-[#140E1E]'
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-[#C8BDD4]" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF1E83]/40 ${
                    isNight
                      ? 'border-[#2A1E38] bg-[#0E0A16] text-[#FAF5FF] placeholder:text-[#C8BDD4]/50'
                      : 'border-[#EBE4F0] bg-[#F7F2FA] text-[#140E1E]'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-[#C8BDD4]" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF1E83]/40 ${
                    isNight
                      ? 'border-[#2A1E38] bg-[#0E0A16] text-[#FAF5FF] placeholder:text-[#C8BDD4]/50'
                      : 'border-[#EBE4F0] bg-[#F7F2FA] text-[#140E1E]'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF1E83] hover:bg-[#E6006E] py-3 text-sm font-black text-white shadow-md shadow-[#FF1E83]/30 transition disabled:opacity-50"
            >
              {mode === 'login' ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              <span>{isLoading ? 'Processing…' : mode === 'login' ? 'Sign In' : 'Create Free Account'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
