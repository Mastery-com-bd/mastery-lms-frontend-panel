"use client";
import { Button } from "@/components/ui/button";
import { addToCart, cartItem, CartItem } from "@/redux/feature/cart-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TBooks } from "@/type/books.types";
import Image from "next/image";

const BookCardV4 = ({ book }: { book: TBooks }) => {
  const currentProduct = useAppSelector(cartItem);

  const dispatch = useAppDispatch();
  const handleAdd = () => {
    const newBookData = {
      id: book?.id,
      name: book?.name,
      price: book?.price,
      productImage: book?.productImage
        ? book?.productImage
        : "/product-image.png",
      quantity: 1,
      type: "BOOK",
      stock: book?.stock,
    };
    dispatch(addToCart(newBookData as CartItem));
  };

  return (
    <div className="w-full max-w-95 mx-auto bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col p-5 relative group">
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
          src={book?.productImage || "/product-image.png"}
          alt={book?.name}
          fill
          className="object-contain"
        />
      </div>

      {/* Book Info */}
      <div className="space-y-12 flex-1 flex flex-col justify-between">
        <h3 className="text-[#CC0000] font-bold text-xl leading-snug">
          {book?.name}
        </h3>

        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1a1a1a]">
              ৳{book?.price}
            </span>
          </div>

          <Button
            onClick={handleAdd}
            className="w-full bg-[#CC0000] hover:bg-[#B30000] text-white font-bold h-12 max-w-37.5 text-lg rounded-xl transition-all duration-300"
            disabled={currentProduct?.some((item) => item.id === book.id)}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCardV4;
