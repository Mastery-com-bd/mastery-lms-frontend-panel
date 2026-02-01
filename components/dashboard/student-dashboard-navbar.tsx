"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Heart, Search } from "lucide-react";
import Link from "next/link";
import CartComponent from "./cart/cart-component";

const StudentDashboardNavbar = () => {
  return (
    <nav className="h-20 w-full border-b bg-white border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Search Bar */}
      <div className="relative w-full max-w-md hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="What do you want learn..."
          className="pl-10 h-11 border-gray-200 rounded-lg focus-visible:ring-1 focus-visible:ring-gray-300 transition-all placeholder:text-gray-400 placeholder:text-sm"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Mobile Search Toggle (Optional, can be added if needed) */}
        <Button variant="ghost" size="icon" className="md:hidden text-gray-600">
          <Search className="w-5 h-5" />
        </Button>

        {/* Notification Icon */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary h-10 w-10"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-[#CC0000] border-2 border-white rounded-full"></span>
        </div>

        {/* Wishlist Icon */}
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="hover:bg-primary h-10 w-10"
        >
          <Link href="/dashboard/wishlist">
            <Heart className="w-5 h-5" />
          </Link>
        </Button>

        {/* Cart Icon */}
        <CartComponent />

        {/* User Avatar */}
        <div className="pl-3 ml-2 border-l border-gray-100">
          <Avatar className="h-10 w-10 cursor-pointer border border-gray-100 hover:ring-2 hover:ring-gray-50 transition-all">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default StudentDashboardNavbar;
