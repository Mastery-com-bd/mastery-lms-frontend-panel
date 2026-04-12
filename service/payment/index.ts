/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../auth";

export const createEnrollment = async (enrollmentData: any) => {
  const token = (await getAccesstoken()) as string;

  if (!token) {
    return { success: false, message: "Unauthorized. Please login first." };
  }

  try {
    const res = await fetch(`${config.next_public_server_url}/payment/enrollment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(enrollmentData),
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const initiatePayment = async (paymentId: string, paymentData: any) => {
  const token = (await getAccesstoken()) as string;

  if (!token) {
    return { success: false, message: "Unauthorized. Please login first." };
  }

  try {
    const res = await fetch(`${config.next_public_server_url}/payment/surjopay/${paymentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(paymentData),
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
