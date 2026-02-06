/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAccesstoken } from "@/service/auth";


export const getMyWishlist = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["MyWishlist"],
          revalidate: 30,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const addToWishlist = async (courseId: string) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
        next: {
          tags: ["addToWishlist"],
          revalidate: 30,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const removeFromWishlist = async (courseId: string) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist/${courseId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["MyWishlist"],
          revalidate: 30,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
