import { DashboardHeader } from "@/components/onboarding/dashboard-header";
import { StatsRow } from "@/components/onboarding/stats-row";
import { WeekFocusCard } from "@/components/onboarding/week-focus-card";
import { TaskCard } from "@/components/onboarding/task-card";
import { MilestoneTimeline } from "@/components/onboarding/milestone-timeline";
import { QuickLinks } from "@/components/onboarding/quick-links";

export default function OnboardingDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <DashboardHeader
        name="Alex Chen"
        role="Software Engineer · Engineering Team"
        avatarInitials="AC"
        overallProgress={32}
      />

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">

        {/* Welcome banner */}
        <div className="rounded-2xl bg-primary px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <p className="text-primary-foreground/70 text-xs font-medium uppercase tracking-wide mb-1">
              Week 2 of 13
            </p>
            <h2 className="text-xl font-bold text-primary-foreground text-balance leading-snug">
              You're doing great, Alex! 🚀
            </h2>
            <p className="text-sm text-primary-foreground/75 mt-1 leading-relaxed max-w-md">
              You've completed your setup and met the team. This week, focus on your first code contribution.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-1 bg-white/10 rounded-2xl px-5 py-3 self-start sm:self-auto">
            <span className="text-primary-foreground/70 text-xs font-medium">Next milestone</span>
            <span className="text-primary-foreground font-bold text-sm text-center">First Feature Shipped</span>
            <span className="text-primary-foreground/60 text-xs">Day 15–30</span>
          </div>
        </div>

        {/* Stats row */}
        <StatsRow />

        {/* Main 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: main tasks */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* This Week's Focus */}
            <WeekFocusCard />

            {/* 60-Day Project Task */}
            <TaskCard />
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-4">
            <MilestoneTimeline />
            <QuickLinks />
          </div>
        </div>
      </main>
    </div>
  );
}
