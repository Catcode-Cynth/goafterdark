import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import RoleCard from "@/components/ui/RoleCard";

export default function RoleSelect() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (role === "attendee") navigate("/events");
    else if (role === "creator") navigate("/creator");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm space-y-10">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
            <Ticket className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
            GoAfterDark
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
           How would you like to use GoAfterDark?
          </p>
        </div>

        <div className="space-y-3">
          <RoleCard
            icon={<Sparkles className="w-5 h-5" />}
            title="Attendee"
            description="Discover events, buy tickets, and enjoy experiences"
            selected={role === "attendee"}
            onClick={() => setRole("attendee")}
          />
          <RoleCard
            icon={<Ticket className="w-5 h-5" />}
            title="Creator"
            description="Create events, sell tickets, and grow your audience"
            selected={role === "creator"}
            onClick={() => setRole("creator")}
          />
        </div>

        <Button
          onClick={handleContinue}
          disabled={!role}
          className="w-full h-12 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25 disabled:opacity-40 disabled:shadow-none"
        >
          Continue
        </Button>

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