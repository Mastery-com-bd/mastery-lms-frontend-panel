"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bell, Clock, Edit2, Layout, Play, Trophy } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { RecentActivityPorps } from "@/type/dashboard";

const TimeSpendingChart = ({
  data,
}: {
  data: { date: string; lessons: number }[];
}) => {
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
          dataKey="date"
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
          dataKey="lessons"
          fill="var(--color-value)"
          radius={[8, 8, 0, 0]}
          barSize={32}
          className="fill-primary"
        />
      </BarChart>
    </ChartContainer>
  );
};

const Dashboard = ({
  learnerReport,
  recentActivity,
}: {
  learnerReport: { date: string; lessons: number }[];
  recentActivity: RecentActivityPorps;
}) => {
  return (
    <div className="min-h-screen text-foreground font-sans flex flex-col lg:flex-row overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto scrollbar-hide">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Welcome Back, Royal
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
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
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="h-64 w-full">
              <TimeSpendingChart data={learnerReport} />
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <Button
                asChild
                variant="link"
                className="text-primary text-sm p-0 h-auto"
              >
                <Link href={`/dashboard/profile`}>View All</Link>
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivity.enrollments?.length > 0 ? (
                recentActivity.enrollments.slice(0, 4).map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center gap-4 p-4 bg-background border border-border rounded-2xl hover:shadow-sm transition-all group"
                  >
                    <div className="h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 border">
                      <img
                        src={enrollment.course.thumbnail.replace(/["']/g, "")}
                        alt={enrollment.course.title}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                        {enrollment.course.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-1000"
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-muted-foreground whitespace-nowrap">
                          {enrollment.progress}%
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        Last accessed{" "}
                        {new Date(
                          enrollment.lastAccessedAt || enrollment.updatedAt,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      asChild
                      size="icon"
                      variant="ghost"
                      className="rounded-xl hover:bg-primary/10 hover:text-primary"
                    >
                      <Link
                        href={`/dashboard/my-courses/${enrollment.course.id}`}
                      >
                        <Play className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-border rounded-2xl">
                  <p className="text-muted-foreground text-sm font-medium">
                    No recent activity found
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Additional Stats or Placeholder */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">My Progress</h2>
            </div>
            <div className="bg-primary/5 border-2 border-primary/10 rounded-2xl p-6 h-[calc(100%-3rem)] flex flex-col justify-center items-center text-center space-y-4">
              <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-primary/20">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl italic uppercase tracking-tighter">
                  Keep it up!
                </h3>
                <p className="text-sm text-muted-foreground max-w-50 mx-auto mt-1">
                  You&apos;ve completed{" "}
                  {recentActivity.enrollments?.filter(
                    (e) => e.status === "COMPLETED",
                  ).length || 0}{" "}
                  courses this month.
                </p>
              </div>
              <Button className="rounded-none bg-primary font-black uppercase tracking-widest px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                View Certificate
              </Button>
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
          <div className="flex items-center justify-center mb-6 px-2">
            <span className="font-bold text-lg">
              {new Date().toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex justify-between items-center gap-2">
            {(() => {
              const today = new Date();
              const dates = [];
              for (let i = -2; i <= 2; i++) {
                const d = new Date(today);
                d.setDate(today.getDate() + i);
                dates.push({
                  day: d.getDate().toString(),
                  week: d.toLocaleDateString(undefined, { weekday: "short" }),
                  active: i === 0,
                });
              }
              return dates.map((date, idx) => (
                <div
                  key={idx}
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
              ));
            })()}
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
