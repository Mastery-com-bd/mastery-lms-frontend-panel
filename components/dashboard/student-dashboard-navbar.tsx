"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import CartComponent from "./cart/cart-component";

const StudentDashboardNavbar = () => {
  return (
    <nav className="h-20 w-full border-b bg-white border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Search Bar */}
      <div className="relative w-full max-w-md hidden md:block">
        Welcome Back
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notification Icon */}

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
      </div>
    </nav>
  );
};

export default StudentDashboardNavbar;
