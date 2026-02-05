"use client";

import { Button } from "@/components/ui/button";
import { showError, showLoading, showSuccess } from "@/lib/toast";
import { removeFromWishlist } from "@/service/dashboard/wishlist";
import { WishlistProps } from "@/type/dashboard/wishlist";
import { Heart, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const WishlistPage = ({ wishlist }: { wishlist: WishlistProps }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRemoveFromWishlist = async (courseId: string) => {
    setLoading(true);
    showLoading("Removing from wishlist...");
    const result = await removeFromWishlist(courseId);
    if (result.success) {
      toast.dismiss();
      setLoading(false);
      showSuccess({
        message: result.message || "Successfully removed from wishlist",
      });
      router.refresh();
    } else {
      setLoading(false);
      toast.dismiss();
      showError({
        message: result.message || "Failed to remove from wishlist",
      });
    }
  };

  const handleClearWishlist = async () => {
    showError({
      message: "Add Wishlist Clear API",
    });

    // TODO: ADD Remove all item from Wishlist API call
    // setLoading(true);
    // showLoading("Clearing wishlist...");
    // const result = await removeFromWishlist("all");
    // if (result.success) {
    //   toast.dismiss();
    //   setLoading(false);
    //   showSuccess({
    //     message: result.message || "Successfully cleared wishlist",
    //   });
    //   router.refresh();
    // } else {
    //   setLoading(false);
    //   toast.dismiss();
    //   showError({
    //     message: result.message || "Failed to clear wishlist",
    //   });
    // }
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-background">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>

          <p className="text-muted-foreground mt-1">
            You have{" "}
            <span className="text-primary font-semibold">
              {wishlist.data.length} courses
            </span>{" "}
            saved for later.
          </p>
        </div>
        {wishlist.data.length > 0 && (
          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleClearWishlist()}
              disabled={loading}
              variant="outline"
              className=" rounded-none border-border text-muted-foreground  hover:bg-primary font-semibold"
            >
              Clear Wishlist
            </Button>
          </div>
        )}
      </div>

      {/* Wishlist Content */}
      <div className="bg-card rounded-none border border-border overflow-hidden">
        {wishlist.data.length > 0 && (
          <>
            {/* Table Header (Desktop) */}
            {wishlist.data.length > 0 && (
              <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-5 border-b border-border bg-muted/30 text-[11px] font-black text-muted-foreground uppercase tracking-widest">
                <div className="col-span-6">Course Details</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-4 text-right">Actions</div>
              </div>
            )}

            {/* List Items */}
            <div className="divide-y divide-border">
              {wishlist.data.length > 0 ? (
                wishlist.data.map((item) => (
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
                            <span className="ml-1 text-sm font-bold text-foreground">
                              {item.course.averageRating}
                            </span>
                          </div>
                          <span className="text-muted-foreground text-xs">
                            ({item.course.ratingsCount.toLocaleString()}{" "}
                            Reviews)
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {item.course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          By{" "}
                          <span className="font-semibold text-foreground/80">
                            {item.course.instructor?.name ||
                              "Expert Instructor"}
                          </span>
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
                      {item.course.discountPrice > 0 &&
                        item.course.price > item.course.discountPrice && (
                          <span className="text-sm text-muted-foreground line-through font-medium">
                            ${item.course.price}
                          </span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-4 flex flex-wrap lg:flex-nowrap items-center justify-start lg:justify-end gap-3">
                      <Button
                        disabled={loading}
                        onClick={() => handleRemoveFromWishlist(item.course.id)}
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                      <Button
                        disabled={loading}
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
                    <h2 className="text-2xl font-bold text-foreground">
                      Your Wishlist is Empty
                    </h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Explore our courses and save your favorites here to start
                      your learning journey.
                    </p>
                  </div>
                  <Link href="/courses">
                    <Button
                      disabled={loading}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 h-12 rounded-xl mt-4"
                    >
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
