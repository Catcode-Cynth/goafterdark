import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Ticket,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { registerRequest, setToken } from "../lib/api";

export interface SignUpPageProps {
  onBack?: () => void;
  onSignIn?: () => void;
  onRegisterSuccess?: (user: { name: string; email: string }) => void;
  onNavigate?: (path: string) => void;
}

interface InputFieldProps {
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  showTogglePassword?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
}

function InputField({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
  showTogglePassword,
  isPasswordVisible,
  onTogglePassword,
}: InputFieldProps) {
  const actualType = showTogglePassword
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Icon className="h-4 w-4 text-[#FF1E83]" aria-hidden="true" />
        </div>
        <input
          type={actualType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full rounded-2xl border ${
            error ? "border-rose-500 ring-1 ring-rose-500" : "border-[#2A1E38]"
          } bg-[#0B0714] py-3.5 pl-11 ${
            showTogglePassword ? "pr-11" : "pr-4"
          } text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none focus:ring-2 focus:ring-[#FF1E83]/30 transition shadow-xs`}
        />
        {showTogglePassword && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#C8BDD4] hover:text-[#FF1E83] transition cursor-pointer"
          >
            {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && <p className="text-[11px] font-semibold text-rose-400 pl-1">{error}</p>}
    </div>
  );
}

export default function SignUpPage({
  onBack,
  onSignIn,
  onRegisterSuccess,
  onNavigate,
}: SignUpPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"CREATOR" | "EVENTEE">("EVENTEE");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!name.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const parts = name.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ") || undefined;

    setLoading(true);
    try {
      const data = await registerRequest({
        email,
        password,
        firstName,
        lastName,
        role,
      });
      const token = data.access_token || data.accessToken || data.token;
      if (token) setToken(token);

      setSuccessMessage("Account created successfully!");
      onRegisterSuccess?.({
        name: data.user?.name || name,
        email: data.user?.email || email,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    if (onBack) onBack();
    else if (onNavigate) onNavigate("/");
  };

  const handleSignInClick = () => {
    if (onSignIn) onSignIn();
    else if (onNavigate) onNavigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0B0714] text-[#F5F0FF] flex flex-col justify-start items-center px-4 pt-8 sm:pt-14 pb-36 relative overflow-y-auto font-sans selection:bg-[#FF1E83] selection:text-white">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FF1E83]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#9333EA]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm flex items-center justify-between mb-6 z-20">
        <button
          type="button"
          onClick={handleBackClick}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161022] border border-[#2A1E38] text-xs font-bold text-[#C8BDD4] hover:text-white hover:border-[#FF1E83] transition shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF1E83]">
          GoAfterDark • Join
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto space-y-6 relative z-10 my-auto">
        <div className="space-y-2 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#FF5364] flex items-center justify-center mb-4 shadow-xl shadow-[#FF1E83]/25 mx-auto sm:mx-0">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#FF1E83]">
            <Flame className="h-3 w-3 fill-[#FF1E83]" />
            <span>Nightlife Community</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5F0FF]">
            Create account
          </h1>
          <p className="text-xs sm:text-sm text-[#C8BDD4]">
            Join GoAfterDark and start exploring events
          </p>
        </div>

        <div className="bg-[#161022] rounded-3xl p-6 sm:p-7 border border-[#2A1E38] shadow-2xl space-y-4">
          {error && (
            <div className="p-3 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold animate-in fade-in">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3.5">
            <InputField
              label="Full Name"
              icon={User}
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <InputField
              label="Email"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <InputField
              label="Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showTogglePassword
              isPasswordVisible={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              required
            />

            <InputField
              label="Confirm Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showTogglePassword
              isPasswordVisible={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              error={
                password && confirmPassword && password !== confirmPassword
                  ? "Passwords don't match"
                  : undefined
              }
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
                Account type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("EVENTEE")}
                  className={`rounded-2xl border py-2.5 text-xs font-bold ${
                    role === "EVENTEE"
                      ? "border-[#FF1E83] bg-[#FF1E83] text-white"
                      : "border-[#2A1E38] bg-[#0B0714] text-[#C8BDD4]"
                  }`}
                >
                  Attendee
                </button>
                <button
                  type="button"
                  onClick={() => setRole("CREATOR")}
                  className={`rounded-2xl border py-2.5 text-xs font-bold ${
                    role === "CREATOR"
                      ? "border-[#FF1E83] bg-[#FF1E83] text-white"
                      : "border-[#2A1E38] bg-[#0B0714] text-[#C8BDD4]"
                  }`}
                >
                  Creator
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] hover:from-[#FF0070] hover:to-[#FF1E83] font-black text-sm text-white shadow-xl shadow-[#FF1E83]/30 flex items-center justify-center gap-2 transition hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}