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
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  cartItem,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/redux/feature/cart-slice";

const CartComponent = () => {
  const currentCartData = useAppSelector(cartItem);
  const dispatch = useAppDispatch();
  const totalPrice = currentCartData.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id: string) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group hover:border hover:bg-white hover:text-primary ">
          <ShoppingCart className="h-5 w-5 " />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {currentCartData.length}
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
          {currentCartData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <div className="bg-muted p-6 rounded-full">
                <ShoppingCart className="h-12 w-12 text-muted-foreground opacity-20" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">
                  Looks like you haven&apos;t added any courses to your cart
                  yet.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {currentCartData.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  {/* Image */}
                  <div className="relative h-20 w-32 shrink-0 rounded-lg overflow-hidden border">
                    <Image
                      src={item.productImage as string}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        By {item.name}
                      </p>
                    </div>

                    {/* Price + Controls */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">
                        ${item.price.toFixed(2)}
                      </span>

                      <div className="flex items-center gap-3">
                        {/* Quantity controls */}
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <Button
                            variant="outline"
                            onClick={() => handleDecrement(item?.id)}
                            className="px-2 py-1 hover:bg-muted transition cursor-pointer"
                            aria-label="Decrease quantity"
                            disabled={item?.quantity <= 1}
                          >
                            −
                          </Button>

                          <span className="px-3 text-sm font-medium">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            onClick={() => handleIncrement(item?.id)}
                            className="px-2 py-1 hover:bg-muted transition cursor-pointer"
                            aria-label="Increase quantity"
                            disabled={item?.quantity === item.stock}
                          >
                            +
                          </Button>
                        </div>

                        {/* Delete */}
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
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {currentCartData.length > 0 && (
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
                <Link href="/checkout" className="w-full">
                  <Button
                    onClick={() => console.log("clicked")}
                    className="w-full bg-primary hover:bg-primary/90 cursor-pointer"
                  >
                    Go to Checkout
                  </Button>
                </Link>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full cursor-pointer">
                    Keep Shopping
                  </Button>
                </SheetClose>
                <Button
                  className="w-full  hover:bg-primary/90 cursor-pointer"
                  onClick={handleClear}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartComponent;
