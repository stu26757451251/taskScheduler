"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Settings, Sparkles, Users } from "lucide-react";
import { CircularProgress } from "./circular-progress";

interface DashboardHeaderProps {
  name: string;
  role: string;
  avatarInitials: string;
  overallProgress: number;
}

function getGreeting() {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

export function DashboardHeader({ name, role, avatarInitials, overallProgress }: DashboardHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setMounted(true);
    setGreeting(getGreeting());
  }, []);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground text-sm hidden sm:block">Onboard</span>
        </div>

        {/* Greeting — fills space */}
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-foreground truncate">
            {mounted ? greeting : "Welcome"}, <span className="text-primary">{name}</span> 👋
          </h1>
          <p className="text-xs text-muted-foreground truncate hidden sm:block">{role}</p>
        </div>

        {/* Overall progress */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs font-semibold text-foreground">Overall Progress</span>
            <span className="text-[11px] text-muted-foreground">Onboarding completion</span>
          </div>
          <CircularProgress value={overallProgress} size={64} strokeWidth={6} label="done" />
        </div>

        {/* Nav icons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <Link 
            href="/manager" 
            className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors" 
            aria-label="Manager Dashboard"
            title="Switch to Manager Dashboard"
          >
            <Users className="w-4 h-4 text-muted-foreground" />
          </Link>
          <button className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors relative" aria-label="Notifications">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" aria-label="unread notifications" />
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors" aria-label="Settings">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold ml-1 cursor-pointer hover:opacity-90 transition-opacity" aria-label={`Profile: ${name}`}>
            {avatarInitials}
          </div>
        </div>
      </div>
    </header>
  );
}
