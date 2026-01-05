
"use client";

import { CourseCard } from "@/components/courses/CourseCard";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckCircle, Clock, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

const mockStats = [
  {
    label: "Enrolled Courses",
    value: "12",
    icon: GraduationCap,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    label: "Completed",
    value: "08",
    icon: CheckCircle,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "In Progress",
    value: "04",
    icon: Clock,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Avg. Completion",
    value: "65%",
    icon: BookOpen,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const mockEnrolledCourses = [
  {
    id: "1",
    title: "The Complete History 2023: From Zero To Expert!",
    instructor: "Dr. Sarah Mitchell",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
    category: "History",
    duration: "45h 30m",
    students: 12500,
    rating: 4.8,
    progress: 75,
    isEnrolled: true,
  },
  {
    id: "2",
    title: "Modern Web Development with Next.js 14",
    instructor: "John Smith",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop",
    category: "Development",
    duration: "32h 15m",
    students: 8400,
    rating: 4.9,
    progress: 40,
    isEnrolled: true,
  },
  {
    id: "3",
    title: "Digital Marketing Masterclass 2024",
    instructor: "Emily Chen",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    category: "Marketing",
    duration: "28h 45m",
    students: 15200,
    rating: 4.7,
    progress: 100,
    isEnrolled: true,
  },
];

const MyCourses = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display">My Enrolled Courses</h1>
        <p className="text-muted-foreground mt-1">Track your learning progress and continue where you left off.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${stat.bgColor} flex items-center justify-center shrink-0`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Current Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockEnrolledCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <CourseCard {...course} href={`/dashboard/my-courses/${course.id}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;