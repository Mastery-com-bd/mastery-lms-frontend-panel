"use client";

import React from "react";
import { motion } from "motion/react";
import { Star, Users, Clock, Tag } from "lucide-react";
import Image from "next/image";

interface CourseCardProps {
  id: string;
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
}

interface CourseListProps {
  course: CourseCardProps;
  index: number;
  className?: string;
}

const CourseList: React.FC<CourseListProps> = ({ course, index, className }) => {
  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      <motion.div
        key={course.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: index * 0.06 }}
        onClick={course.onClick}
        className={`bg-card border border-border rounded-xl shadow-sm overflow-hidden ${
          course.onClick ? "cursor-pointer" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 md:w-56 lg:w-64">
            <div className="aspect-video sm:aspect-4/3">
              <Image
                width={400}
                height={300}
                src={course.thumbnail}
                alt={course.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="p-4 flex-1 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-lg">{course.title}</h3>
              {course.isFeatured && (
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Featured
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              By {course.instructor}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" /> {course.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {course.students.toLocaleString()}{" "}
                learners
              </span>
              <span className="flex items-center gap-1 text-amber">
                <Star className="h-4 w-4" fill="currentColor" /> {course.rating}
              </span>
            </div>

            {course.price != null && (
              <div className="text-base font-medium">
                ${course.price.toFixed(2)}
              </div>
            )}

            {course.isEnrolled && course.progress != null && (
              <div className="pt-2">
                <div className="h-2 w-full bg-muted/30 rounded">
                  <div
                    className="h-full bg-primary rounded"
                    style={{
                      width: `${Math.min(100, Math.max(0, course.progress))}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Progress {Math.round(course.progress)}%
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseList;
