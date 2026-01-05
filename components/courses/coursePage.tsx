"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Grid, Grid2X2, List, Loader2, Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CourseCard } from "./CourseCard";
import { AllCourses } from "@/constant/data";
import CourseList from "./courseList";
import { div } from "motion/react-client";

const categories = [
  "All",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Design",
  "Business",
  "Marketing",
];

export default function Courses() {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  // Sort courses

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const filteredCourses = AllCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.instructor || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return (b.students || 0) - (a.students || 0);
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 py-8">
        <div className="container space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold font-display">
              Explore Courses
            </h1>
            <p className="text-muted-foreground mt-2">
              Discover {122}+ courses taught by industry experts
            </p>
          </div>

          {/* Filters Bar */}
          <div className="w-full space-y-4">
            <div className="w-full flex justify-between items-center gap-3">
              <div className="relative flex-1 lg:max-w-150 ">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex border border-border rounded-lg p-1 gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="More" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {sortedCourses.length}
              </span>{" "}
              courses
            </p>
          </div>

          {/* Course Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 "
              )}
            >
              {sortedCourses.map((course, i) => (
                <div key={course.id}>
                  {viewMode === "grid" ? (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <CourseCard
                        href={`/courses/${course.id}`}
                        title={course.title}
                        instructor={course.instructor || "Unknown Instructor"}
                        thumbnail={
                          course.thumbnail ||
                          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop"
                        }
                        category={course.category || "General"}
                        duration={`${course.duration || 0} lessons`}
                        students={course.students || 0}
                        rating={4.5}
                        price={course.price || 0}
                        isEnrolled={course.isEnrolled || false}
                      />
                    </motion.div>
                  ) : (
                    <CourseList course={course} index={i} />
                  )}
                </div>
              ))}
            </div>
          )}

          {!isLoading && sortedCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No courses found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
