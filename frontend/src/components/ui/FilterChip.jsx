import React from "react";

export default function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
      }`}
    >
      {label}
    </button>
  );
}