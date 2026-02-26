import { Button } from "@/components/ui/button";

const NewsLetter = () => {
  return (
    <section className="bg-[#2d0a2d] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          {/* Content Section */}
          <div className="text-white space-y-3 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">Newsletter</h2>
            <p className="text-white/80 text-base md:text-lg max-w-lg">
              Spark joy in learning 🌟 Join our newsletter to get the latest course, practice
              sheets, and motivational stories. 🚀
            </p>
          </div>

          {/* Subscription Form */}
          <div className="w-full max-w-md lg:max-w-lg">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 h-auto sm:h-14 w-full sm:bg-[#FEF7FF]/85 rounded-xl sm:overflow-hidden backdrop-blur-sm sm:border border-white/10">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1 h-14 sm:h-auto px-6 bg-[#FEF7FF]/85 sm:bg-transparent rounded-xl sm:rounded-none text-[#48555F] font-semibold placeholder:text-[#48555F] placeholder:font-semibold focus:outline-none text-lg"
              />
              <Button className="w-full sm:w-auto bg-white hover:bg-white/90 text-[#2d0a2d] px-8 h-14 sm:h-full font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap rounded-xl sm:rounded-none">
                🚀 Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;