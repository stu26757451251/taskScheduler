"use client";

import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "reminder" | "warning" | "success" | "info";
  title: string;
  description: string;
  timestamp: string;
  newbieName?: string;
  read: boolean;
}

interface AlertsSidebarProps {
  alerts: Alert[];
}

const ALERT_ICONS: Record<Alert["type"], React.ElementType> = {
  reminder: Calendar,
  warning: AlertTriangle,
  success: CheckCircle2,
  info: MessageSquare,
};

const ALERT_STYLES: Record<
  Alert["type"],
  { icon: string; bg: string; border: string }
> = {
  reminder: {
    icon: "text-primary",
    bg: "bg-primary/5",
    border: "border-l-primary",
  },
  warning: {
    icon: "text-amber-500",
    bg: "bg-amber-500/5",
    border: "border-l-amber-500",
  },
  success: {
    icon: "text-emerald-500",
    bg: "bg-emerald-500/5",
    border: "border-l-emerald-500",
  },
  info: {
    icon: "text-sky-500",
    bg: "bg-sky-500/5",
    border: "border-l-sky-500",
  },
};

export function AlertsSidebar({ alerts: initialAlerts }: AlertsSidebarProps) {
  const [alerts, setAlerts] = useState(initialAlerts);
  const unreadCount = alerts.filter((a) => !a.read).length;

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const markAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a))
    );
  };

  return (
    <Card className="h-fit border bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">
              Timeline & Alerts
            </CardTitle>
          </div>
          {unreadCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pt-0">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <CheckCircle2 className="size-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              All caught up! No new alerts.
            </p>
          </div>
        ) : (
          alerts.map((alert) => {
            const Icon = ALERT_ICONS[alert.type];
            const style = ALERT_STYLES[alert.type];

            return (
              <div
                key={alert.id}
                className={cn(
                  "group relative rounded-md border-l-2 p-3 transition-all duration-200",
                  style.bg,
                  style.border,
                  !alert.read && "ring-1 ring-primary/10"
                )}
                onClick={() => markAsRead(alert.id)}
              >
                {/* Dismiss button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissAlert(alert.id);
                  }}
                  className="absolute right-1 top-1 h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="size-3" />
                  <span className="sr-only">Dismiss</span>
                </Button>

                <div className="flex gap-3">
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full",
                      style.bg
                    )}
                  >
                    <Icon className={cn("size-4", style.icon)} />
                  </div>

                  <div className="flex flex-col gap-1 pr-4">
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {alert.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {alert.description}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="size-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Unread indicator */}
                {!alert.read && (
                  <div className="absolute right-3 top-3 size-2 rounded-full bg-primary" />
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
