"use client";
import { TAllCourse } from "@/type/course.types";
import { CourseCard } from "./CourseCard";
import { motion } from "motion/react";

const MyCourses = ({ myCourses }: { myCourses: TAllCourse[] }) => {
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

        {myCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <CourseCard
                  title={course?.course?.title}
                  thumbnail={
                    course?.course?.thumbnail ||
                    "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
                  }
                  shortDescription={course?.course?.shortDescription}
                  longDescription={course?.course?.description}
                  href={`/dashboard/my-courses/${course?.course?.id}`}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">
              You haven&apos;t enrolled in any courses yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
