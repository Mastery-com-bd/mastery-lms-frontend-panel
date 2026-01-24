"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const stats = [
  { label: "Loved by over", value: "30 million learners" },
  { label: "Browse over", value: "50 million courses" },
  { label: "80% learners show", value: "Increased confidence in 2 weeks" },
];

interface featuredCourse {
  id: number;
  title: string;
  thumbnail: string;
  tags: string[];
  totalLessons: number;
}

const BenefitsSection = () => {
  const [activeGrade, setActiveGrade] = useState(1);
  const [activeTab, setActiveTab] = useState("Course");
  const [totalPages, setTotalPages] = useState(0);
  const [courses, setCourses] = useState<featuredCourse[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/course/featured`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const { data, meta } = await res.json();
      setCourses(data);
      setTotalPages(meta?.total > 5 ? 5 : meta?.total);
    };
    getUser();
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-background">
      {/* Decorative Icons */}
      <motion.div
        className="absolute top-20 left-10 lg:left-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="">
          <Image
            src="/icons/World Illustration.png"
            alt="Books Icon"
            width={144}
            height={144}
          />
        </span>
      </motion.div>
      <motion.div
        className="absolute top-20 right-10 lg:right-20"
        animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="">
          <Image
            src="/icons/Book Illustration.png"
            alt="Books Icon"
            width={144}
            height={144}
          />
        </span>
      </motion.div>

      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold  mb-12">
          Join millions of confident learners
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto border-y border-white/20 py-8">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="/70 text-sm font-medium">{stat.label}</p>
              <p className=" text-xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Title */}
        <div className="space-y-4 mb-12">
          <h3 className="text-3xl lg:text-4xl font-bold ">
            Unlocking minds, One course at a time 🚀
          </h3>
          <p className="/80 max-w-3xl mx-auto text-lg leading-relaxed">
            Unlock joyful learning with MiNi Online Skills. Teaching that spark
            brilliance, practice sheets that perfect skills, and the best
            adventure for growing minds.{" "}
            <span className="text-red-500 font-bold">
              Explore, Learn, Thrive!
            </span>
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (grade) => (
                <button
                  key={grade}
                  onClick={() => setActiveGrade(grade)}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all duration-200 font-bold",
                    activeGrade === grade
                      ? "bg-red-600 border-red-600 text-white"
                      : "border-black text-black hover:bg-black/10",
                  )}
                >
                  {grade}
                </button>
              ),
            )}
          </div>

          <div className="flex bg-black/10 p-1 rounded-full border border-black overflow-hidden">
            <button
              onClick={() => setActiveTab("Course")}
              className={cn(
                "px-6 py-2 rounded-full font-bold text-sm transition-all duration-200",
                activeTab === "Course"
                  ? "bg-red-600 text-white"
                  : "text-black hover:bg-black/5",
              )}
            >
              Course (3867+)
            </button>
            {/* <button
              onClick={() => setActiveTab("Sheets")}
              className={cn(
                "px-6 py-2 rounded-full font-bold text-sm transition-all duration-200",
                activeTab === "Sheets"
                  ? "bg-red-600 text-white"
                  : "text-black hover:bg-black/5",
              )}
            >
              Practice sheets (3236+)
            </button> */}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-left">
          {courses.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl overflow-hidden border-none shadow-xl hover:scale-105 transition-transform duration-300 p-0">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={card.thumbnail}
                    alt={card.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 bg-white">
                  <h4 className="text-xl font-bold mb-4">{card.title}</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {/* {card.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-red-50 text-red-600 hover:bg-red-100 border-none px-3"
                      >
                        {tag}
                      </Badge>
                    ))} */}
                  </div>
                  <Link
                    href="#"
                    className="text-red-600 font-bold text-sm hover:underline"
                  >
                    See all {card.totalLessons} lesson
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Button
          asChild
          className="bg-red-600 hover:bg-red-700 text-white px-10 py-6 rounded-xl font-bold text-lg shadow-xl shadow-red-900/20"
        >
          <Link href="/courses">Browse our library</Link>
        </Button>

        <p className="mt-8 text-black/60 text-sm font-medium">
          🔄 We keep releasing new lessons every three weeks
        </p>
      </div>
    </section>
  );
};

export default BenefitsSection;
