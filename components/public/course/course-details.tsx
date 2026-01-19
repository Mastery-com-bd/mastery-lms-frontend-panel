"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showSuccess } from "@/lib/toast";
import {
  BarChart,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  DollarSign,
  Facebook,
  Layers,
  Mail,
  MessageCircle,
  PlayCircle,
  Smartphone,
  Trophy,
  Twitter,
  Users,
} from "lucide-react";
import Image from "next/image";

const CourseDetails = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showSuccess({
      message: "Link copied to clipboard",
    });
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 lg:w-2/3">
            <nav className="text-sm text-gray-500 mb-4 flex gap-2">
              <span>Home</span> / <span>Courses</span> /{" "}
              <span className="text-[#CC0000]">Course Details</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
              Mastering Modern Web Development: From Zero to Hero
            </h1>

            {/* Video Preview */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 bg-gray-100 group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                alt="Course Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-all">
                <PlayCircle className="w-20 h-20 text-white drop-shadow-lg" />
              </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {["Overview", "Curriculum", "Instructor", "Reviews"].map(
                  (tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab.toLowerCase()}
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#CC0000] data-[state=active]:text-[#CC0000] px-4 sm:px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold bg-transparent inline-block"
                    >
                      {tab}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>

              <TabsContent value="overview" className="space-y-12">
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                <div className="bg-green-50/50 border border-green-100 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-6">
                    What you will learn in this course
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                        <span className="text-gray-700">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curriculum">
                <Accordion type="single" collapsible className="space-y-4">
                  {[1, 2, 3, 4].map((section) => (
                    <AccordionItem
                      key={section}
                      value={`section-${section}`}
                      className="border rounded-xl px-4"
                    >
                      <AccordionTrigger className="hover:no-underline py-6">
                        <div className="flex justify-between w-full pr-4">
                          <span className="font-bold text-lg">
                            Section {section}: Getting Started
                          </span>
                          <span className="text-gray-500 text-sm">
                            5 Lectures • 45 min
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pb-6">
                        {[1, 2, 3].map((lesson) => (
                          <div
                            key={lesson}
                            className="flex items-center justify-between py-2 border-t first:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600">
                                Lesson {lesson}: Introduction to the topic
                              </span>
                            </div>
                            <span className="text-gray-400 text-sm">12:30</span>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-white border border-gray-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8">
              {/* Pricing Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black text-[#1a1a1a]">
                    $14.00
                  </span>
                  <span className="text-gray-300 line-through text-xl font-medium">
                    $26.00
                  </span>
                  <span className="bg-[#fff1f1] text-[#CC0000] px-3 py-1 rounded text-sm font-bold ml-auto">
                    56% OFF
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#CC0000] text-sm font-bold">
                  <Clock className="w-4 h-4" />
                  <span>2 days left at this price!</span>
                </div>
              </div>

              {/* Course Metadata */}
              <div className="space-y-5 pt-4 border-t border-gray-50">
                {[
                  { icon: Clock, label: "Course Duration", value: "6 Month" },
                  {
                    icon: BarChart,
                    label: "Course Level",
                    value: "Beginner and Intermediate",
                  },
                  {
                    icon: Users,
                    label: "Students Enrolled",
                    value: "69,419,618",
                  },
                  { icon: BookOpen, label: "Language", value: "Bengali" },
                  {
                    icon: Calendar,
                    label: "Subtitle Language",
                    value: "English",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 text-gray-400 group-hover:text-[#CC0000] transition-colors">
                      <item.icon className="w-5 h-5" />
                      <span className="text-[#1a1a1a] font-medium">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-gray-400 font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button className="w-full bg-[#CC0000] hover:bg-[#B30000] h-16 text-xl font-bold rounded-2xl shadow-lg shadow-red-100 transition-all active:scale-95">
                  Enroll Now
                </Button>
                <Button className="w-full bg-[#fff1f1] hover:bg-[#ffe4e4] text-[#CC0000] h-16 text-xl font-bold rounded-2xl transition-all border-none">
                  Add To Cart
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-12 font-bold border-gray-100 rounded-xl text-gray-600 hover:bg-gray-50"
                  >
                    Add To Wishlist
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 font-bold border-gray-100 rounded-xl text-gray-600 hover:bg-gray-50"
                  >
                    Gift Course
                  </Button>
                </div>
                <p className="text-center text-gray-400 text-sm font-medium">
                  Note:{" "}
                  <span className="text-gray-500">
                    all course have 30-days money-back guarantee
                  </span>
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-6 pt-8 border-t border-gray-50">
                <h4 className="text-xl font-bold text-[#1a1a1a]">
                  This course includes:
                </h4>
                <ul className="space-y-4">
                  {[
                    { icon: Clock, text: "Lifetime access" },
                    { icon: DollarSign, text: "30-days money-back guarantee" },
                    {
                      icon: BookOpen,
                      text: "Free exercises file & downloadable resources",
                    },
                    {
                      icon: Trophy,
                      text: "Shareable certificate of completion",
                    },
                    {
                      icon: Smartphone,
                      text: "Access on mobile , tablet and TV",
                    },
                    { icon: Calendar, text: "English subtitles" },
                    { icon: Layers, text: "100% online course" },
                  ].map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-4 text-gray-500 group"
                    >
                      <feature.icon className="w-5 h-5 text-[#CC0000] shrink-0 mt-0.5" />
                      <span className="font-medium group-hover:text-gray-800 transition-colors">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Share */}
              <div className="space-y-6 pt-8 border-t border-gray-50">
                <h4 className="text-center font-bold text-gray-600">
                  Share this course:
                </h4>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => copyToClipboard(window.location.href)}
                    className="flex items-center gap-2 bg-[#f8f9fb] hover:bg-gray-100 px-4 py-3 rounded-lg text-gray-500 font-bold transition-all cursor-pointer"
                  >
                    <Copy className="w-5 h-5" />
                    Copy link
                  </button>
                  <div className="flex gap-2">
                    {[
                      {
                        Icon: Facebook,
                        url: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                      },
                      {
                        Icon: Twitter,
                        url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this course!`,
                      },
                      {
                        Icon: Mail,
                        url: `mailto:?subject=Check out this course&body=${encodeURIComponent(window.location.href)}`,
                      },
                      {
                        Icon: MessageCircle,
                        url: `https://wa.me/?text=${encodeURIComponent(window.location.href)}`,
                      },
                    ].map(({ Icon, url }, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          window.open(url, "_blank", "noopener,noreferrer")
                        }
                        className="p-3 bg-[#f8f9fb] hover:bg-gray-100 rounded-lg text-gray-500 transition-all"
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
