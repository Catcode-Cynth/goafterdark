import React from "react";
import { useLocation } from "react-router-dom";
import { LayoutDashboard, Plus, BarChart3, User } from "lucide-react";
import NavItem from "@/components/ui/NavItem";

const creatorNav = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/creator" },
  { icon: Plus, label: "Create", path: "/creator/create" },
  { icon: BarChart3, label: "Analytics", path: "/creator/analytics" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-4">
        {creatorNav.map((item) => (
          <NavItem
            key={item.path}
            {...item}
            active={pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path))}
          />
        ))}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}