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
    <div className="max-w-[1440px] w-full mx-auto min-h-[calc(100vh-100px)] flex flex-col lg:flex-row items-center justify-center overflow-hidden">
      {/* Left side - Image / Branding */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-8">
        <Image
          src="/auth/login.png"
          alt="Login illustration"
          width={800}
          height={800}
          className="w-full max-w-xl max-h-[75vh] h-auto object-contain"
          priority
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Log in to your account
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Email address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="user@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={form.formState.isSubmitting}
                            className="h-12 bg-white rounded-lg border-gray-200 transition-all"
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
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="••••••••"
                              type={showPassword ? "text" : "password"}
                              disabled={form.formState.isSubmitting}
                              className="h-12 pr-12 bg-white rounded-lg border-gray-200 transition-all"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Options row */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="rounded-[4px] border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium text-gray-600 cursor-pointer select-none"
                      >
                        Forgot?
                      </Link>
                    </div>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-semibold text-primary hover:text-[#B30000] transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 mt-4 bg-primary hover:bg-[#B30000] text-white font-bold rounded-lg transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                    disabled={form.formState.isSubmitting}
                  >
                    Log In
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </form>
              </Form>

              <div className="mt-8 text-center text-sm">
                <span className="text-gray-500">Don&apos;t have an account? </span>
                <Link
                  href="/signUp"
                  className="font-semibold text-primary hover:text-[#B30000] transition-colors"
                >
                  Sign up
                </Link>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-50 px-4 text-gray-500 font-semibold tracking-wider">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                type="button"
                className="w-full h-12 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-all flex items-center justify-center gap-3"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
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
                Google
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
