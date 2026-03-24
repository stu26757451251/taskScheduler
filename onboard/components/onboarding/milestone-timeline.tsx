"use client";

import { Milestone, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MilestoneItem {
  label: string;
  days: string;
  done: boolean;
  active?: boolean;
}

const MILESTONES: MilestoneItem[] = [
  { label: "Day 1 Orientation", days: "Day 1–2", done: true },
  { label: "Team Introductions", days: "Day 3–7", done: true },
  { label: "Dev Env & Tooling", days: "Day 7–14", done: false, active: true },
  { label: "First Feature Shipped", days: "Day 15–30", done: false },
  { label: "60-Day Project", days: "Day 31–60", done: false },
  { label: "Full Ramp Complete", days: "Day 90", done: false },
];

export function MilestoneTimeline() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-center gap-2 mb-5">
        <Milestone className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Onboarding Milestones</h3>
      </div>

      <ol className="relative border-l border-border ml-2 flex flex-col gap-0" aria-label="Onboarding milestones">
        {MILESTONES.map((m, i) => (
          <li key={i} className="mb-4 last:mb-0 ml-4">
            <span
              className={cn(
                "absolute -left-[7px] w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center",
                m.done
                  ? "bg-emerald-500 border-emerald-500"
                  : m.active
                  ? "bg-card border-primary ring-2 ring-primary/30"
                  : "bg-card border-border"
              )}
              aria-hidden="true"
            />
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "text-sm font-medium leading-relaxed",
                  m.done
                    ? "text-muted-foreground line-through"
                    : m.active
                    ? "text-primary font-semibold"
                    : "text-foreground"
                )}
              >
                {m.label}
              </span>
              {m.done ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" aria-label="completed" />
              ) : m.active ? (
                <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                  Active
                </span>
              ) : (
                <Circle className="w-3.5 h-3.5 text-border flex-shrink-0" aria-label="not started" />
              )}
            </div>
            <time className="text-xs text-muted-foreground">{m.days}</time>
          </li>
        ))}
      </ol>
    </div>
  );
}
