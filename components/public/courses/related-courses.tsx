import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseCardProps {
  image: string;
  category: string;
  categoryColor: string;
  price: number;
  currency: string;
  title: string;
  rating: number;
  students: string;
}

const CourseCard = ({
  image,
  category,
  categoryColor,
  price,
  currency,
  title,
  rating,
  students,
}: CourseCardProps) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider ${categoryColor}`}
          >
            {category}
          </span>
          <span className="text-[#CC0000] font-black text-lg">
            ${price} {currency}
          </span>
        </div>
        <h3 className="text-[#1a1a1a] font-bold text-base leading-snug line-clamp-2 flex-1">
          {title}
        </h3>
        <div className="pt-4 mt-auto border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-red-400 text-red-400" />
            <span className="text-sm font-bold text-gray-600">{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm font-medium text-gray-400">
            {students} students
          </span>
        </div>
      </div>
    </div>
  );
};

const RelatedCourses = () => {
  const courses = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
      category: "DESIGN",
      categoryColor: "text-red-600 bg-red-50",
      price: 57,
      currency: "BDT",
      title: "Math with practical game-play",
      rating: 5.0,
      students: "265.7K",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
      category: "DEVELOPMENTS",
      categoryColor: "text-purple-600 bg-purple-50",
      price: 37,
      currency: "BDT",
      title: "English speaking test with different culture accent expl...",
      rating: 5.0,
      students: "265.7K",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
      category: "DESIGN",
      categoryColor: "text-red-600 bg-red-50",
      price: 57,
      currency: "BDT",
      title: "Math with practical game-play",
      rating: 5.0,
      students: "265.7K",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
      category: "DEVELOPMENTS",
      categoryColor: "text-purple-600 bg-purple-50",
      price: 37,
      currency: "BDT",
      title: "English speaking test with different culture accent expl...",
      rating: 5.0,
      students: "265.7K",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      category: "DESIGN",
      categoryColor: "text-red-600 bg-red-50",
      price: 57,
      currency: "BDT",
      title: "Math with practical game-play",
      rating: 5.0,
      students: "265.7K",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">
            Students are currently enrolling
          </h2>
          <Link
            href="/courses"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#fff1f1] hover:bg-[#ffe4e4] text-[#CC0000] font-bold rounded-full transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedCourses;