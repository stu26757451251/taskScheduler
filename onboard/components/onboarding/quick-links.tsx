"use client";

import {
  BookOpen,
  Users,
  Laptop,
  MessageSquare,
  Zap,
  Coffee,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickLinkItem {
  label: string;
  icon: React.ElementType;
  href: string;
  color: string;
  bgColor: string;
}

const QUICK_LINKS: QuickLinkItem[] = [
  { label: "Handbook", icon: BookOpen, href: "#", color: "text-primary", bgColor: "bg-primary/10" },
  { label: "Team Directory", icon: Users, href: "#", color: "text-violet-600", bgColor: "bg-violet-100" },
  { label: "Dev Setup", icon: Laptop, href: "#", color: "text-sky-600", bgColor: "bg-sky-100" },
  { label: "Slack Tips", icon: MessageSquare, href: "#", color: "text-emerald-600", bgColor: "bg-emerald-100" },
  { label: "Learning Hub", icon: Zap, href: "#", color: "text-amber-600", bgColor: "bg-amber-100" },
  { label: "Culture & Vibe", icon: Coffee, href: "#", color: "text-rose-500", bgColor: "bg-rose-100" },
];

export function QuickLinks() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Quick Links</h3>
      <div className="grid grid-cols-3 gap-3">
        {QUICK_LINKS.map(({ label, icon: Icon, href, color, bgColor }) => (
          <a
            key={label}
            href={href}
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-secondary transition-colors duration-150 group"
          >
            <span className={cn("w-9 h-9 rounded-xl flex items-center justify-center", bgColor)}>
              <Icon className={cn("w-4 h-4", color)} />
            </span>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors font-medium text-center leading-tight">
              {label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
