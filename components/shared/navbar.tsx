"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Subjects", href: "/subjects" },
  { name: "Notice", href: "/notice" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
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
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Button
              asChild
              className="bg-primary hover:bg-[#B30000] text-white px-8 rounded-lg h-11 font-bold text-base"
            >
              <Link href="/login">Log In</Link>
            </Button>
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
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Button
            asChild
            className="w-full bg-[#D90000] hover:bg-[#B30000] text-white font-bold"
          >
            <Link href="/login" onClick={() => setIsOpen(false)}>
              Log In
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;