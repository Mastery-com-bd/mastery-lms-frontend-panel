import {
  BookOpen,
  FileQuestion,
  Heart,
  HelpingHand,
  LayoutDashboard,
  Settings,
  User,
  Users,
} from "lucide-react";

export const sidebarRoutes = [
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
    icon: HelpingHand,
    label: "Support",
    href: "/dashboard/support",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  },
];
