import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "primary" | "hero" | "accent";
}

export function GradientText({ 
  children, 
  className, 
  variant = "hero",
  ...props 
}: GradientTextProps) {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent",
    hero: "bg-gradient-to-r from-primary via-accent to-rose",
    accent: "bg-gradient-to-r from-accent to-rose",
  };

  return (
    <span 
      className={cn(
        "bg-clip-text text-transparent",
        variants[variant],
        className
      )} 
      {...props}
    >
      {children}
    </span>
  );
}
