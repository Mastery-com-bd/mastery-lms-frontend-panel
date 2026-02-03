/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { RegisterFormValues } from "@/components/auth/signUp/page";

type TLogin = {
  email: string;
  password: string;
};

export const signUp = async (loginData: RegisterFormValues) => {
  try {
    const res = await fetch(
      `${config.next_public_server_url as string}/auth/registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// login functionality
export const login = async (loginData: TLogin) => {
  try {
    const res = await fetch(
      `${config.next_public_server_url as string}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      },
    );
    const result = await res.json();
    if (result?.success) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result?.data?.accessToken, {
        maxAge: 60 * 60 * 24 * 1, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });

      cookieStore.set("refreshToken", result?.data?.refreshToken, {
        maxAge: 60 * 60 * 24 * 7, // 7 day
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get new token functionality
export const getNewToken = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("refreshToken")?.value;
    if (!token) {
      throw new Error("you are not authorized");
    }
    const res = await fetch(
      `${config.next_public_server_url}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get curretn user functionality
export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const logout = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    (await cookies()).delete("refreshToken");
    (await cookies()).delete("accessToken");
    return { success: true, message: "Logout successful" };
  } catch (error: any) {
    console.error("Logout error:", error);
    return { success: false, message: "logged out failed Logged out" };
  }
};

export const getAccesstoken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return accessToken;
};
