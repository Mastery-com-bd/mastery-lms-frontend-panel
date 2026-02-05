/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAccesstoken } from "@/service/auth";


export const getProfile = async () => {
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
                    tags: ["Profile"],
                    revalidate: 30,
                },
            },
        );
        const result = await res.json();

        console.log("Profile Data :", result)
        return result;
    } catch (error: any) {
        return Error(error);
    }
};
