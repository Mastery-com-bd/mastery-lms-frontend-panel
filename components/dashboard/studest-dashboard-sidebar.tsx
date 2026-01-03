"use client";


import {
  BookOpen,
  LayoutDashboard,
  LucideIcon,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItem = ({
  icon: Icon,
  label,
  isActive = false,
  href = "#",
}: {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  href?: string;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors relative ${
        isActive
          ? "text-foreground font-semibold"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className={`h-5 w-5 ${isActive ? "text-foreground" : ""}`} />
      <span>{label}</span>
      {isActive && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full" />
      )}
    </Link>
  );
};

const StudentDashboardSidebar = () => {
    const currentPath = usePathname();
  return (
    <div>
      <aside className="w-full lg:w-64 border-r border-border p-6 flex-col gap-8 bg-card/30 hidden md:flex">
        <div className="flex items-center gap-2 px-2">
          <div className="font-display font-bold text-2xl tracking-tight">
            Mastery LMS
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-9 bg-background/50 border-border/50"
          />
        </div>

        <nav className="space-y-1 flex-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" isActive={currentPath === "/dashboard"} />
          <SidebarItem icon={BookOpen} label="My Courses" href="/dashboard/my-courses" isActive={currentPath === "/dashboard/my-courses"} />
          <SidebarItem icon={Users} label="Community" href="/dashboard/community" isActive={currentPath === "/dashboard/community"} />
          <SidebarItem icon={User} label="profile" href="/dashboard/profile" isActive={currentPath === "/dashboard/profile"} />
          <SidebarItem icon={Settings} label="Settings" href="/dashboard/settings" isActive={currentPath === "/dashboard/settings"} />
        </nav>
      </aside>
    </div>
  );
};

export default StudentDashboardSidebar;
