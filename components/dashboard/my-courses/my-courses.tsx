"use client";

import { CourseCard } from "@/components/dashboard/my-courses/CourseCard";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
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
        console.log("Enrolled Course:", data);
        setEnrolledCourses(data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div className="p-6 space-y-8 min-h-screen bg-background text-foreground font-sans ">
      <div>
        <h1 className="text-3xl font-bold font-display">My Enrolled Courses</h1>
        <p className="text-muted-foreground mt-1">
          Track your learning progress and continue where you left off.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Current Learning</h2>
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
      </div>
    </div>
  );
};

export default MyCourses;
