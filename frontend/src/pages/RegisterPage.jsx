import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Ticket, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/InputField";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/events");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors w-fit">
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto space-y-8">
        <div className="space-y-2">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-md shadow-primary/20">
            <Ticket className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Create account</h1>
          <p className="text-sm text-muted-foreground">Join Eventful and start exploring events</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
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
            required
          />
          <InputField
            label="Confirm Password"
            icon={Lock}
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error}
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25"
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-primary font-semibold hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}