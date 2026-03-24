"use client";

import { CalendarDays, Target, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

function StatCard({ label, value, sub, icon: Icon, iconColor, iconBg }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-4 flex items-center gap-4">
      <span className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}>
        <Icon className={cn("w-5 h-5", iconColor)} />
      </span>
      <div className="min-w-0">
        <div className="text-xl font-bold text-foreground leading-none">{value}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
        {sub && <div className="text-xs text-muted-foreground/70 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

export function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <StatCard
        label="Days Since Joined"
        value="Day 14"
        sub="of 90-day ramp"
        icon={CalendarDays}
        iconColor="text-primary"
        iconBg="bg-primary/10"
      />
      <StatCard
        label="Tasks Completed"
        value="8 / 22"
        sub="this month"
        icon={Target}
        iconColor="text-emerald-600"
        iconBg="bg-emerald-100"
      />
      <StatCard
        label="Week Streak"
        value="3 weeks"
        sub="keep it up!"
        icon={Flame}
        iconColor="text-accent"
        iconBg="bg-accent/10"
      />
    </div>
  );
}
