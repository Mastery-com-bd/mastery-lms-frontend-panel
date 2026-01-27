"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit2,
  GraduationCap,
  Layout,
  Play,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ScrollArea } from "../ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const CircularProgress = ({
  value,
  size = 60,
  strokeWidth = 6,
  color = "text-primary",
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-muted/20"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${color} transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-xs font-bold">{value}%</span>
    </div>
  );
};

const TimeSpendingChart = () => {
  const data = [
    { day: "Sun", value: 40 },
    { day: "Mon", value: 60 },
    { day: "Tue", value: 45 },
    { day: "Wed", value: 100 },
    { day: "Thu", value: 55 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 40 },
  ];

  const chartConfig = {
    value: {
      label: "Time Spent",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          top: 12,
          bottom: 12,
        }}
      >
        <CartesianGrid
          vertical={false}
          strokeDasharray="3 3"
          stroke="#3b82f6"
        />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="value"
          fill="var(--color-value)"
          radius={[8, 8, 0, 0]}
          barSize={32}
          className="fill-primary"
        />
      </BarChart>
    </ChartContainer>
  );
};

const DonutChart = () => {
  // Simple CSS conic gradient for donut chart
  // Red 40%, Purple 30%, Blue 20%, rest transparent/gray
  return (
    <div className="relative w-40 h-40 rounded-full flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(
            #ef4444 0% 40%, 
            #8b5cf6 40% 70%, 
            #3b82f6 70% 90%, 
            transparent 90% 100%
          )`,
          opacity: 0.9,
        }}
      />
      <div className="absolute inset-4 bg-background rounded-full flex flex-col items-center justify-center z-10 shadow-inner">
        <span className="text-3xl font-bold">22</span>
        <span className="text-xs text-muted-foreground">Total Courses</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col lg:flex-row overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto scrollbar-hide">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Welcome Back, Royal
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              15 January, 2026
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative border group h-12 w-12 rounded-xl"
              >
                <Bell className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="absolute top-3 right-3 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-background" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h4 className="font-semibold">Notifications</h4>
              </div>
              <ScrollArea className="h-72">
                <div className="divide-y">
                  {[
                    {
                      id: 1,
                      title: "New assignment available",
                      desc: "UX Fundamentals - Module 3 quiz is now open",
                      time: "5 min ago",
                      unread: true,
                    },
                    {
                      id: 2,
                      title: "Class starting soon",
                      desc: "UI Design live session begins in 15 minutes",
                      time: "10 min ago",
                      unread: true,
                    },
                    {
                      id: 3,
                      title: "Grade updated",
                      desc: "Your submission for 'Wireframe Project' has been graded",
                      time: "1 hour ago",
                      unread: false,
                    },
                    {
                      id: 4,
                      title: "Course reminder",
                      desc: "Complete 'Visual Hierarchy' lesson before tomorrow",
                      time: "2 hours ago",
                      unread: false,
                    },
                  ].map((n) => (
                    <div
                      key={n.id}
                      className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                        n.unread ? "bg-blue-50/5" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {n.desc}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {n.time}
                          </p>
                        </div>
                        {n.unread && (
                          <span className="h-2 w-2 rounded-full bg-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-2 border-t">
                <Button variant="ghost" className="w-full text-xs" size="sm">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </header>

        {/* Quick Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              label: "Enrolled Courses",
              value: "957",
              icon: Play,
              color: "text-red-500",
              bg: "bg-[#FFF5F2]",
              iconBg: "bg-white",
            },
            {
              label: "Active Courses",
              value: "6",
              icon: Layout,
              color: "text-blue-600",
              bg: "bg-[#F0F2FF]",
              iconBg: "bg-white",
            },
            {
              label: "Completed Courses",
              value: "951",
              icon: Trophy,
              color: "text-green-600",
              bg: "bg-[#EFFBF2]",
              iconBg: "bg-white",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-2xl p-6 flex items-center gap-5 transition-all hover:shadow-md border border-border hover:border-border/50`}
            >
              <div
                className={`h-14 w-14 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-sm`}
              >
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Time Spendings */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Time Spendings</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  10
                  <span className="text-lg text-muted-foreground font-normal">
                    h
                  </span>
                </span>
                <span className="text-3xl font-bold">
                  20
                  <span className="text-lg text-muted-foreground font-normal">
                    m
                  </span>
                </span>
              </div>
            </div>
            <select className="bg-background border border-border rounded-md px-3 py-1 text-sm outline-none">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="h-64 w-full">
              <TimeSpendingChart />
            </div>
            <div className="flex flex-row lg:flex-col gap-4">
              {[
                {
                  label: "Hours Spent",
                  value: "42",
                  icon: Clock,
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  label: "Overall Result",
                  value: "220",
                  icon: Trophy,
                  color: "text-amber-500",
                  bg: "bg-amber-500/10",
                },
                {
                  label: "Completed",
                  value: "20",
                  icon: GraduationCap,
                  color: "text-indigo-500",
                  bg: "bg-indigo-500/10",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 min-w-35"
                >
                  <div
                    className={`h-10 w-10 rounded-full ${stat.bg} flex items-center justify-center`}
                  >
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="font-bold text-lg">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Homework Progress */}
          <section>
            <h2 className="text-lg font-semibold mb-6">Homework Progress</h2>
            <div className="space-y-4">
              {[
                {
                  title: "User experience Design",
                  tasks: "12 Tasks",
                  progress: 92,
                  color: "text-indigo-500",
                },
                {
                  title: "User Interface Design",
                  tasks: "12 Tasks",
                  progress: 52,
                  color: "text-cyan-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <CircularProgress
                      value={item.progress}
                      size={48}
                      strokeWidth={4}
                      color={item.color}
                    />
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {item.tasks}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Course Statistics */}
          <section>
            <h2 className="text-lg font-semibold mb-6">Course Statistics</h2>
            <div className="flex items-center gap-8 bg-card border border-border rounded-xl p-6 shadow-sm">
              <DonutChart />
              <div className="space-y-3">
                {[
                  { label: "Incompleted", value: "40%", color: "bg-red-500" },
                  { label: "Completed", value: "30%", color: "bg-indigo-500" },
                  { label: "In progress", value: "20%", color: "bg-blue-500" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${stat.color}`} />
                    <span className="text-xs text-muted-foreground w-20">
                      {stat.label}
                    </span>
                    <span className="text-xs font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-full lg:w-80 border-l border-border bg-card/30 p-6 flex-col gap-8 hidden xl:flex">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">My Profile</h3>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground border"
          >
            <Link
              href={"/dashboard/settings"}
              className="flex items-center gap-2"
            >
              <Edit2 className="h-3 w-3 mr-1" /> Edit
            </Link>
          </Button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3 ">
            <Avatar className="h-24 w-24 border-4 shadow-lg border-primary">
              <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop" />
              <AvatarFallback>RP</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-1 right-1 h-6 w-6 bg-yellow-400 rounded-full border-2 border-background flex items-center justify-center">
              <span className="text-[10px] font-bold">★</span>
            </div>
          </div>
          <h3 className="font-bold text-lg">Royal Parvej</h3>
          <p className="text-sm text-muted-foreground">@royalparvej</p>

          <div className="grid grid-cols-3 gap-2 w-full mt-6">
            {[
              { label: "Rank", value: "10" },
              { label: "Avr. Hour", value: "2h" },
              { label: "Enrolled", value: "12" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-background rounded-lg py-2 border border-border"
              >
                <p className="font-bold">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6 px-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-border/50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-bold text-lg">October 2022</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-border/50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-between items-center gap-2">
            {[
              { day: "12", week: "Sat" },
              { day: "12", week: "Sun" },
              { day: "12", week: "Mon", active: true },
              { day: "12", week: "Tue" },
              { day: "12", week: "Wed" },
            ].map((date, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center ${
                  date.active ? "w-16" : "w-12"
                } h-16 rounded-2xl transition-all cursor-pointer ${
                  date.active
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110"
                    : "hover:bg-muted/50 text-muted-foreground"
                }`}
              >
                <span
                  className={`text-lg font-bold ${
                    date.active ? "text-white" : "text-foreground"
                  }`}
                >
                  {date.day}
                </span>
                <span
                  className={`text-xs ${date.active ? "text-white/80" : ""}`}
                >
                  {date.week}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Upcoming Class</h3>
          <div className="space-y-3">
            {[
              {
                time: "8:30",
                title: "User Experience Design",
                type: "Online . Zoom Meeting",
              },
              {
                time: "9:30",
                title: "User Interface Design",
                type: "Online . Zoom Meeting",
              },
            ].map((cls, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-background border border-border rounded-xl"
              >
                <div className="bg-muted/30 px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                  {cls.time}
                </div>
                <div>
                  <h4 className="text-sm font-semibold leading-tight">
                    {cls.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {cls.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
