/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAccesstoken } from "@/service/auth";


export const getMyLiveClasses = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/live-class/my-live-classes`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["MyLiveClasses"],
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
