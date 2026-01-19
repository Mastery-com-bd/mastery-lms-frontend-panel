import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

interface BookCardV4Props {
  image?: string;
  title?: string;
  price?: number;
  originalPrice?: number;
  currency?: string;
}

const BookCardV4 = ({
  image = "/product-image.png",
  title = "গল্পে গল্পে ইংরেজি শিখি ও কথা বল ইংরেজিতে মন খুলে (Total 2 Books)",
  price = 840,
  originalPrice = 1000,
  currency = "BDT",
}: BookCardV4Props) => {
  return (
    <div className="max-w-95 bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col p-5 relative group">
      {/* Yellow Sale Ribbon */}
      <div className="absolute top-0 right-5 z-10">
        <div className="bg-[#FFD700] text-[#1a1a1a] font-bold px-3 py-4 rounded-b-sm shadow-sm text-sm relative">
          Sale!
          {/* Ribbon Tail/Cutout */}
          <div className="absolute bottom-2.5 left-0 w-0 h-0 border-l-19 border-l-transparent border-r-19 border-r-transparent border-t-10 border-t-[#FFD700]"></div>
        </div>
      </div>

      {/* Book Image Container */}
      <div className="relative aspect-4/5 w-full mb-8 mt-2 overflow-hidden flex items-center justify-center">
        <Image
          src={"/product-image.png"}
          alt={title}
          fill
          className="object-contain"
        />
      </div>

      {/* Book Info */}
      <div className="space-y-12 flex-1 flex flex-col justify-between">
        <h3 className="text-[#CC0000] font-bold text-xl leading-snug">
          {title}
        </h3>

        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1a1a1a]">
              ${price} {currency}
            </span>
            {originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${originalPrice}
              </span>
            )}
          </div>

          <Button 
            className="w-full bg-[#CC0000] hover:bg-[#B30000] text-white font-bold h-12 max-w-37.5 text-lg rounded-xl transition-all duration-300"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCardV4;