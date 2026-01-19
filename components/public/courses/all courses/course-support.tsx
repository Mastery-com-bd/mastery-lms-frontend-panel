import { Button } from "@/components/ui/button";
import Image from "next/image";

const CourseSupport = () => {
  return (
    <section className="px-10 py-16 md:py-24 overflow-hidden">
      <div className="container bg-[#DB8383]/20 mx-auto px-10 rounded-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-[#2d0a2d] leading-tight">
              Know about MiNi <br />
              Online Skills platform
            </h2>
            
            <ul className="space-y-4 text-lg md:text-xl text-gray-600 font-medium">
              <li>Free E-book, video & consolation</li>
              <li>Top instructors from around world</li>
              <li>Top courses from experts</li>
            </ul>

            <div className="pt-4">
              <Button className="bg-[#CC0000] hover:bg-[#B30000] text-white text-xl font-bold h-16 px-10 rounded-2xl shadow-lg shadow-red-100 transition-all active:scale-95">
                Start learning now
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-video lg:aspect-auto w-full h-full min-h-75 md:min-h-100 lg:min-h-112.5">
              <Image
                src="/support.png"
                alt="MiNi Online Skills Platform Support"
                fill
                className="object-contain lg:object-right pointer-events-none drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSupport;