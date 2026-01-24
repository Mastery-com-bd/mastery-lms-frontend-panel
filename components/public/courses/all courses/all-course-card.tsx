import { Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AllCourseCardProps {
  id: string;
  image: string;
  category: string;
  price: number;
  currency?: string;
  title: string;
  rating: number;
  studentCount: string | number;
}

const AllCourseCard = ({
  id,
  image,
  category,
  price,
  currency = "BDT",
  title,
  rating,
  studentCount,
}: AllCourseCardProps) => {
  return (
    <div className="group bg-white overflow-hidden border border-gray-100 flex flex-col h-full transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
      {/* Course Image */}
      <Link href={`/courses/${id}`} className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Course Content */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div className="flex items-center justify-between">
          <span className="bg-[#f0f0ff] text-[#4f46e5] text-[10px] font-black px-3 py-1.5  uppercase tracking-wider">
            {category}
          </span>
          <span className="text-[#CC0000] font-black text-2xl">
            ${price} {currency}
          </span>
        </div>
        <Link href={`/courses/${id}`} className="">
          <h3 className="text-[#1a1a1a] font-bold text-xl leading-tight line-clamp-2 min-h-12 hover:text-[#4f46e5] hover:underline">
            {title} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus quod distinctio accusantium molestiae doloribus aut
            laboriosam laudantium in nostrum quisquam incidunt sapiente corporis
            facilis rem repellat temporibus, consequuntur deleniti enim sequi
            expedita. Suscipit, quae error maxime vitae nisi nesciunt
            voluptatibus qui eligendi iusto labore dolorum exercitationem
            quibusdam, neque earum animi!
          </h3>
        </Link>

        {/* Card Footer */}
        <div className="pt-5 mt-auto border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-[#e5a4a4] text-[#e5a4a4]" />
            <span className="text-lg font-bold text-gray-600">
              {rating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#1a1a1a]" />
            <span className="text-lg font-bold text-[#1a1a1a]">
              {studentCount}{" "}
              <span className="text-gray-400 font-medium">students</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourseCard;
