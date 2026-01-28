"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

const mockCartItems = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    price: 99.99,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    category: "Development",
  },
  {
    id: "2",
    title: "Mastering UI/UX Design with Figma",
    instructor: "Jane Doe",
    price: 49.99,
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=400&h=250&fit=crop",
    category: "Design",
  },
  {
    id: "3",
    title: "Data Science and Machine Learning",
    instructor: "John Smith",
    price: 129.99,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    category: "Data Science",
  },
];

const CartComponent = () => {
  const [items, setItems] = React.useState(mockCartItems);

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group hover:border hover:bg-none hover:text-primary transition-colors">
          <ShoppingCart className="h-5 w-5 transition-colors" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <div className="bg-muted p-6 rounded-full">
                <ShoppingCart className="h-12 w-12 text-muted-foreground opacity-20" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">
                  Looks like you haven&apos;t added any courses to your cart yet.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="relative h-20 w-32 shrink-0 rounded-lg overflow-hidden border">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        By {item.instructor}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <SheetFooter className="mt-auto p-6 border-t bg-muted/30">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Tax calculated at checkout
              </p>
              <div className="grid grid-cols-1 gap-2">
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/checkout">Go to Checkout</Link>
                </Button>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">
                    Keep Shopping
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartComponent;