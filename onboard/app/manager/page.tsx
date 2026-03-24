"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, Plus, Users, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterBar } from "@/components/manager/filter-bar";
import { NewbieList, type Newbie } from "@/components/manager/newbie-list";
import { TaskView } from "@/components/manager/task-view";
import { AlertsSidebar } from "@/components/manager/alerts-sidebar";
import { AssignTemplateModal } from "@/components/manager/assign-template-modal";

// Sample data
const NEWBIES: Newbie[] = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex@company.com",
    mentor: "Sarah Chen",
    cohort: "Q1 2024",
    progress: 72,
    status: "on-track",
    currentTask: "60-Day Personal Project",
    taskVersion: "v2-latest",
    daysJoined: 28,
  },
  {
    id: "2",
    name: "Jordan Kim",
    email: "jordan@company.com",
    mentor: "Mike Johnson",
    cohort: "Q1 2024",
    progress: 45,
    status: "at-risk",
    currentTask: "30-Day Fundamentals",
    taskVersion: "v2-latest",
    daysJoined: 21,
  },
  {
    id: "3",
    name: "Sam Patel",
    email: "sam@company.com",
    mentor: "Emily Davis",
    cohort: "Q4 2023",
    progress: 88,
    status: "on-track",
    currentTask: "Engineering Bootcamp",
    taskVersion: "v1.5-stable",
    daysJoined: 45,
  },
  {
    id: "4",
    name: "Casey Taylor",
    email: "casey@company.com",
    mentor: "Alex Kim",
    cohort: "Q4 2023",
    progress: 33,
    status: "behind",
    currentTask: "Legacy Onboarding",
    taskVersion: "v1-legacy",
    daysJoined: 60,
  },
  {
    id: "5",
    name: "Morgan Lee",
    email: "morgan@company.com",
    mentor: "Sarah Chen",
    cohort: "Q1 2024",
    progress: 100,
    status: "completed",
    currentTask: "30-Day Fundamentals",
    taskVersion: "v2-latest",
    daysJoined: 35,
  },
  {
    id: "6",
    name: "Riley Chen",
    email: "riley@company.com",
    mentor: "Mike Johnson",
    cohort: "Q1 2024",
    progress: 15,
    status: "on-track",
    currentTask: "60-Day Personal Project",
    taskVersion: "v2-latest",
    daysJoined: 7,
  },
];

const TASK_TEMPLATES = [
  {
    id: "1",
    name: "60-Day Personal Project",
    description:
      "Full-stack project with CI/CD setup, authentication, and deployment",
    version: "v2-latest" as const,
    assignedCount: 8,
    completedCount: 3,
    avgCompletionDays: 58,
    assignees: [
      { id: "1", name: "Alex Rivera", progress: 72 },
      { id: "6", name: "Riley Chen", progress: 15 },
      { id: "7", name: "Taylor Swift", progress: 45 },
      { id: "8", name: "Jamie Fox", progress: 88 },
      { id: "9", name: "Chris Pine", progress: 62 },
      { id: "10", name: "Emma Stone", progress: 100 },
    ],
  },
  {
    id: "2",
    name: "30-Day Fundamentals",
    description: "Core platform training covering essential tools and workflows",
    version: "v2-latest" as const,
    assignedCount: 12,
    completedCount: 9,
    avgCompletionDays: 28,
    assignees: [
      { id: "2", name: "Jordan Kim", progress: 45 },
      { id: "5", name: "Morgan Lee", progress: 100 },
      { id: "11", name: "Avery Brooks", progress: 78 },
      { id: "12", name: "Quinn Davis", progress: 100 },
    ],
  },
  {
    id: "3",
    name: "Engineering Bootcamp",
    description: "Intensive technical onboarding with pair programming sessions",
    version: "v1.5-stable" as const,
    assignedCount: 5,
    completedCount: 2,
    avgCompletionDays: 42,
    assignees: [
      { id: "3", name: "Sam Patel", progress: 88 },
      { id: "13", name: "Dakota West", progress: 55 },
    ],
  },
  {
    id: "4",
    name: "Legacy Onboarding",
    description: "Previous version of onboarding program (being phased out)",
    version: "v1-legacy" as const,
    assignedCount: 3,
    completedCount: 1,
    avgCompletionDays: 85,
    assignees: [{ id: "4", name: "Casey Taylor", progress: 33 }],
  },
];

const ALERTS = [
  {
    id: "1",
    type: "reminder" as const,
    title: "15-day check-in due",
    description: "Riley Chen has reached day 15. Schedule a check-in meeting.",
    timestamp: "2 hours ago",
    newbieName: "Riley Chen",
    read: false,
  },
  {
    id: "2",
    type: "warning" as const,
    title: "Progress below threshold",
    description: "Jordan Kim is 20% behind schedule on 30-Day Fundamentals.",
    timestamp: "5 hours ago",
    newbieName: "Jordan Kim",
    read: false,
  },
  {
    id: "3",
    type: "success" as const,
    title: "Onboarding completed",
    description: "Morgan Lee has successfully completed all onboarding tasks.",
    timestamp: "1 day ago",
    newbieName: "Morgan Lee",
    read: true,
  },
  {
    id: "4",
    type: "info" as const,
    title: "New template available",
    description: "60-Day Personal Project v2.1 is now available for assignment.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "5",
    type: "reminder" as const,
    title: "30-day review scheduled",
    description: "Sam Patel's 30-day review is scheduled for tomorrow at 2 PM.",
    timestamp: "3 days ago",
    newbieName: "Sam Patel",
    read: true,
  },
];

export default function ManagerDashboard() {
  const [selectedNewbie, setSelectedNewbie] = useState<Newbie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAssignTemplate = (newbie: Newbie) => {
    setSelectedNewbie(newbie);
    setIsModalOpen(true);
  };

  const handleTemplateAssigned = (templateId: string) => {
    // In a real app, this would update the newbie's assigned template
    console.log(`Assigned template ${templateId} to ${selectedNewbie?.name}`);
  };

  // Summary stats
  const totalNewbies = NEWBIES.length;
  const onTrackCount = NEWBIES.filter((n) => n.status === "on-track").length;
  const atRiskCount = NEWBIES.filter((n) => n.status === "at-risk").length;
  const completedCount = NEWBIES.filter((n) => n.status === "completed").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">O</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Onboarding Manager
              </h1>
              <p className="text-xs text-muted-foreground">
                Track and manage new employee progress
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="flex size-8 items-center justify-center rounded-full hover:bg-secondary transition-colors"
              title="Switch to Newbie Dashboard"
            >
              <UserCircle className="size-5 text-muted-foreground" />
            </Link>
            <Button size="sm" className="gap-1.5">
              <Plus className="size-4" />
              <span className="hidden sm:inline">Add Newbie</span>
            </Button>
            <Avatar className="size-8 border">
              <AvatarImage src="" alt="Manager" />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                MG
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Summary stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Newbies</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {totalNewbies}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">On Track</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-600">
              {onTrackCount}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">At Risk</p>
            <p className="mt-1 text-2xl font-semibold text-amber-600">
              {atRiskCount}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="mt-1 text-2xl font-semibold text-primary">
              {completedCount}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue="people" className="w-full">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TabsList>
                  <TabsTrigger value="people" className="gap-1.5">
                    <Users className="size-4" />
                    People View
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="gap-1.5">
                    <LayoutGrid className="size-4" />
                    Task View
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Filter bar */}
              <div className="mb-4">
                <FilterBar />
              </div>

              <TabsContent value="people" className="mt-0">
                <NewbieList
                  newbies={NEWBIES}
                  onAssignTemplate={handleAssignTemplate}
                />
              </TabsContent>

              <TabsContent value="tasks" className="mt-0">
                <TaskView tasks={TASK_TEMPLATES} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-80">
            <AlertsSidebar alerts={ALERTS} />
          </aside>
        </div>
      </main>

      {/* Assign Template Modal */}
      <AssignTemplateModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        newbie={selectedNewbie}
        onAssign={handleTemplateAssigned}
      />
    </div>
  );
}
