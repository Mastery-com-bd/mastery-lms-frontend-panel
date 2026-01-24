"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showError, showLoading, showSuccess } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const registerSchema = z
  .object({
    fullName: z.string().min(2, { message: "Full name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",

      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    console.log(values);
    setIsLoading(true);
    showLoading("Registering...");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      toast.dismiss();
      showSuccess({ message: "Registration successful!", duration: 5000 });
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      showError({
        message: "Registration failed. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-[1920px] mx-auto max-h-screen h-full flex items-center">
      {/* Brand Panel */}
      <div className="w-1/2 max-h-[calc(100vh-81px)] z-20 flex items-center justify-center text-lg font-medium bg-primary">
              <Image
                src="/auth/SignUp.png"
                alt="Logo"
                width={800}
                height={2000}
                className="w-full h-full object-contain"
              />
            </div>

      {/* Register Form Panel */}
      <div className="lg:p-8 w-1/2">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-150">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-[40px] font-semibold leading-12 text-[#1a1a1a]">
              Create your account
            </h1>
          </div>

          <Card className="border-none shadow-none">
            <CardContent className="grid gap-6 p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-6"
                >
                  <div className="grid gap-0.5">
                    <FormLabel className="text-[16px] font-normal">
                      Full Name
                    </FormLabel>
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Full name..."
                                disabled={isLoading}
                                className="h-12 text-lg px-4 border-gray-200 rounded-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-0.5">
                        <FormLabel className="text-[16px] font-normal">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email address"
                            type="email"
                            disabled={isLoading}
                            className="h-12 text-lg px-4 border-gray-200 rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="grid gap-0.5">
                          <FormLabel className="text-[16px] font-normal">
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Create password"
                                type={showPassword ? "text" : "password"}
                                disabled={isLoading}
                                className="h-12 text-lg px-4 pr-12 border-gray-200 rounded-none"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400"
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
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="grid gap-0.5">
                          <FormLabel className="text-[16px] font-normal">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Confirm password"
                                type={showConfirmPassword ? "text" : "password"}
                                disabled={isLoading}
                                className="h-12 text-lg px-4 pr-12 border-gray-200 rounded-none"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword((prev) => !prev)
                                }
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400"
                              >
                                {showConfirmPassword ? (
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
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex gap-0 items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="h-6 w-6 border-gray-300"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-[16px] text-gray-400 font-normal">
                              I Agree with all of your{" "}
                              <Link
                                href="/terms"
                                className="text-blue-600 hover:underline"
                              >
                                Terms & Conditions
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="h-14 px-8 bg-primary text-white text-xl font-bold rounded-none flex items-center gap-4"
                      disabled={isLoading}
                    >
                      Create Account
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm uppercase">
                  <span className="bg-white px-4 text-gray-400 font-medium tracking-widest">
                    SIGN UP WITH
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
