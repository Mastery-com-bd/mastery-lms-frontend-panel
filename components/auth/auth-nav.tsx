"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthNav = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <nav className="w-full max-w-480 mx-auto py-4 px-6 md:px-12 flex items-center justify-between bg-white border-b border-gray-50">
      {/* Logo Section */}
      <Link href="/" className="relative w-32 h-10 md:w-40 md:h-12">
        <Image
          src="/logo.png"
          alt="MiNi Online Skills Logo"
          fill
          className="object-contain"
          priority
        />
      </Link>

      {/* CTA Section */}
      <div className="flex items-center gap-4">
        <span className="hidden md:inline text-gray-500 text-sm font-medium">
          {isLoginPage ? "Don't have an account?" : "Already have an account?"}
        </span>
        <Link
          href={isLoginPage ? "/signUp" : "/login"}
          className="bg-[#fff1f1] hover:bg-[#ffe4e4] text-[#CC0000] font-bold py-2.5 px-6 rounded-lg transition-all active:scale-95 text-sm md:text-base"
        >
          {isLoginPage ? "Create Account" : "Sign In"}
        </Link>
      </div>
    </nav>
  );
};

export default AuthNav;