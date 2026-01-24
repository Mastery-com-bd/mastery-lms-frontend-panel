import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const InstructorCard = ({ fullName, profilePhoto, bio }: { fullName: string; profilePhoto: string; bio: string }) => {
  return (
    <div className="relative pt-24">
      <div className="bg-white p-8 pt-32 text-center shadow-[0_5px_10px_rgba(0,0,0,0.3)] transition-all duration-500">
        {/* Overlapping Image */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-64 h-64 shadow-2xl transition-transform duration-700">
          <Image
            src={profilePhoto}
            alt={fullName}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="space-y-4 max-w-70 mx-auto mt-5">
          <h3 className="text-2xl font-bold text-[#1e1b4b] tracking-tight">{fullName}</h3>
          <p className="text-[#64748b] leading-relaxed text-base font-medium">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
};

interface InstructorProps {
  id: string;
  profilePhoto: string;
  fullName: string;
  bio: string;
}

const CourseInstractor = () => {

  const [instractor, setInstructors] = useState<InstructorProps[]>([])

/*   const instructors = [
    {
      name: "Jane Cooper",
      image: "/instractor/instractor1.png",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      name: "Adam",
      image: "/instractor/instractor2.png",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      name: "Tomara",
      image: "/instractor/instractor3.png",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      name: "Jane Cooper",
      image: "/instractor/instractor1.png",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      name: "Jane Cooper",
      image: "/instractor/instractor1.png",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      name: "Jane Cooper",
      image: "/instractor/instractor1.png",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
  ]; */

   useEffect(() => {
      const getUser = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/instructors`, {
          method: "GET",
          credentials: "include",
        });
        const { data, meta } = await res.json();
        setInstructors(data)
        // setInstructors(data);
        // setMeta({
        //   limit: meta?.limit || 0,
        //   total: meta?.total || 0,
        //   page: meta?.page || 0,
        // });
        console.log("Instructors:", data, meta);
      };
      getUser();
    }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">
            Classes tought by experts
          </h2>
          <Link
            href="/instructors"
            className="flex items-center gap-2 px-6 py-2 bg-[#fff1f1] hover:bg-[#ffe4e4] text-[#CC0000] font-bold rounded-full transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4 " />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {instractor.map((instructor, index) => (
            <InstructorCard key={index} {...instructor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseInstractor;