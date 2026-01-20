import { ArrowRight, BookOpen, CheckCircle, Users } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  brandColor: string;
}

const TestimonialCard = ({ quote, name, role, company, brandColor }: TestimonialProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#f8f9fb] p-10 rounded-lg relative mb-8 group transition-all duration-300 hover:shadow-xl">
        {/* Quote Icons */}
        <div className="absolute top-6 left-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 11H6C5.44772 11 5 10.5523 5 10V6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V10C11 10.5523 10.5523 11 10 11Z" fill="#CC0000" fillOpacity="0.8"/>
            <path d="M19 11H15C14.4477 11 14 10.5523 14 10V6C14 5.44772 14.4477 5 15 5H19C19.5523 5 20 5.44772 20 6V10C20 10.5523 19.5523 11 19 11Z" fill="#CC0000" fillOpacity="0.8"/>
          </svg>
        </div>
        
        <p className="text-[#2d0a2d] text-center text-lg leading-relaxed font-medium pt-4">
          {quote}
        </p>

        <div className="absolute bottom-6 right-6 rotate-180">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 11H6C5.44772 11 5 10.5523 5 10V6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V10C11 10.5523 10.5523 11 10 11Z" fill="#CC0000" fillOpacity="0.8"/>
            <path d="M19 11H15C14.4477 11 14 10.5523 14 10V6C14 5.44772 14.4477 5 15 5H19C19.5523 5 20 5.44772 20 6V10C20 10.5523 19.5523 11 19 11Z" fill="#CC0000" fillOpacity="0.8"/>
          </svg>
        </div>

        {/* Triangle Pointer */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-15 border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-[#f8f9fb]"></div>
      </div>

      <div className="text-center space-y-1">
        <h4 className="text-xl font-bold text-[#1a1a1a]">{name}</h4>
        <p className="text-gray-500 text-sm">
          {role} of <span style={{ color: brandColor }}>{company}</span>
        </p>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-0">
      {/* 1. History & Founder Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 space-y-6">
              <span className="text-5xl md:text-7xl font-bold text-gray-100 block">
                2007-2026
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
                We share knowledge <br /> with the world
              </h1>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl">
                Founded by Abdul Awal, our platform offers both online and
                offline learning experiences, helping students and professionals
                enhance their language skills effectively.
              </p>
            </div>
            <div className="w-full lg:w-1/2 relative aspect-square max-w-125 mx-auto">
              <Image
                src="/about/about-image1.png"
                alt="Founder Abdul Awal"
                fill
                className="object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Growth Statistics Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/3 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                We Just keep growing <br /> with 3.6k Students
              </h2>
              <p className="text-gray-500">
                With years of expertise, we focus on providing practical,
                engaging, and result-driven English learning solutions.
              </p>
            </div>
            <div className="w-full lg:w-2/3 flex flex-wrap justify-center lg:justify-end gap-8 md:gap-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">3.6k</p>
                  <p className="text-gray-500 text-sm">Students</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">120</p>
                  <p className="text-gray-500 text-sm">Certified Instructor</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#1a1a1a]">99.9%</p>
                  <p className="text-gray-500 text-sm">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission Section */}
      <section className="py-16 md:py-24 bg-[#fdf2f2]">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src="/about/about-image2.png"
                  alt="Our Mission"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-6 order-1 lg:order-2">
              <span className="text-[#CC0000] font-bold tracking-widest uppercase text-sm">
                OUR ONE BILLION MISSION
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
                Our one billion mission <br /> sounds bold, We agree.
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  &quot;We cannot solve our problems with the same thinking we used
                  when we created them.&quot;—Albert Einstein. Institutions are slow
                  to change. Committees are where good ideas and innovative
                  thinking go to die.
                </p>
                <p>
                  Choose agility over dogma. Embrace and drive change. We need
                  to wipe the slate clean and begin with bold, radical thinking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Gallery */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="w-full lg:w-2/5 space-y-8">
              <div className="space-y-4">
                <span className="text-[#CC0000] font-bold tracking-widest uppercase text-sm">
                  OUR GALLERY
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
                  We&apos;ve been here <br /> almost 19 years
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed max-w-md">
                  At Mini Online Skills, We Are Dedicated To Empowering Individuals 
                  With High-Quality English Courses And Educational Books.
                </p>
              </div>
              
              <Button className="bg-[#CC0000] hover:bg-[#B30000] text-white px-8 py-6 rounded-xl text-lg font-bold transition-all active:scale-95 flex items-center gap-3 group">
                Join Our Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right Image (Composite Gallery) */}
            <div className="w-full lg:w-3/5">
              <div className="relative aspect-video w-full transform lg:scale-110 lg:translate-x-10">
                <Image
                  src="/about/about-image3.png"
                  alt="Mini Online Skills Gallery"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
            <TestimonialCard 
              quote="Mini Online Skills fit us like a glove. Their team curates fresh, up-to-date courses from their marketplace and makes them available to customers."
              name="Kona Iman"
              role="Chief Chairman"
              company="Education"
              brandColor="#CC0000"
            />
            <TestimonialCard 
              quote="Mini Online Skills responds to the needs of the business in an agile and global manner. It's truly the best solution for our employees and their careers."
              name="Irfan Khan"
              role="CEO"
              company="Micro Learner"
              brandColor="#CC0000"
            />
            <TestimonialCard 
              quote="Mini Online Skills fit us like a glove. Their team curates fresh, up-to-date courses from their marketplace and makes them available to customers."
              name="Kona Iman"
              role="Chief Chairman"
              company="Education"
              brandColor="#CC0000"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
