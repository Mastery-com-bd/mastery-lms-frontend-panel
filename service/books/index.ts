/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { buildParams } from "@/utills/paramsBuilder";

export type TQuery = {
  [key: string]: string | string[] | number | undefined;
};

export const getAllBooks = async (query?: TQuery) => {
  try {
    const res = await fetch(
      `${config.next_public_server_url}/product/with-categories?${buildParams(query)}`,
      {
        method: "GET",
        next: {
          tags: ["Product"],
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
