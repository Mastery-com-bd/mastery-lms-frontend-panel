"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";

interface WishlistItem {
  id: string;
  title: string;
  thumbnail: string;
  rating: number;
  reviews: number;
  instructor: string;
  price: number;
  originalPrice?: number;
}

interface WishlistModalProps {
  items?: WishlistItem[];
}

const mockWishlistData: WishlistItem[] = [
  {
    id: "1",
    title: "Math with practical game-play",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=300",
    rating: 4.6,
    reviews: 451444,
    instructor: "Iman • Sam",
    price: 37.00,
    originalPrice: 49.00,
  },
  {
    id: "2",
    title: "English speaking masterclass",
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=300",
    rating: 4.8,
    reviews: 451444,
    instructor: "Nissan",
    price: 24.00,
  },
  {
    id: "3",
    title: "ICT - The Complete Guide (2026 Edition)",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300",
    rating: 4.7,
    reviews: 451444,
    instructor: "Irfan hasan",
    price: 13.00,
  },
];

const WishlistModal = ({ items = mockWishlistData }: WishlistModalProps) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
        <div className="col-span-6">Course</div>
        <div className="col-span-2 text-center">Prices</div>
        <div className="col-span-4 text-center">Action</div>
      </div>

      {/* List Items */}
      <div className="divide-y divide-gray-100">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 items-center group hover:bg-gray-50/30 transition-colors"
            >
              {/* Course Info */}
              <div className="md:col-span-6 flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-32 h-20 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <div className="flex items-center text-[#CC0000] font-bold">
                      <Star className="w-3 h-3 fill-current mr-1" />
                      {item.rating}
                    </div>
                    <span>({item.reviews.toLocaleString()} Review)</span>
                  </div>
                  <h3 className="font-bold text-[#1a1a1a] line-clamp-1 group-hover:text-[#CC0000] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Course by: <span className="font-medium text-gray-700">{item.instructor}</span>
                  </p>
                </div>
              </div>

              {/* Prices */}
              <div className="md:col-span-2 flex items-center md:justify-center gap-2">
                <span className="text-xl font-bold text-[#CC0000]">
                  ${item.price.toFixed(2)}
                </span>
                {item.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="md:col-span-4 flex flex-wrap md:flex-nowrap items-center justify-end gap-3">
                <Button
                  variant="ghost"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 h-10 rounded-lg"
                >
                  Add To Cart
                </Button>
                <Button
                  className="bg-[#CC0000] hover:bg-[#B30000] text-white font-bold px-6 h-10 rounded-lg shadow-md shadow-red-100"
                >
                  Enroll Now
                </Button>
                <Button
                  size="icon"
                  className="bg-[#fff1f1] hover:bg-[#ffe4e4] text-[#CC0000] h-10 w-10 rounded-lg shrink-0"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-500">
            Your wishlist is empty.
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistModal;