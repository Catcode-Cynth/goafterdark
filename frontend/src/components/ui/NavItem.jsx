import React from "react";
import { Link } from "react-router-dom";

export default function NavItem({ icon: Icon, label, path, active }) {
  return (
    <Link
      to={path}
      className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[10px] font-medium">{label}</span>
    </Link>
  );
}