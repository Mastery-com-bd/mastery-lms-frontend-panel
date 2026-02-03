/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { login } from "@/service/auth";
import { useUser } from "@/provider/AuthProvider";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState<string | null>(null);
  const { refetchUser, setIsLoading } = useUser();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectParam = params.get("redirectPath");
    if (redirectParam) {
      Promise.resolve().then(() => {
        setRedirect(redirectParam);
      });
    }
  }, []);

  const onSubmit = async (values: LoginFormValues) => {
    const toastId = toast.loading("logging in");
    try {
      const res = await login(values);
      if (res?.success) {
        setIsLoading(false);
        await refetchUser();
        toast.success(res?.message, { id: toastId, duration: 3000 });
        form.reset();
        router.push(redirect ? redirect : "/dashboard");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="max-w-360 mx-auto max-h-screen h-full flex items-center">
      <div className="w-1/2 z-20 flex items-center text-lg font-medium">
        <Image
          src="/auth/login.png"
          alt="Logo"
          width={800}
          height={2000}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="lg:p-8 w-1/2">
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-162">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-[40px] leading-12 font-semibold">
              Log in to your account
            </h1>
          </div>

          <Card className="border-none shadow-none">
            <CardContent className="grid gap-6 p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-0">
                        <FormLabel className="text-[16px] mb-0.5 leading-5.5 h-5.5 font-normal">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Username or email address..."
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={form.formState.isSubmitting}
                            className="h-12 text-lg px-4 border-gray-200 rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-0">
                        <FormLabel className="text-[16px] mb-0.5 leading-5.5 h-5.5 font-normal">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Password"
                              type={showPassword ? "text" : "password"}
                              disabled={form.formState.isSubmitting}
                              className="h-12 text-lg px-4 pr-12 border-gray-200 rounded-none"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? (
                                <EyeOff className="h-6 w-6" />
                              ) : (
                                <Eye className="h-6 w-6" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="h-6 w-6 border-gray-300"
                      />
                      <label
                        htmlFor="remember"
                        className="text-lg text-gray-400 font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-lg text-gray-400 font-normal hover:text-[#D90000]"
                    >
                      Forgot Password?
                    </Link>
                    <Button
                      className="h-14 sm:w-50 px-8 bg-[#D90000] hover:bg-[#B30000] text-white text-xl font-bold rounded-none flex items-center gap-4"
                      disabled={form.formState.isSubmitting}
                    >
                      Log In
                      <ArrowRight className="h-6 w-6" />
                    </Button>
                  </div>
                </form>
              </Form>

              <p className="text-gray-400 font-medium flex justify-center gap-2">
                <span>New to this site?</span>
                <Link className="text-[#D90000]" href="/signUp">
                  Sign Up
                </Link>
              </p>

              <div className="relative py-4 ">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm uppercase">
                  <span className="bg-white px-4 text-gray-400 font-medium tracking-widest">
                    SIGN IN WITH
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <Button variant="outline" className="rounded-none p-0">
                  <div className="border-r h-full flex justify-center items-center px-4">
                    <svg className="h-6 w-6" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>{" "}
                  <span className="px-6">Google</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
