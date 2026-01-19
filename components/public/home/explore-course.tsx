import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import Image from "next/image";

const ExploreCourse = () => {
  return (
    <section className="relative bg-linear-to-b from-[#2d0a2d] to-[#1a051a]">
      

      <div className="container relative z-10 mx-auto px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-8 max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Explore exciting subjects, & walk your way to brilliance
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Why settle for ordinary when you can explore the extraordinary?
              Join us and discover why MiNi Online Skills is not just the best – it&apos;s
              the magical key to unlocking creativity for your kids.
            </p>
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-black font-semibold h-14 px-8 text-lg flex items-center gap-2"
            >
              <GraduationCap className="h-6 w-6" />
              Explore our subjects
            </Button>
          </div>

          {/* Illustration Section */}
          <div className="relative h-100 md:h-125 lg:h-150 w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* This is a placeholder for the 3D chkaracter jumping on books illustration */}
              <div className="relative w-full h-full max-w-125">
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 rounded-full blur-3xl" />
                
                {/* 
                  Note: In a real implementation, you'd replace this with the 
                  actual illustration image file provided in the screenshot.
                */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <Image
                    src="/explore course/explore course Illustration.png"
                    alt="3D Character Jumping on Books"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
            </div>

            {/* Floating Elements (Visual placeholders) */}
            <div className="absolute top-10 right-10 animate-bounce delay-100 opacity-60">
              <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2L1 21h22L12 2z" />
              </svg>
            </div>
            <div className="absolute bottom-20 left-10 animate-pulse opacity-40">
              <div className="w-6 h-6 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCourse;