"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    setIsLoading(true);
    console.log(values);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      toast.dismiss();
      toast.success("Password reset successful!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Brand Panel */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-[#1a1a1a]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={160}
              height={50}
              className="brightness-0 invert h-10 w-auto object-contain"
            />
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Security is our top priority. Choose a strong password to
              keep your learning journey safe.&rdquo;
            </p>
            <footer className="text-sm">Mastery LMS Security</footer>
          </blockquote>
        </div>
      </div>

      {/* Reset Password Panel */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset your password
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSuccess
                ? "Your password has been successfully updated"
                : "Please enter your new password below"}
            </p>
          </div>

          <Card className="border-none shadow-none">
            <CardContent className="grid gap-4 p-0">
              {isSuccess ? (
                <div className="text-center space-y-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      You can now sign in with your new password.
                    </p>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-[#D90000] hover:bg-[#B30000] text-white h-11"
                  >
                    <Link href="/login">Go to login</Link>
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem className="grid gap-1">
                          <FormLabel>OTP</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              disabled={isLoading}
                              className="h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="grid gap-1">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              disabled={isLoading}
                              className="h-11"
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
                        <FormItem className="grid gap-1">
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              disabled={isLoading}
                              className="h-11"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="h-11 bg-[#D90000] hover:bg-[#B30000] text-white"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      )}
                      Update Password
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            {!isSuccess && (
              <CardFooter className="flex flex-wrap items-center justify-center gap-1 p-0 pt-6">
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-[#D90000] transition-colors"
                >
                  Cancel and back to login
                </Link>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
