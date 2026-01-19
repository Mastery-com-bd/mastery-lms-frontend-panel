import { Button } from "@/components/ui/button";
import Image from "next/image";

const FreeSkill = () => {
  return (
    <section className="pt-20 mb-20 relative overflow-hidden bg-gray-50">
      {/* Dotted pattern background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "15px 15px",
        }}
      />
      
      {/* Gradient blobs */}
      {/* <div className="absolute top-20 left-20 w-96 h-96 bg-pink-300 rounded-full opacity-40 blur-3xl z-0" /> */}
      {/* <div className="absolute top-40 left-60 w-80 h-80 bg-gray-200 rounded-full opacity-50 blur-3xl z-0" /> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          {/* Left Side: Content */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <Image
              src="/free-skill/illustration.png"
              alt="Free Skill Illustration"
              width={400}
              height={400}
              className="w-full h-full object-contain -ml-30 scale-120"
            />
          </div>
          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
              Try MiNi Online Skills for free
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              Unlock knowledge through play. Dive into mini&apos;s world of fun
              and discovery. Ready for endless smiles and learning adventures?
            </p>
            <Button
              size="lg"
              className="bg-[#cc0000] hover:bg-[#b30000] text-white font-bold h-14 px-10 text-lg rounded-md"
            >
              Get started for free
            </Button>
          </div>
        </div>

        {/* Bottom Character Illustrations (Placeholders) */}
        <div className="mt-12 flex justify-between items-end px-4 md:px-12 lg:px-24">
          {/* Backpack Character */}
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <Image
              src="/free-skill/illustration1.png"
              alt="Backpack Character"
              width={100}
              height={100}
              className="w-full h-full object-contain absolute -bottom-2"
            />
          </div>
          {/* Pencils Character */}
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <Image
              src="/free-skill/illustration2.png"
              alt="Pencils Character"
              width={100}
              height={100}
              className="w-full h-full object-contain absolute -bottom-2"
            />
          </div>
          {/* Book Character */}
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <Image
              src="/free-skill/illustration3.png"
              alt="Book Character"
              width={100}
              height={100}
              className="w-full h-full object-contain absolute -bottom-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeSkill;