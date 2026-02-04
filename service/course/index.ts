/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../auth";

export const getMyCourses = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_server_url}/enrollment/my-enrollments`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["MyCourses"],
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
