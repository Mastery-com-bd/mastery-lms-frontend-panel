import React from "react";
import CoursesSearch from "./courses-search";
import AllCourseCard from "./all-course-card";
import PaginatioComponent from "@/components/shared/pagination";
import CourseSupport from "./course-support";
import RelatedCourses from "../related-courses";
import StudentFeedback from "./student-feedback";

const AllCoueses = () => {
  return (
    <div>
      {/* Course Search */}
      <CoursesSearch />

      {/* All Courses */}
      <div className="grid grid-cols-3 gap-4 mt-10 px-10">
        {Array.from({ length: 10 }).map((_, index) => (
          <AllCourseCard
            id={`${index}`}
            key={index}
            image={`https://picsum.photos/1000/1000?education&random=${index}`}
            category="Programming"
            price={(index + 1) * 10}
            currency="USD"
            title={`Course ${index}`}
            rating={index % 5}
            studentCount={(index + 1) * 100}
          />
        ))}
      </div>

      {/* Pagination */}
      <PaginatioComponent
        pagination={{
          productCount: 100,
          totalPage: 10,
          page: 1,
          per_page: 10,
          hasNext: true,
        }}
      />

      {/* Course Support */}
      <CourseSupport />

      {/* Related Courses */}
      <div className="px-10">
        <RelatedCourses />
      </div>

      {/* Student Feedback */}
      <div className="">
        <StudentFeedback />
      </div>
    </div>
  );
};

export default AllCoueses;
