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
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    console.log(values);
    setIsLoading(true);
    toast.loading("Sending Code");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      toast.dismiss();
      toast.success("Code sent to your email!");
      router.push("/reset-password");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to send code. Please try again.");    
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
              &ldquo;Don &ldquo;t worry, it happens to the best of us. We
              &ldquo;ll help you get back to your learning journey in no
              time.&rdquo;
            </p>
            <footer className="text-sm">Mastery LMS Support</footer>
          </blockquote>
        </div>
      </div>

      {/* Forgot Password Panel */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-sm:w-100">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Forgot password?
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email address and we'll send you a link to reset your password"}
            </p>
          </div>

          <Card className="border-none shadow-none">
            <CardContent className="grid gap-4 p-0  space-y-6 sm:w-87.5 mx-auto">
              {isSubmitted ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ve sent a password reset link to <br />
                    <span className="font-medium text-foreground">
                      {form.getValues("email")}
                    </span>
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try another email
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
                      name="email"
                      render={({ field }) => (
                        <FormItem className="grid gap-1">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="name@example.com"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
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
                      Send OTP
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-center gap-1 p-0 pt-6">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-[#D90000] flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
