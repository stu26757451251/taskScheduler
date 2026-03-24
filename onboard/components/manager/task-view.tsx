"use client";

import { ChevronRight, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  version: "v2-latest" | "v1.5-stable" | "v1-legacy";
  assignedCount: number;
  completedCount: number;
  avgCompletionDays: number;
  assignees: Array<{
    id: string;
    name: string;
    avatar?: string;
    progress: number;
  }>;
}

interface TaskViewProps {
  tasks: TaskTemplate[];
}

const VERSION_STYLES: Record<
  TaskTemplate["version"],
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

export function TaskView({ tasks }: TaskViewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => {
        const versionStyle = VERSION_STYLES[task.version];
        const completionRate =
          task.assignedCount > 0
            ? Math.round((task.completedCount / task.assignedCount) * 100)
            : 0;

        return (
          <Card
            key={task.id}
            className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:ring-1 hover:ring-primary/20"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground leading-tight">
                      {task.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] font-semibold border shrink-0",
                        versionStyle.bg,
                        versionStyle.text
                      )}
                    >
                      {versionStyle.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {task.description}
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Stats row */}
              <div className="mb-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Users className="size-3.5 text-muted-foreground" />
                  <span className="text-foreground font-medium">
                    {task.assignedCount}
                  </span>
                  <span className="text-muted-foreground">assigned</span>
                </div>
                <span className="text-border">|</span>
                <div>
                  <span className="text-foreground font-medium">
                    {task.avgCompletionDays}
                  </span>
                  <span className="text-muted-foreground"> avg days</span>
                </div>
              </div>

              {/* Completion progress */}
              <div className="mb-4">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-medium text-foreground">
                    {completionRate}%
                  </span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>

              {/* Assignees avatars */}
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {task.assignees.slice(0, 5).map((assignee) => (
                    <Avatar
                      key={assignee.id}
                      className="size-7 border-2 border-background ring-0"
                    >
                      <AvatarImage src={assignee.avatar} alt={assignee.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-medium">
                        {assignee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {task.assignees.length > 5 && (
                    <div className="flex size-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium text-muted-foreground">
                      +{task.assignees.length - 5}
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {task.completedCount} completed
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
