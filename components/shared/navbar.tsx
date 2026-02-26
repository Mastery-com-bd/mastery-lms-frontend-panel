/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/provider/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { logout } from "@/service/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, LayoutDashboard, User, Menu, X } from "lucide-react";
import CartComponent from "../dashboard/cart/cart-component";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Books", href: "/books" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, setUser, setIsLoading } = useUser();
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
    <nav className="sticky top-0 z-50 w-full bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Mini Online Skills"
              width={160}
              height={50}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.href
                      ? "text-foreground font-bold"
                      : "text-muted-foreground",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {user ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-primary hover:bg-[#B30000] text-white px-6 rounded-lg h-11 font-bold text-base">
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="flex items-center gap-2 text-red-600 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <CartComponent />
              </div>
            ) : (
              <Button
                asChild
                className="bg-primary hover:bg-[#B30000] text-white px-8 rounded-lg h-11 font-bold text-base"
              >
                <Link href="/login">Log In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium py-2 transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <Button
                asChild
                className="w-full bg-[#D90000] hover:bg-[#B30000] text-white font-bold"
              >
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              </Button>
              <Button
                onClick={handleLogOut}
                className="w-full bg-[#D90000] hover:bg-[#B30000] text-white font-bold"
              >
                <LogOut size={20} /> Log out
              </Button>
            </div>
          ) : (
            <Button
              asChild
              className="w-full bg-[#D90000] hover:bg-[#B30000] text-white font-bold"
            >
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Log In
              </Link>
            </Button>
          )}
        </div>
      )}
      <Separator className="bg-black/10 h-px" />
    </nav>
  );
};

export default Navbar;
