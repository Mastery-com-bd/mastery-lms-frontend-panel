"use client";

import React, { useEffect, useState } from "react";
import CoursesSearch from "./courses-search";
import AllCourseCard from "./all-course-card";
import PaginatioComponent from "@/components/shared/pagination";
import CourseSupport from "./course-support";
import RelatedCourses from "../related-courses";
import StudentFeedback from "./student-feedback";
import CourseInstractor from "./course-instractor";
import CourseOffer from "./course-offer";

interface CourseProps {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  ratingsCount: number;
  enrolledCount: number;
  tags: string[];
  totalLessons: number;
  category: {
    id: string;
    name: string;
  };
}

const AllCoueses = () => {
  const [query, setQuery] = useState({
    query: "",
    filter: {
      subject: "",
      category: "",
      language: "",
      sort: "newest",
    },
  });
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [meta, setMeta] = useState<{
    limit: number;
    total: number;
    page: number;
  }>({
    limit: 0,
    total: 0,
    page: 0,
  });

  useEffect(() => {
    const getCourses = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/course?${query.query ? `searchTerm=${query.query}` : ""}${query.filter.language ? `&language=${query.filter.language}` : ""}`, {
        method: "GET",
      });
      const { data, meta } = await res.json();
      setCourses(data);
      setMeta({
        limit: meta?.limit || 0,
        total: meta?.total || 0,
        page: meta?.page || 0,
      });
    };
    getCourses();
  }, [query]);

  return (
    <div>
      {/* Course Search */}
      <CoursesSearch setQuery={setQuery} />

      {/* All Courses */}
      <div className="grid grid-cols-3 gap-4 mt-10 px-10">
        {courses.map((course) => (
          <AllCourseCard
            id={course.id}
            key={course.id}
            image={course.thumbnail}
            category={course.category.name}
            price={course.price}
            currency="USD"
            title={course.title}
            rating={course.ratingsCount}
            studentCount={course.enrolledCount || 0}
          />
        ))}
      </div>

      {/* Pagination */}
      <PaginatioComponent
        pagination={{
          productCount: meta.total * meta.limit || 0,
          totalPage: meta?.total > 0 ? Math.ceil(meta?.total / meta?.limit) : 0,
          page: meta?.page || 0,
          per_page: meta?.limit || 0,
          hasNext: meta?.page < meta?.total || false,
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

      {/* Course Instructor */}
      <div className="px-5">
        <CourseInstractor />
      </div>

      {/* Course Offer */}
      <div className="px-5">
        <CourseOffer />
      </div>
    </div>
  );
};

export default AllCoueses;
