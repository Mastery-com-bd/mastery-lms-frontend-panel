import { cn } from "@/lib/utils";
import { BookOpen, Clock, Play, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface CourseCardProps {
  title: string;
  instructor: string;
  thumbnail: string;
  category: string;
  duration: string;
  students: number;
  rating: number;
  price?: number;
  progress?: number;
  isEnrolled?: boolean;
  isFeatured?: boolean;
  className?: string;
  onClick?: () => void;
  href: string;
}

export function CourseCard({
  title,
  instructor,
  thumbnail,
  category,
  duration,
  students,
  rating,
  price,
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
        "group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer hover:ring-2 hover:ring-primary/50",
        className
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

        {/* Category Badge */}
        <Badge
          variant="secondary"
          className="absolute right-3 top-3 backdrop-blur-sm bg-background/80"
        >
          {category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2 font-display text-lg group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">by {instructor}</p>
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

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{students.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber">
            <Star className="h-4 w-4" fill="currentColor" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Price/Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          {isEnrolled ? (
            <Button asChild variant="default" size="sm" className="w-full gap-2">
              <Link href={href} className="w-full">
                <BookOpen className="h-4 w-4" />
                Continue Learning
              </Link>
            </Button>
          ) : (
            <>
              <div className="space-y-0.5">
                {price === 0 ? (
                  <span className="text-lg font-bold text-emerald">Free</span>
                ) : (
                  <span className="text-lg font-bold text-foreground">
                    ${price?.toFixed(2)}
                  </span>
                )}
              </div>
              <Button variant="gradient" size="sm">
                Enroll Now
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
