import React, { useState } from 'react';
import {
  Ticket,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Github,
  Chrome
} from 'lucide-react';

export default function LoginPage({
  initialMode = 'login',
  onBackToEvents,
  onLoginSuccess,
  darkMode,
  setDarkMode,
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup' | 'forgot'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [wireframeOverlay, setWireframeOverlay] = useState(false);

  // Demo user quick login
  const handleQuickDemoLogin = (role = 'attendee') => {
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: role === 'attendee' ? 'Cynthia N.' : 'Event Organizer VIP',
        email: role === 'attendee' ? 'cynthianasa8@gmail.com' : 'organizer@eventful.live',
        role: role,
      };
      setSuccessMessage(`Welcome back, ${user.name}!`);
      setTimeout(() => {
        onLoginSuccess(user);
      }, 700);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (mode === 'forgot') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage(`Password reset link has been dispatched to ${email}`);
      }, 800);
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: mode === 'signup' ? fullName.trim() : (email.split('@')[0] || 'User'),
        email: email.trim(),
        role: 'attendee',
      };
      setSuccessMessage(mode === 'signup' ? 'Account created successfully!' : 'Signed in successfully!');
      setTimeout(() => {
        onLoginSuccess(user);
      }, 700);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors duration-200 selection:bg-indigo-600 selection:text-white">
      
      {/* Top Utility Header */}
      <header className="w-full h-14 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-4 sm:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            id="login-back-btn"
            onClick={onBackToEvents}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Events</span>
          </button>
          
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-sm tracking-tight">
            <div className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Ticket className="w-3.5 h-3.5" />
            </div>
            <span>GoAfterDark</span>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          {/* Wireframe View Toggle */}
          <button
            id="toggle-wireframe-spec-btn"
            onClick={() => setWireframeOverlay(!wireframeOverlay)}
            className={`text-[11px] font-bold px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
              wireframeOverlay
                ? 'bg-amber-100 dark:bg-amber-950 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
            title="Toggle Wireframe Outline overlay"
          >
            {wireframeOverlay ? 'Blueprint ON' : 'Wireframe Spec'}
          </button>

          {/* Theme toggle */}
          <button
            id="login-theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </header>

      {/* Main Form Canvas / Wireframe Frame */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        
        <div
          id="login-wireframe-frame"
          className={`w-full max-w-md transition-all ${
            wireframeOverlay
              ? 'border-2 border-dashed border-indigo-500 ring-4 ring-indigo-500/10'
              : ''
          }`}
        >
          {/* Outer Card Container */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            
            {/* Header Banner */}
            <div className="p-6 pb-4 text-center border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white shadow-sm mb-3">
                <Ticket className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {mode === 'login' && 'Sign in to EVENTFUL'}
                {mode === 'signup' && 'Create your account'}
                {mode === 'forgot' && 'Reset your password'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                {mode === 'login' && 'Access your booked tickets, concert passes, and saved events.'}
                {mode === 'signup' && 'Join thousands of fans discovering live events and festivals.'}
                {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
              </p>

              {/* Mode Switcher Tabs */}
              {mode !== 'forgot' && (
                <div className="mt-4 flex p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    id="tab-btn-signin"
                    onClick={() => {
                      setMode('login');
                      setError('');
                      setSuccessMessage('');
                    }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      mode === 'login'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    id="tab-btn-signup"
                    onClick={() => {
                      setMode('signup');
                      setError('');
                      setSuccessMessage('');
                    }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      mode === 'signup'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              
              {/* Alert Feedback */}
              {error && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Quick Demo Autofill Bar */}
              {mode === 'login' && (
                <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-indigo-900 dark:text-indigo-300 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>Quick Testing:</span>
                  </div>
                  <button
                    type="button"
                    id="autofill-demo-btn"
                    onClick={() => handleQuickDemoLogin('attendee')}
                    className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 px-2 py-1 rounded border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer"
                  >
                    Demo 1-Click Login
                  </button>
                </div>
              )}

              {/* Form Controls */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* Full Name for Sign Up */}
                {mode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>Full Name</span>
                    </label>
                    <input
                      id="login-name-input"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Cynthia N."
                      className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span>Email Address</span>
                  </label>
                  <input
                    id="login-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Password Field */}
                {mode !== 'forgot' && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>Password</span>
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          id="forgot-password-link"
                          onClick={() => {
                            setMode('forgot');
                            setError('');
                            setSuccessMessage('');
                          }}
                          className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <input
                        id="login-password-input"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-9 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Confirm Password for Sign Up */}
                {mode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>Confirm Password</span>
                    </label>
                    <input
                      id="login-confirm-password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                )}

                {/* Remember Me Checkbox */}
                {mode === 'login' && (
                  <div className="flex items-center gap-2 pt-0.5">
                    <input
                      id="remember-me-checkbox"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me-checkbox" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                      Remember me on this browser
                    </label>
                  </div>
                )}

                {/* Action Submit Button */}
                <button
                  id="login-submit-btn"
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>
                        {mode === 'login' && 'Sign In to Eventful'}
                        {mode === 'signup' && 'Create Account'}
                        {mode === 'forgot' && 'Send Reset Link'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Forgot Mode Switch Back */}
              {mode === 'forgot' && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError('');
                      setSuccessMessage('');
                    }}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    ← Return to Sign In
                  </button>
                </div>
              )}

              {/* Alternative Divider & Social Logins */}
              {mode !== 'forgot' && (
                <div className="pt-2 space-y-3">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                    </div>
                    <span className="relative px-2 bg-white dark:bg-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Or continue with
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      id="social-google-btn"
                      onClick={() => handleQuickDemoLogin('attendee')}
                      className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      <Chrome className="w-3.5 h-3.5 text-red-500" />
                      <span>Google</span>
                    </button>

                    <button
                      type="button"
                      id="social-github-btn"
                      onClick={() => handleQuickDemoLogin('attendee')}
                      className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" />
                      <span>GitHub</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Card Footer */}
            <div className="p-4 bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>256-Bit SSL Encrypted & Verified Event Ticketing</span>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Simple Footer */}
      <footer className="w-full py-3 border-t border-slate-200 dark:border-slate-800 text-center text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
        © {new Date().getFullYear()} EVENTFUL Ticketing Systems. All rights reserved.
      </footer>

    </div>
  );
}
