import React from "react";

export default function RoleCard({ icon, title, description, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
        selected
          ? "border-primary bg-accent shadow-lg shadow-primary/10"
          : "border-border bg-card hover:border-primary/40 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
          selected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
        }`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-base text-card-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  );
}