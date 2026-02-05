
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAccesstoken } from "@/service/auth";

export const markLessonAsCompleted = async ({ lessonId }: { lessonId: string }) => {
    const token = (await getAccesstoken()) as string;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/lesson/${lessonId}/watch`, {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });


        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

