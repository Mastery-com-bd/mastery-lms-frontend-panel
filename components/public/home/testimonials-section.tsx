import { Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Emily Halter",
    content: "MiNi Online Skills has been a game-changer for my 7-year-old! The adaptive lessons make learning enjoyable, and the personalized practice sheets are a lifesaver.",
    rating: 5,
  },
  {
    name: "Mars Sam",
    content: "The practice sheets help me get better at stuff, and the motivational stories are super fun. I can even tell my own stories sometimes! MiNi Online Skills makes me look forward to learning.",
    rating: 5,
  },
  {
    name: "Lisa Parker",
    content: "Homeschooling three kids can be challenging, but MiNi Online Skills has been a game-changer for us. Their course cover a range of subjects, making learning diverse and engaging.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#fafafa] relative overflow-hidden">
      {/* Decorative Illustrations */}
      <div className="absolute top-10 left-[10px] hidden lg:block">
        {/* Planet/Stars Illustration Placeholder */}
        <div className=" w-[200px] h-[200px]">
           <Image src="/testimonials/earth-illustration.png" alt="Planet/Stars" fill className="w-[200px] h-[200px] object-contain" />
        </div>
      </div>
      
      <div className="absolute top-10 right-2.5 hidden lg:block">
        {/* ABC Blocks Illustration Placeholder */}
        <div className=" w-50 h-50">
           <Image src="/testimonials/abc-illustration.png" alt="Planet/Stars" fill className="w-50 h-50 object-contain" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] max-w-3xl mx-auto leading-tight">
            95% of parents said their children enjoy using MiNi Online Skills
          </h2>
          <p className="text-gray-500 text-lg">
            Below are some of the reviews parents left on
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="h-8 w-8 text-[#b23b3b] fill-current opacity-80" />
                <p className="text-gray-700 leading-relaxed text-lg">
                  {testimonial.content}
                </p>
              </div>
              
              <div className="mt-8 flex items-center justify-between">
                <span className="font-bold text-[#1a1a1a]">{testimonial.name}</span>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#e5a4a4] text-[#e5a4a4]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button className="transition-transform hover:scale-105">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              width={160}
              height={48}
              className="h-12 w-auto"
            />
          </button>
          <button className="transition-transform hover:scale-105">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on the App Store"
              width={160}
              height={48}
              className="h-12 w-auto"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;