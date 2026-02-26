/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@/provider/AuthProvider";
import CartComponent from "@/components/dashboard/cart/cart-component";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { logout } from "@/service/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  LogOut,
  LayoutDashboard,
  User,
  Menu,
  Home,
  BookOpen,
  BookText,
  Info,
  Phone,
  X,
  UserPlus,
  Heart,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Books", href: "/books", icon: BookText },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const pathname = usePathname();
  const { user, setUser, setIsLoading } = useUser();
  const router = useRouter();

  // Fetch wishlist count whenever user or route changes
  useEffect(() => {
    if (!user) {
      setWishlistCount(0);
      return;
    }
    const fetchWishlistCount = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist`,
          { method: "GET" }
        );
        const data = await res.json();
        if (data?.meta?.total !== undefined) {
          setWishlistCount(data.meta.total);
        } else if (Array.isArray(data?.data)) {
          setWishlistCount(data.data.length);
        }
      } catch {
        // silent fail — don't block UI
      }
    };
    fetchWishlistCount();
  }, [user, pathname]);

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
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm transition-shadow duration-300">
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
            <div className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-all duration-200 relative group",
                      isActive
                        ? "text-primary font-bold"
                        : "text-gray-600 hover:text-primary"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pl-4 border-l border-gray-200 flex items-center gap-3">
              {/* Wishlist Icon — only for logged-in users */}
              {user && (
                <Link
                  href="/dashboard/wishlist"
                  className="relative p-2 text-gray-500 hover:text-primary transition-colors group"
                  title="My Wishlist"
                >
                  <Heart className="w-6 h-6 group-hover:fill-primary/20 transition-all" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Cart — existing CartComponent (always visible) */}
              <CartComponent />

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-primary hover:bg-[#B30000] text-white px-6 rounded-lg h-11 font-bold text-base transition-transform active:scale-95">
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-gray-100">
                    <DropdownMenuItem asChild className="hover:bg-gray-50 rounded-md cursor-pointer transition-colors p-3">
                      <Link href="/dashboard" className="flex items-center gap-3">
                        <LayoutDashboard className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="hover:bg-gray-50 rounded-md cursor-pointer transition-colors p-3">
                      <Link href="/dashboard/wishlist" className="flex items-center gap-3">
                        <Heart className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Wishlist</span>
                        {wishlistCount > 0 && (
                          <span className="ml-auto bg-primary text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={handleLogOut}
                      className="flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md cursor-pointer transition-colors p-3"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="font-medium">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  asChild
                  className="bg-primary hover:bg-[#B30000] text-white px-8 rounded-lg h-11 font-bold text-base transition-transform active:scale-95 shadow-md hover:shadow-lg"
                >
                  <Link href="/login">Log In</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile — Wishlist + Cart + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Wishlist Icon */}
            {user && (
              <Link
                href="/dashboard/wishlist"
                className="relative p-2 text-gray-500 hover:text-primary transition-colors"
                title="My Wishlist"
              >
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>
            )}

            {/* Mobile Cart — existing CartComponent */}
            <CartComponent />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  aria-label="Open Menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" showCloseButton={false} className="w-[85%] sm:max-w-sm p-0 flex flex-col bg-white">
                <SheetHeader className="p-3 text-left relative shrink-0">
                  <SheetClose asChild className="absolute right-4 top-4">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close</span>
                    </button>
                  </SheetClose>

                  <div className="w-[140px] py-1.5 self-start">
                    <Image
                      src="/logo.png"
                      alt="Mini Online Skills"
                      width={120}
                      height={40}
                      className="h-16 w-auto object-contain"
                      priority
                    />
                  </div>
                </SheetHeader>

                <div className="w-full flex-1 overflow-y-auto py-2 flex flex-col">
                  {/* Nav Links */}
                  <div className="flex flex-col py-2">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-4 px-6 py-3 text-sm font-medium transition-colors border-l-4",
                            isActive
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-gray-500")} />
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Account Section */}
                  <div className="flex flex-col py-2 pb-8 mt-auto">
                    <Separator className="my-2 bg-gray-100 mx-6 w-auto" />
                    <p className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2">
                      My Account
                    </p>
                    {user ? (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                          <LayoutDashboard className="h-5 w-5 text-gray-500" />
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/wishlist"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                          <Heart className="h-5 w-5 text-gray-500" />
                          <span>Wishlist</span>
                          {wishlistCount > 0 && (
                            <span className="ml-auto bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                              {wishlistCount}
                            </span>
                          )}
                        </Link>
                        <button
                          onClick={() => {
                            handleLogOut();
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-4 px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="h-5 w-5 text-red-500" />
                          Log out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                          <User className="h-5 w-5 text-gray-500" />
                          Login
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                          <UserPlus className="h-5 w-5 text-gray-500" />
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
