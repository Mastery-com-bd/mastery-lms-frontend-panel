/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAccesstoken } from "../auth";




export const getMe = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["getMe"],
          revalidate: 30,
        },
      },
    );
    const result = await res.json();
     console.log("Get Me Response: ", result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
