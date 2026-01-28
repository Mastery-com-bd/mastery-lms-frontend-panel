"use client";

import {
  BookOpen,
  FileQuestion,
  Heart,
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

const sidebarRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: BookOpen,
    label: "My Courses",
    href: "/dashboard/my-courses",
  },
  {
    icon: Heart,
    label: "Wishlist",
    href: "/dashboard/wishlist",
  },
  {
    icon: FileQuestion,
    label: "Quiz System",
    href: "/dashboard/quiz",
  },
  {
    icon: Users,
    label: "Live Classes",
    href: "/dashboard/live-class",
  },
  {
    icon: User,
    label: "Profile",
    href: "/dashboard/profile",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

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

        <nav className="space-y-1.5 flex-1">
          {sidebarRoutes.map((route) => (
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
              isActive={currentPath === route.href}
            />
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default StudentDashboardSidebar;
