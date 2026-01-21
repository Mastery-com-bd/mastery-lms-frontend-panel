import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const JoinTeamCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] flex gap-4 sm:gap-6 items-start transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#00BA34] shrink-0 mt-1" />
    <div className="space-y-2">
      <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a]">{title}</h3>
      <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const CareerPage = () => {
  return (
    <div>
      {/* 1. Hero Section */}
      <section className="">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center mt-20">
            {/* Text Column */}
            <div className="lg:col-span-6 space-y-6 lg:space-y-8 mb-20">
              <div className="space-y-4">
                <span className="inline-block text-[#CC0000] text-sm font-bold uppercase tracking-widest">
                  Start the Conversation
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] leading-tight">
                  Let’s build something{" "}
                  <span className="text-[#CC0000]">amazing</span> together.
                </h1>
              </div>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Whether you have a question, a bold idea, or just want to say
                hi—our team is ready to listen. Reach out and we’ll get back to
                you within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button className="bg-[#CC0000] hover:bg-[#B30000] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-100">
                  View Open Positions
                </Button>
                {/* <Button variant="outline" className="border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-bold flex items-center gap-2 transition-all active:scale-95">
                  Schedule a call
                </Button> */}
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-6 h-full relative flex items-end ">
              <Image
                src="/career/career-image.png"
                alt="Two people collaborating over a laptop"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-20 lg:py-32 bg-[#F5F7FA]">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Image Section */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/career/career-image2.png"
                  alt="Join Our Team Gallery"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Content Section */}
            <div className="w-full lg:w-1/2 space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl font-bold text-[#1a1a1a] leading-tight">
                  Why you will join our team
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                  QuisLorem ipsum dolor sit amet, consectetur adipising elit,Lorem ipsum dolor sit amet, consectetur adipi Lorem ipsum dolor sit amet, consectetur,
                </p>
              </div>

              <div className="space-y-6">
                <JoinTeamCard 
                  title="Lorem ipsum dolor sit amet, consectetur ad"
                  description="QuLorem ipsum dolor sit amet, consectetur adipisingiuelit,Lorem ipsum dolor sit amet, consectetur adipising elit,Lorem ipsum dolor sit amet, consectetur ad"
                />
                <JoinTeamCard 
                  title="Lorem ipsum dolor sit amet, consectetur"
                  description="ALorem ipsum dolor sit amet, consectetur adipising elit,Lorem ipsum dolor sit amet, consectetur adipising elit,"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
