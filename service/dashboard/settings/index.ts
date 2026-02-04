/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAccesstoken } from "@/service/auth";


export const getPaymentHistory = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/my-payments`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Payment"],
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

export const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/change-password`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["changePassword"],
          revalidate: 30,
        },
        body: JSON.stringify(payload),
      },
    );
    const result = await res.json();

    console.log("Password Change Response: ", result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

