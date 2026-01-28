"use client";

import { CourseCard } from "@/components/dashboard/my-courses/CourseCard";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface enrollCourseProps {
  course: {
    id: string;
    title: string;
    thumbnail: string;
    shortDescription: string;
    description: string;
  };
}

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<enrollCourseProps[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/enrollment/my-enrollments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const { data } = await response.json();
        setEnrolledCourses(data || []);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div className="p-6 space-y-8 min-h-screen text-foreground font-sans ">
      <div>
        <h1 className="text-3xl font-bold font-display">My Enrolled Courses</h1>
        <p className="text-muted-foreground mt-1">
          Track your learning progress and continue where you left off.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Current Learning</h2>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-10 h-10 text-[#CC0000] animate-spin" />
            <p className="text-gray-500 animate-pulse">Loading your courses...</p>
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {enrolledCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <CourseCard
                title={course.course.title}
                thumbnail={course.course.thumbnail}
                shortDescription={course.course.shortDescription}
                longDescription={course.course.description}
                href={`/dashboard/my-courses/${course.course.id}`}
              />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">You haven&apos;t enrolled in any courses yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
