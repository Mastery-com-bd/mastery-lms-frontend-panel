import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OfferCardProps {
  discount: string;
  title: string;
  description: string;
  image: string;
}

const OfferCard = ({ discount, title, description, image }: OfferCardProps) => {
  return (
    <div className="relative aspect-square rounded-3xl overflow-hidden group cursor-pointer">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Discount Badge */}
      <div className="absolute top-6 left-6 bg-[#CC0000] text-white px-5 py-3 rounded-2xl">
        <span className="text-3xl font-bold">{discount}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
          {title}
        </h3>
        <p className="text-white/90 text-sm md:text-base leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

const CourseOffer = () => {
  const offers = [
    {
      discount: "50%",
      title: "How to ace in exam",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      image: "/offer/offer1.png",
    },
    {
      discount: "10%",
      title: "English speaking practice",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      image: "/offer/offer2.png",
    },
    {
      discount: "50%",
      title: "ICT- Practical programing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      image: "/offer/offer3.png",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">
            Top Education offers and deals
          </h2>
          <Link
            href="/offers"
            className="flex items-center gap-2 px-6 py-2 bg-[#fff1f1] hover:bg-[#ffe4e4] text-[#CC0000] font-bold rounded-full transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <OfferCard key={index} {...offer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseOffer;