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

export const getFeaturedCourses = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_server_url}/course/featured`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["FeaturedCourses"],
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

export const getPublishedCourses = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_server_url}/course/published?sortBy=enrolledCount&sortOrder=desc&limit=10`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["PublishedCourses"],
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

export const StudentReport = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_server_url}/reports/student`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["ProfileStats"],
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
