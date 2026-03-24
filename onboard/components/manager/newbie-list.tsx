"use client";

import { useState } from "react";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Newbie {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  mentor: string;
  cohort: string;
  progress: number;
  status: "on-track" | "at-risk" | "behind" | "completed";
  currentTask: string;
  taskVersion: "v2-latest" | "v1-legacy" | "v1.5-stable";
  daysJoined: number;
}

interface NewbieListProps {
  newbies: Newbie[];
  onAssignTemplate: (newbie: Newbie) => void;
}

const STATUS_STYLES: Record<
  Newbie["status"],
  { bg: string; text: string; label: string }
> = {
  "on-track": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
    label: "On Track",
  },
  "at-risk": {
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    label: "At Risk",
  },
  behind: {
    bg: "bg-red-500/10",
    text: "text-red-600",
    label: "Behind",
  },
  completed: {
    bg: "bg-primary/10",
    text: "text-primary",
    label: "Completed",
  },
};

const VERSION_STYLES: Record<
  Newbie["taskVersion"],
  { bg: string; text: string; label: string }
> = {
  "v2-latest": {
    bg: "bg-emerald-500/10 border-emerald-500/20",
    text: "text-emerald-700",
    label: "v2 Latest",
  },
  "v1.5-stable": {
    bg: "bg-sky-500/10 border-sky-500/20",
    text: "text-sky-700",
    label: "v1.5 Stable",
  },
  "v1-legacy": {
    bg: "bg-muted border-border",
    text: "text-muted-foreground",
    label: "v1 Legacy",
  },
};

export function NewbieList({ newbies, onAssignTemplate }: NewbieListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {newbies.map((newbie) => {
        const statusStyle = STATUS_STYLES[newbie.status];
        const versionStyle = VERSION_STYLES[newbie.taskVersion];

        return (
          <Card
            key={newbie.id}
            className={cn(
              "group relative overflow-hidden border bg-card p-4 transition-all duration-200 hover:shadow-md",
              hoveredId === newbie.id && "ring-1 ring-primary/20"
            )}
            onMouseEnter={() => setHoveredId(newbie.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-4">
                <Avatar className="size-10 border-2 border-background shadow-sm">
                  <AvatarImage src={newbie.avatar} alt={newbie.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {newbie.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {newbie.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-wide",
                        statusStyle.bg,
                        statusStyle.text
                      )}
                    >
                      {statusStyle.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Mentor: {newbie.mentor}</span>
                    <span className="text-border">|</span>
                    <span>{newbie.cohort}</span>
                    <span className="text-border">|</span>
                    <span>Day {newbie.daysJoined}</span>
                  </div>
                </div>
              </div>

              {/* Right: Progress + Task + Actions */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                {/* Current Task with Version Badge */}
                <div className="flex items-center gap-2">
                  <span className="max-w-[180px] truncate text-sm text-foreground">
                    {newbie.currentTask}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] font-semibold border",
                      versionStyle.bg,
                      versionStyle.text
                    )}
                  >
                    {versionStyle.label}
                  </Badge>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div className="w-24">
                    <Progress value={newbie.progress} className="h-2" />
                  </div>
                  <span className="w-10 text-right text-sm font-medium text-foreground">
                    {newbie.progress}%
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAssignTemplate(newbie)}
                    className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <UserPlus className="size-4" />
                    <span className="hidden lg:inline">Assign</span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Check-in</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove from Program
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
