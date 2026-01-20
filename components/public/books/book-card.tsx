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

const BookCard = ({
  image,
  title,
  price,
  originalPrice,
  isSale = true,
  currency = "BDT",
}: BookCardProps) => {
  return (
    <div className="group relative w-full max-w-[320px] bg-white rounded-[2rem] p-3 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(204,0,0,0.12)] border border-border hover:border-gray-100 flex flex-col h-full overflow-hidden">
      {/* Top Section: Image & Interactive Layer */}
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-[1.5rem] bg-[#fdfdfd] flex items-center justify-center">
       
        {isSale && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-white/80 backdrop-blur-md text-[#CC0000] text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest border border-white/20">
              Sale
            </span>
          </div>
        )}

        {/* Floating Actions */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 translate-x-14 group-hover:translate-x-0 transition-transform duration-300">
          <button className="p-2.5 bg-white rounded-full shadow-md hover:bg-[#CC0000] hover:text-white transition-all duration-300 text-gray-600">
            <Heart className="h-4 w-4" />
          </button>
          <button className="p-2.5 bg-white rounded-full shadow-md hover:bg-[#CC0000] hover:text-white transition-all duration-300 text-gray-600">
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {/* Dynamic Image */}
        <Image
          src="/product-image.png"
          alt={title}
          fill
          className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Integrated Quick Add Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/5 to-transparent">
          <Button className="w-full bg-[#CC0000] hover:bg-black text-white rounded-xl h-12 font-bold shadow-lg transition-all active:scale-95">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to cart
          </Button>
        </div>
      </div>

      {/* Bottom Section: Sophisticated Typography */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex flex-col space-y-2.5">
          <h3 className="text-[#1a1a1a] font-bold text-lg leading-tight line-clamp-2 transition-colors group-hover:text-[#CC0000]">
            {title}
          </h3>
          
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-[#1a1a1a]">
              ${price} <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{currency}</span>
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through font-medium">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
        
        {/* Availability Indicator */}
        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Available</span>
          </div>
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">New Arrival</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
