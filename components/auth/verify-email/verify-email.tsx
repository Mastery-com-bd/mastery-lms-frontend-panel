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
import { verifyEmail, resendOTP } from "@/service/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const verifyEmailSchema = z.object({
    otp: z.string().length(6, { message: "OTP must be exactly 6 digits" }),
});

type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

function VerifyEmailForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const form = useForm<VerifyEmailFormValues>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            otp: "",
        },
    });

    async function onSubmit(values: VerifyEmailFormValues) {
        if (!email) {
            toast.error("Email is missing. Please try registering again.");
            return;
        }

        setIsLoading(true);
        toast.loading("Verifying your email...");
        try {
            const res = await verifyEmail({ email, otp: values.otp });
            if (res.success) {
                toast.dismiss();
                toast.success("Email successfully verified!");
                setIsSuccess(true);
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                toast.dismiss();
                toast.error(res.message || "Invalid OTP. Please try again.");
            }
        } catch (error: any) {
            console.error(error);
            toast.dismiss();
            toast.error("An error occurred during verification.");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleResendOTP() {
        if (!email) {
            toast.error("Email is missing.");
            return;
        }

        setIsResending(true);
        toast.loading("Resending OTP...");
        try {
            const res = await resendOTP({ email, purpose: "email_verification" });
            if (res.success) {
                toast.dismiss();
                toast.success("OTP has been resent to your email.");
            } else {
                toast.dismiss();
                toast.error(res.message || "Failed to resend OTP.");
            }
        } catch (error: any) {
            console.error(error);
            toast.dismiss();
            toast.error("An error occurred while resending OTP.");
        } finally {
            setIsResending(false);
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
                            &ldquo;Welcome aboard! Verify your email to unlock seamless learning experiences.&rdquo;
                        </p>
                        <footer className="text-sm">Mastery LMS Support</footer>
                    </blockquote>
                </div>
            </div>

            {/* Verify Email Panel */}
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Verify Email</h1>
                        <p className="text-sm text-muted-foreground">
                            {isSuccess
                                ? "Your email has been verified."
                                : `Enter the 6-digit verification code sent to ${email || "your email"}`}
                        </p>
                    </div>

                    <Card className="border-none shadow-none">
                        <CardContent className="grid gap-4 p-0 space-y-6 mx-auto w-full">
                            {isSuccess ? (
                                <div className="text-center space-y-4">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Redirecting you to the login page...
                                    </p>
                                    <Button
                                        className="w-full bg-[#D90000] hover:bg-[#B30000] text-white"
                                        onClick={() => router.push("/login")}
                                    >
                                        Go to Login
                                    </Button>
                                </div>
                            ) : (
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                                        <FormField
                                            control={form.control}
                                            name="otp"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-1">
                                                    <FormLabel>Verification Code (OTP)</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="123456"
                                                            maxLength={6}
                                                            autoCapitalize="none"
                                                            autoComplete="off"
                                                            autoCorrect="off"
                                                            disabled={isLoading}
                                                            className="h-11 text-center text-lg tracking-widest font-semibold"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            className="h-11 bg-[#D90000] hover:bg-[#B30000] text-white w-full"
                                            disabled={isLoading}
                                        >
                                            {isLoading && (
                                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                            )}
                                            Verify Email
                                        </Button>
                                    </form>
                                </Form>
                            )}
                        </CardContent>
                        {!isSuccess && (
                            <CardFooter className="flex flex-col items-center justify-center gap-2 p-0 pt-6">
                                <p className="text-sm text-muted-foreground text-center">
                                    Didn&apos;t receive the code?
                                </p>
                                <Button
                                    variant="link"
                                    className="text-[#D90000] p-0 h-auto font-medium"
                                    onClick={handleResendOTP}
                                    disabled={isResending}
                                >
                                    {isResending ? "Resending..." : "Resend OTP"}
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <VerifyEmailForm />
        </Suspense>
    );
}
