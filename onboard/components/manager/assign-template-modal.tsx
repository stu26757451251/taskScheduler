"use client";

import { Check, FileText } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Newbie } from "./newbie-list";

interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  version: "v2-latest" | "v1.5-stable" | "v1-legacy";
  estimatedDays: number;
  taskCount: number;
}

interface AssignTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newbie: Newbie | null;
  onAssign: (templateId: string) => void;
}

const TEMPLATES: TaskTemplate[] = [
  {
    id: "1",
    name: "60-Day Personal Project",
    description:
      "Full-stack project with CI/CD setup, authentication, and deployment",
    version: "v2-latest",
    estimatedDays: 60,
    taskCount: 12,
  },
  {
    id: "2",
    name: "30-Day Fundamentals",
    description: "Core platform training covering essential tools and workflows",
    version: "v2-latest",
    estimatedDays: 30,
    taskCount: 8,
  },
  {
    id: "3",
    name: "Engineering Bootcamp",
    description: "Intensive technical onboarding with pair programming sessions",
    version: "v1.5-stable",
    estimatedDays: 45,
    taskCount: 15,
  },
  {
    id: "4",
    name: "Legacy Onboarding",
    description: "Previous version of onboarding program (being phased out)",
    version: "v1-legacy",
    estimatedDays: 90,
    taskCount: 20,
  },
];

const VERSION_STYLES: Record<
  TaskTemplate["version"],
  { bg: string; text: string; label: string; recommended?: boolean }
> = {
  "v2-latest": {
    bg: "bg-emerald-500/10 border-emerald-500/20",
    text: "text-emerald-700",
    label: "v2 Latest",
    recommended: true,
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

export function AssignTemplateModal({
  open,
  onOpenChange,
  newbie,
  onAssign,
}: AssignTemplateModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssign = async () => {
    if (!selectedId) return;
    setIsAssigning(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 500));
    onAssign(selectedId);
    setIsAssigning(false);
    setSelectedId(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Assign Task Template</DialogTitle>
          <DialogDescription>
            {newbie
              ? `Select a task template to assign to ${newbie.name}.`
              : "Select a task template to assign."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 py-4">
          {TEMPLATES.map((template) => {
            const versionStyle = VERSION_STYLES[template.version];
            const isSelected = selectedId === template.id;

            return (
              <button
                key={template.id}
                type="button"
                onClick={() => setSelectedId(template.id)}
                className={cn(
                  "group relative flex flex-col gap-2 rounded-lg border p-4 text-left transition-all duration-200",
                  "hover:border-primary/30 hover:bg-primary/5",
                  isSelected &&
                    "border-primary bg-primary/5 ring-1 ring-primary/20"
                )}
              >
                {/* Selected checkmark */}
                {isSelected && (
                  <div className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary">
                    <Check className="size-3 text-primary-foreground" />
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="size-4 text-primary" />
                  </div>

                  <div className="flex flex-col gap-1 pr-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {template.name}
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
                      {versionStyle.recommended && (
                        <Badge
                          variant="default"
                          className="text-[10px] bg-primary/90"
                        >
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{template.estimatedDays} days</span>
                      <span className="text-border">|</span>
                      <span>{template.taskCount} tasks</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedId || isAssigning}
            className="min-w-[100px]"
          >
            {isAssigning ? "Assigning..." : "Assign Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
