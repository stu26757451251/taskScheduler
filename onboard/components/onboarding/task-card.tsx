"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  GitBranch,
  ShieldCheck,
  Database,
  Layers,
  TestTube,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export type TaskStatus = "todo" | "inprogress" | "done" | "blocked";

interface SubTask {
  id: string;
  label: string;
  icon: React.ElementType;
  done: boolean;
}

const STATUS_META: Record<
  TaskStatus,
  { label: string; icon: React.ElementType; color: string; ring: string; bg: string }
> = {
  todo: {
    label: "To Do",
    icon: Circle,
    color: "text-muted-foreground",
    ring: "ring-border",
    bg: "bg-secondary",
  },
  inprogress: {
    label: "In Progress",
    icon: Clock,
    color: "text-blue-500",
    ring: "ring-blue-200",
    bg: "bg-blue-50",
  },
  done: {
    label: "Done",
    icon: CheckCircle2,
    color: "text-emerald-500",
    ring: "ring-emerald-200",
    bg: "bg-emerald-50",
  },
  blocked: {
    label: "Blocked",
    icon: AlertCircle,
    color: "text-destructive",
    ring: "ring-red-200",
    bg: "bg-red-50",
  },
};

const INITIAL_SUBTASKS: SubTask[] = [
  { id: "cicd", label: "CI/CD Pipeline Setup", icon: GitBranch, done: false },
  { id: "auth", label: "Auth Integration (OAuth + JWT)", icon: ShieldCheck, done: true },
  { id: "db", label: "Database Schema & Migrations", icon: Database, done: false },
  { id: "api", label: "API Layer & Route Design", icon: Layers, done: false },
  { id: "tests", label: "Unit & Integration Tests", icon: TestTube, done: false },
  { id: "docs", label: "README & Documentation", icon: FileText, done: false },
];

const STATUS_ORDER: TaskStatus[] = ["todo", "inprogress", "done", "blocked"];

export function TaskCard() {
  const [status, setStatus] = useState<TaskStatus>("inprogress");
  const [expanded, setExpanded] = useState(true);
  const [subtasks, setSubtasks] = useState<SubTask[]>(INITIAL_SUBTASKS);

  const doneCount = subtasks.filter((s) => s.done).length;
  const progress = Math.round((doneCount / subtasks.length) * 100);

  const toggleSubtask = (id: string) => {
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  // Pre-compute current status meta (used for aria or future use)
  const _currentMeta = STATUS_META[status];

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Task Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                60-Day Challenge
              </span>
            </div>
            <h3 className="text-base font-semibold text-foreground text-balance">
              60-Day Personal Project
            </h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Build a full-stack feature end-to-end — from database schema to deployed UI — to get familiar with the codebase.
            </p>
          </div>

          {/* Mini sub-task progress ring */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 44 44" className="-rotate-90 w-12 h-12" aria-hidden="true">
                <circle cx="22" cy="22" r="16" fill="none" stroke="currentColor" strokeWidth="5" className="text-border" />
                <circle
                  cx="22" cy="22" r="16" fill="none" stroke="currentColor" strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 16}`}
                  strokeDashoffset={`${2 * Math.PI * 16 * (1 - progress / 100)}`}
                  className="text-primary transition-[stroke-dashoffset] duration-700 ease-out"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground">
                {progress}%
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{doneCount}/{subtasks.length} done</span>
          </div>
        </div>

        {/* Status badges row */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium">Status:</span>
          {STATUS_ORDER.map((s) => {
            const meta = STATUS_META[s];
            const Icon = meta.icon;
            const active = s === status;
            return (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200",
                  active
                    ? cn(meta.bg, meta.color, "border-current ring-1", meta.ring, "shadow-sm scale-105")
                    : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                )}
                aria-pressed={active}
              >
                <Icon className="w-3 h-3" />
                {meta.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-tasks accordion */}
      <div className="border-t border-border">
        <button
          className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors duration-150"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <span className="flex items-center gap-2">
            Sub-tasks
            <span className="text-xs font-normal text-muted-foreground">
              ({doneCount} of {subtasks.length} completed)
            </span>
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {/* Animated expand/collapse */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <ul className="px-5 pb-4 flex flex-col gap-2" role="list">
            {subtasks.map((subtask) => {
              const Icon = subtask.icon;
              return (
                <li
                  key={subtask.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 group cursor-pointer",
                    subtask.done
                      ? "bg-emerald-50 border-emerald-100"
                      : "bg-secondary/50 border-border hover:bg-secondary hover:border-border/80"
                  )}
                  onClick={() => toggleSubtask(subtask.id)}
                >
                  <Checkbox
                    id={subtask.id}
                    checked={subtask.done}
                    onCheckedChange={() => toggleSubtask(subtask.id)}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "transition-all duration-200",
                      subtask.done
                        ? "border-emerald-400 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                        : ""
                    )}
                    aria-label={`Mark "${subtask.label}" as complete`}
                  />
                  <Icon
                    className={cn(
                      "w-4 h-4 flex-shrink-0 transition-colors duration-200",
                      subtask.done ? "text-emerald-500" : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm flex-1 transition-all duration-200 cursor-pointer select-none",
                      subtask.done
                        ? "line-through text-muted-foreground"
                        : "text-foreground font-medium"
                    )}
                  >
                    {subtask.label}
                  </span>
                  {subtask.done && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
