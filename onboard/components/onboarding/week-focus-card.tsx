"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Circle, AlertCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type WeekTaskStatus = "todo" | "inprogress" | "done" | "blocked";

interface WeekTask {
  id: string;
  label: string;
  due: string;
  status: WeekTaskStatus;
  priority: "high" | "medium" | "low";
  description?: string;
}

const STATUS_STYLE: Record<WeekTaskStatus, { icon: React.ElementType; label: string; color: string; dot: string }> = {
  todo: { icon: Circle, label: "To Do", color: "text-muted-foreground", dot: "bg-muted-foreground" },
  inprogress: { icon: Clock, label: "In Progress", color: "text-blue-500", dot: "bg-blue-500" },
  done: { icon: CheckCircle2, label: "Done", color: "text-emerald-500", dot: "bg-emerald-500" },
  blocked: { icon: AlertCircle, label: "Blocked", color: "text-destructive", dot: "bg-destructive" },
};

const PRIORITY_BADGE: Record<"high" | "medium" | "low", string> = {
  high: "bg-red-100 text-red-600",
  medium: "bg-amber-100 text-amber-600",
  low: "bg-secondary text-muted-foreground",
};

const INITIAL_WEEK_TASKS: WeekTask[] = [
  { id: "wt1", label: "Complete team onboarding forms", due: "Mon", status: "done", priority: "high", description: "Fill out the HR portal forms, setup direct deposit, and read through the company handbook." },
  { id: "wt2", label: "Set up local dev environment", due: "Tue", status: "done", priority: "high", description: "Install Node.js, Docker, configure IDE settings, and clone the main repository." },
  { id: "wt3", label: "Review architecture docs", due: "Wed", status: "inprogress", priority: "medium", description: "Read the C4 model diagrams and understand the microservices communication patterns." },
  { id: "wt4", label: "1:1 with your engineering lead", due: "Thu", status: "todo", priority: "high", description: "Discuss quarterly goals, preferred working styles, and set expectations." },
  { id: "wt5", label: "Submit first PR (small bug fix)", due: "Fri", status: "todo", priority: "medium", description: "Pick up a 'good first issue' from the backlog, fix it, and submit a pull request." },
];

export function WeekFocusCard() {
  const [tasks, setTasks] = useState<WeekTask[]>(INITIAL_WEEK_TASKS);
  const [selectedTask, setSelectedTask] = useState<WeekTask | null>(null);

  const cycleStatus = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const order: WeekTaskStatus[] = ["todo", "inprogress", "done", "blocked"];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next = order[(order.indexOf(t.status) + 1) % order.length];
        const updatedTask = { ...t, status: next };
        // Sync selected task if open
        if (selectedTask?.id === id) {
          setSelectedTask(updatedTask);
        }
        return updatedTask;
      })
    );
  };

  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <>
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Header strip */}
        <div className="bg-primary px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-primary-foreground/70 font-medium uppercase tracking-wide mb-0.5">
              This Week's Focus
            </p>
            <h2 className="text-base font-semibold text-primary-foreground">
              Week 2 — Get Your First Commit In
            </h2>
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="text-2xl font-bold text-primary-foreground">{doneCount}</span>
            <span className="text-primary-foreground/60 text-sm">/{tasks.length}</span>
            <p className="text-[10px] text-primary-foreground/60">tasks done</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-primary/20">
          <div
            className="h-full bg-accent transition-all duration-700 ease-out rounded-full"
            style={{ width: `${(doneCount / tasks.length) * 100}%` }}
          />
        </div>

        {/* Task list */}
        <ul className="divide-y divide-border" role="list">
          {tasks.map((task) => {
            const { icon: Icon, label: statusLabel, color } = STATUS_STYLE[task.status];
            return (
              <li 
                key={task.id} 
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-secondary/40 transition-colors duration-100 cursor-pointer"
                onClick={() => setSelectedTask(task)}
              >
                {/* Status toggle button */}
                <button
                  onClick={(e) => cycleStatus(task.id, e)}
                  className={cn("flex-shrink-0 transition-transform duration-150 active:scale-90", color)}
                  aria-label={`Status: ${statusLabel}. Click to cycle.`}
                  title={`Status: ${statusLabel}`}
                >
                  <Icon className="w-5 h-5" />
                </button>

                {/* Task label */}
                <span
                  className={cn(
                    "flex-1 text-sm leading-relaxed",
                    task.status === "done"
                      ? "line-through text-muted-foreground"
                      : "text-foreground font-medium"
                  )}
                >
                  {task.label}
                </span>

                {/* Right meta */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={cn("text-xs font-medium px-2 py-0.5 rounded-full capitalize", PRIORITY_BADGE[task.priority])}
                  >
                    {task.priority}
                  </span>
                  <span className="text-xs text-muted-foreground w-7 text-center font-medium">
                    {task.due}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Notion-like Side Panel */}
      <Sheet open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
        <SheetContent className="sm:max-w-md w-full p-0 flex flex-col gap-0 border-l border-border outline-none">
          {selectedTask && (() => {
            const { icon: StatusIcon, label: statusLabel, color: statusColor } = STATUS_STYLE[selectedTask.status];
            return (
              <>
                <SheetHeader className="px-6 py-6 border-b border-border/50 text-left space-y-0">
                  <SheetTitle className="text-2xl font-semibold leading-tight pt-4 text-foreground/90">
                    {selectedTask.label}
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Task details for {selectedTask.label}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 bg-card/50">
                  {/* Properties section (Notion-style) */}
                  <div className="space-y-5">
                    {/* Status */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="w-24 text-muted-foreground shrink-0 flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        Status
                      </div>
                      <button 
                        onClick={() => cycleStatus(selectedTask.id)}
                        className="flex items-center gap-2 px-2.5 py-1 -ml-2.5 rounded-md hover:bg-secondary/80 transition-colors"
                      >
                        <StatusIcon className={cn("w-4 h-4", statusColor)} />
                        <span className="font-medium text-foreground">{statusLabel}</span>
                      </button>
                    </div>

                    {/* Due Date */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="w-24 text-muted-foreground shrink-0 flex items-center gap-2 font-medium">
                        <Calendar className="w-4 h-4" />
                        Due
                      </div>
                      <div className="font-medium text-foreground">
                        {selectedTask.due}
                      </div>
                    </div>

                    {/* Priority */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="w-24 text-muted-foreground shrink-0 flex items-center gap-2 font-medium">
                        <AlertCircle className="w-4 h-4" />
                        Priority
                      </div>
                      <div className={cn("px-2.5 py-0.5 rounded-md text-[11px] font-medium uppercase tracking-wider w-fit", PRIORITY_BADGE[selectedTask.priority])}>
                        {selectedTask.priority}
                      </div>
                    </div>
                  </div>

                  <hr className="border-border/60" />

                  {/* Description / Content */}
                  <div className="space-y-3">
                    <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedTask.description || "No description provided."}
                    </p>
                  </div>
                </div>
              </>
            );
          })()}
        </SheetContent>
      </Sheet>
    </>
  );
}
