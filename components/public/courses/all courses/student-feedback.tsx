
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.38 6.38 0 01-1.87-1.5c-.02 3.14-.03 6.27-.04 9.4-.03 1.61-.49 3.24-1.51 4.49-1.02 1.25-2.58 2.02-4.14 2.22-1.56.19-3.19-.1-4.53-.94-1.34-.84-2.38-2.19-2.73-3.7-.35-1.5-.07-3.14.77-4.47.84-1.33 2.18-2.37 3.69-2.72 1.51-.35 3.14-.07 4.48.78.1.06.2.13.29.2v4.08c-.1-.06-.19-.11-.3-.16-1.16-.57-2.61-.47-3.66.27-1.05.74-1.58 2.05-1.31 3.29.27 1.24 1.34 2.19 2.61 2.34 1.27.15 2.59-.44 3.17-1.56.23-.44.34-.94.33-1.44.01-4.75.01-9.51.02-14.26z" />
  </svg>
);

const StudentFeedback = () => {
  const students = [
    {
      name: "Tanya Nur",
      email: "tanya.nur@example.com",
      feedback: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      ],
      mainImage: "/student-image.png",
    },
  ];

  const thumbnails = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  ];

  const currentStudent = students[0];

  return (
    <section className="bg-[#fdf2f2] py-16 px-10 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-12">
          What our students have to say
        </h2>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 shadow-sm relative overflow-hidden">
          {/* Left: Decorative Blobs & Main Image */}
          <div className="relative w-full max-w-[320px] aspect-square shrink-0">
            {/* Colorful Blobs */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-100 rounded-full opacity-60 animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#e0f7f7] rounded-full opacity-80" />
            <div className="absolute bottom-0 -right-4 w-20 h-20 bg-[#ffe4d6] rounded-full opacity-70" />
            
            <div className="relative w-full h-full rounded-full overflow-hidden border-[12px] border-white shadow-2xl z-10">
              <Image
                src={currentStudent.mainImage}
                alt={currentStudent.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Middle: Feedback Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-[#2d0a2d]">
                {currentStudent.name}
              </h3>
              <p className="text-gray-500 font-medium text-lg">
                {currentStudent.email}
              </p>
            </div>

            <div className="space-y-4 max-w-xl mx-auto lg:mx-0">
              {currentStudent.feedback.map((text, idx) => (
                <p key={idx} className="text-gray-400 leading-relaxed text-lg">
                  {text}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
              <button className="w-10 h-10 flex items-center justify-center bg-[#f0f2f5] hover:bg-[#e4e6eb] text-[#1877f2] rounded-full transition-colors">
                <Facebook className="w-6 h-6 fill-current" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full transition-transform hover:scale-110">
                <Instagram className="w-6 h-6" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full transition-transform hover:scale-110">
                <TikTokIcon />
              </button>
            </div>
          </div>

          {/* Right: Thumbnails Stack */}
          <div className="hidden lg:flex flex-col gap-5 shrink-0">
            {thumbnails.map((src, idx) => (
              <div
                key={idx}
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md hover:scale-110 transition-transform cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Student ${idx + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentFeedback;