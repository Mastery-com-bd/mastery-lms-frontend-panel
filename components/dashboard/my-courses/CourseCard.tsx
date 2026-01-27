import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  shortDescription: string;
  longDescription: string;
  thumbnail: string;
  progress?: number;
  isEnrolled?: boolean;
  isFeatured?: boolean;
  className?: string;
  onClick?: () => void;
  href: string;
}

export function CourseCard({
  title,
  shortDescription,
  longDescription,
  thumbnail,
  progress,
  isEnrolled = false,
  isFeatured = false,
  className,
  onClick,
  href,
}: CourseCardProps) {
  return (
    <div
      className={cn(
        "w-full h-full group relative overflow-hidden flex flex-col border border-border bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-primary/50",
        className,
      )}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          width={400}
          height={225}
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Play Button Overlay */}
        <Link
          href={`${href}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-glow backdrop-blur-sm">
            <Play className="h-6 w-6 ml-1" fill="currentColor" />
          </div>
        </Link>

        {/* Featured Badge */}
        {isFeatured && (
          <Badge className="absolute left-3 top-3 bg-linear-to-r from-primary to-accent text-primary-foreground border-0">
            Featured
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 font-display text-lg group-hover:text-primary transition-colors">
            {title
              ? title.length > 30
                ? `${title.slice(0, 30)}...`
                : title
              : "No Title"}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {shortDescription
              ? shortDescription.length > 100
                ? `${shortDescription.slice(0, 100)}...`
                : shortDescription
              : longDescription
                ? longDescription.length > 100
                  ? `${longDescription.slice(0, 100)}...`
                  : longDescription
                : "Description not available"}
          </p>
        </div>

        {/* Progress (if enrolled) */}
        {isEnrolled && progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{progress}% complete</span>
              <span>{Math.round((1 - progress / 100) * 24)} lessons left</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Price/Action */}
        <div className="flex items-center justify-between pt-2">
          <Link href={href} className="w-full">
            <Button
              variant="ghost"
              className="w-full h-12 bg-[#fff1f1] hover:bg-[#CC0000] text-[#CC0000] hover:text-white font-bold text-lg transition-all duration-300 active:scale-[0.98] group/btn rounded-none border border-border"
            >
              {isEnrolled ? "Continue" : "Watch Lecture"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
