"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Star, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import Link from "next/link";

interface WishlistResponseItem {
  id: string;
  course: {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
    discountPrice: number;
    averageRating: number;
    ratingsCount: number;
    instructor: { name: string } | null;
    category: {
      name: string;
    };
  };
}

const WishlistPage = () => {
  const [items, setItems] = useState<WishlistResponseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await response.json();
        if (data.success) {
          setItems(data.data);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="p-6 space-y-8 min-h-screen bg-background">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
          {!isLoading && (
            <p className="text-muted-foreground mt-1">
              You have <span className="text-primary font-semibold">{items.length} courses</span> saved for later.
            </p>
          )}
        </div>
        {!isLoading && items.length > 0 && (
          <div className="flex items-center gap-3">
            <Button variant="outline" className=" rounded-none border-border text-muted-foreground  hover:bg-primary font-semibold">
              Clear Wishlist
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground  rounded-none font-semibold px-6 shadow-lg shadow-primary/10">
              Add All to Cart
            </Button>
          </div>
        )}
      </div>

      {/* Wishlist Content */}
      <div className="bg-card rounded-none border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground animate-pulse font-medium">Loading your wishlist...</p>
          </div>
        ) : (
          <>
            {/* Table Header (Desktop) */}
            {items.length > 0 && (
              <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-5 border-b border-border bg-muted/30 text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                <div className="col-span-6">Course Details</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-4 text-right">Actions</div>
              </div>
            )}

            {/* List Items */}
            <div className="divide-y divide-border">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 items-center group hover:bg-accent/5 transition-all duration-300"
                  >
                    {/* Course Info */}
                    <div className="lg:col-span-6 flex flex-col sm:flex-row gap-6">
                      <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 shadow-sm bg-muted">
                        <Image
                          src={item.course.thumbnail}
                          alt={item.course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-background/90 backdrop-blur-sm text-primary text-[10px] font-black px-2 py-1 rounded shadow-sm uppercase">
                            {item.course.category.name}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 py-1">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-amber-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1 text-sm font-bold text-foreground">{item.course.averageRating}</span>
                          </div>
                          <span className="text-muted-foreground text-xs">({item.course.ratingsCount.toLocaleString()} Reviews)</span>
                        </div>
                        <h3 className="font-bold text-lg text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {item.course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          By <span className="font-semibold text-foreground/80">{item.course.instructor?.name || "Expert Instructor"}</span>
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="lg:col-span-2 flex flex-col items-start lg:items-center justify-center">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-primary">
                          ${item.course.discountPrice || item.course.price}
                        </span>
                      </div>
                      {item.course.discountPrice > 0 && item.course.price > item.course.discountPrice && (
                        <span className="text-sm text-muted-foreground line-through font-medium">
                          ${item.course.price}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-4 flex flex-wrap lg:flex-nowrap items-center justify-start lg:justify-end gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="bg-[#F5F7FA] hover:bg-primary text-primary rounded-none font-bold h-11 px-6 flex items-center gap-2 transition-all"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add To Cart
                      </Button>
                      <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 px-8 rounded-none shadow-lg shadow-primary/10 flex items-center gap-2 transition-all active:scale-[0.98]"
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center space-y-6">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">Your Wishlist is Empty</h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Explore our courses and save your favorites here to start your learning journey.
                    </p>
                  </div>
                  <Link href="/courses">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 h-12 rounded-xl mt-4">
                      Browse Courses
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
