/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAccesstoken } from "../auth";

export const getSupportRequests = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/support/my-requests`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Support"],
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

export const enrollmentWithCourse = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/enrollment/my-enrollments-with-courses`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["EnrollmentWithCourse"],
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

interface CreateSupportPayload {
  enrollmentId: string;
  subject: string;
  description: string;
  priority: string;
}

export const createSupport = async ({payload}: {payload: CreateSupportPayload}) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/support`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });


    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
