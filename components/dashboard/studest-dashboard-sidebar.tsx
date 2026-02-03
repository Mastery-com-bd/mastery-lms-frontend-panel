/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { LogOut, LucideIcon, Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sidebarRoutes } from "@/const/navigation.const";
import { Button } from "../ui/button";
import { useUser } from "@/provider/AuthProvider";
import { toast } from "sonner";
import { logout } from "@/service/auth";

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
  const { setUser, setIsLoading } = useUser();
  const router = useRouter();

  const handleLogOut = async () => {
    const toastId = toast.loading("Logging out...", { duration: 3000 });
    try {
      const res = await logout();
      if (res.success) {
        setIsLoading(true);
        setUser(null);
        toast.success(res.message, { id: toastId, duration: 3000 });
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred during logout.", {
        id: toastId,
        duration: 3000,
      });
    }
  };
  return (
    <aside className="w-full lg:w-64 border-r border-border p-6 flex-col justify-between gap-8 bg-card/30 hidden md:flex h-screen sticky top-0">
      <section className="space-y-4 flex-1">
        <div className="flex items-center gap-2 px-2">
          <div className="font-display font-bold text-2xl tracking-tight">
            <Link href="/" className="w-full">
              Mastery LMS
            </Link>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-9 bg-background/50 border-border/50"
          />
        </div>

        <nav className="space-y-1.5 ">
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
      </section>
      <div className="w-full">
        <Button
          onClick={handleLogOut}
          className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors relative text-muted-foreground hover:text-foreground w-full`}
        >
          <LogOut className={`h-5 w-5 text-foreground`} />
          <span className="text-foreground">Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default StudentDashboardSidebar;
