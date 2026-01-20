import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import Image from "next/image";
import React from "react";

interface BookCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  isSale?: boolean;
  currency?: string;
}

const BookCardV2 = ({
  image,
  title,
  price,
  originalPrice,
  isSale = true,
  currency = "BDT",
}: BookCardProps) => {
  return (
    <div className="group relative w-full max-w-160 bg-white rounded-[4rem] p-6 transition-all duration-500 hover:shadow-[0_40px_100px_rgba(204,0,0,0.15)] border border-border hover:border-gray-100 flex flex-col h-full overflow-hidden">
      {/* Top Section: Image & Interactive Layer */}
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-[3rem] bg-[#fdfdfd] flex items-center justify-center">
        {/* Modern Sale Badge */}
        {isSale && (
          <div className="absolute top-8 left-8 z-20">
            <span className="bg-white/80 backdrop-blur-md text-[#CC0000] text-sm font-black px-6 py-3 rounded-full shadow-sm uppercase tracking-widest border border-white/20">
              Sale
            </span>
          </div>
        )}

        {/* Floating Actions */}
        <div className="absolute top-8 right-8 z-20 flex flex-col gap-4 translate-x-28 group-hover:translate-x-0 transition-transform duration-300">
          <button className="p-5 bg-white rounded-full shadow-md hover:bg-[#CC0000] hover:text-white transition-all duration-300 text-gray-600">
            <Heart className="h-8 w-8" />
          </button>
          <button className="p-5 bg-white rounded-full shadow-md hover:bg-[#CC0000] hover:text-white transition-all duration-300 text-gray-600">
            <Eye className="h-8 w-8" />
          </button>
        </div>

        {/* Dynamic Image */}
        <Image
          src={"/product-image.png"}
          alt={title}
          fill
          className="object-contain p-16 group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Integrated Quick Add Button */}
        <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/5 to-transparent">
          <Button className="w-full bg-[#CC0000] hover:bg-black text-white rounded-2xl h-24 text-2xl font-bold shadow-lg transition-all active:scale-95">
            <ShoppingCart className="mr-4 h-8 w-8" />
            Add to cart
          </Button>
        </div>
      </div>

      {/* Bottom Section: Sophisticated Typography */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex flex-col space-y-5">
          <h3 className="text-[#1a1a1a] font-bold text-3xl leading-tight line-clamp-2 transition-colors group-hover:text-[#CC0000]">
            {title}
          </h3>

          <div className="flex items-center gap-6">
            <span className="text-4xl font-black text-[#1a1a1a]">
              ${price}{" "}
              <span className="text-lg font-bold text-gray-400 uppercase tracking-tighter">
                {currency}
              </span>
            </span>
            {originalPrice && (
              <span className="text-xl text-gray-400 line-through font-medium">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Availability Indicator */}
        <div className="mt-10 pt-8 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-black text-green-600 uppercase tracking-widest">
              Available
            </span>
          </div>
          <span className="text-sm font-black text-gray-300 uppercase tracking-widest">
            New Arrival
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCardV2;
