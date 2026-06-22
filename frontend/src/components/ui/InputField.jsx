import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputField({ label, icon: Icon, error, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <Label className="text-sm font-medium text-foreground">{label}</Label>}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
        )}
        <Input
          className={`h-12 rounded-xl bg-secondary border-0 font-body text-sm placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/30 ${
            Icon ? "pl-11" : "pl-4"
          } ${error ? "ring-2 ring-destructive/30" : ""}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}