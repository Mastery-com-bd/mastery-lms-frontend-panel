/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
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
import { signUp } from "@/service/auth";
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

export type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
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

  const onSubmit = async (values: RegisterFormValues) => {
    const toastId = toast.loading("creating account...");
    try {
      const res = await signUp(values);
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        form.reset();
        router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
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
    <div className="w-full max-w-[1440px] mx-auto min-h-[calc(100vh-100px)] flex items-center justify-center p-4">
      <div className="w-full max-w-[1100px] bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row h-full max-h-[750px] relative">

        {/* Left Side Background */}
        <div className="hidden md:flex relative w-full md:w-[45%] bg-gradient-to-b from-[#1A1A1A] to-[#8B0000] flex-col justify-center items-center text-center p-10 overflow-hidden">
          {/* Decorative shapes / hills matching image vibe slightly */}
          <div className="absolute w-[150%] h-[50%] bg-[#D90000] rounded-[100%] -bottom-20 opacity-30 pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-xs mb-8 mt-auto">
            <Image
              src="/auth/SignUp.png"
              alt="Sign Up Asset"
              width={600}
              height={600}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <div className="relative z-10 space-y-4 mb-2">
            <h2 className="text-[28px] font-semibold text-white tracking-wide">Welcome Page</h2>
            <p className="text-white/80 text-[13px] leading-relaxed max-w-[90%] mx-auto font-light">
              We guide our users through personalized courses and top-notch materials. Join us to begin your journey and elevate your knowledge today!
            </p>
          </div>

          <div className="relative z-10 mt-auto pt-10 flex flex-col items-center gap-4 w-full">
            <div className="flex items-center gap-2 w-full justify-center">
              <span className="w-10 h-px bg-white/20"></span>
              <span className="text-white/50 text-[10px] uppercase tracking-widest font-semibold flex-shrink-0">GET CONNECTED WITH</span>
              <span className="w-10 h-px bg-white/20"></span>
            </div>
            <div className="flex gap-4">
              <button type="button" className="w-9 h-9 rounded-full bg-[#1DA1F2] border-none flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </button>
              <button type="button" className="w-9 h-9 rounded-full bg-[#DB4437] border-none flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z" /></svg>
              </button>
              <button type="button" className="w-9 h-9 rounded-full bg-[#4267B2] border-none flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-[55%] bg-white p-8 sm:p-12 pb-14 relative flex flex-col justify-center">

          <div className="max-w-md w-full mx-auto mt-6 lg:mt-6">
            <h1 className="text-[36px] font-semibold text-gray-900 mb-10 tracking-tight">Register</h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Full Name"
                          disabled={form.formState.isSubmitting}
                          className="h-9 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#D90000] transition-colors md:text-[14px] placeholder:text-gray-300 font-medium shadow-none outline-none"
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
                    <FormItem className="space-y-2">
                      <FormLabel className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Email"
                          type="email"
                          disabled={form.formState.isSubmitting}
                          className="h-9 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#D90000] transition-colors md:text-[14px] placeholder:text-gray-300 font-medium shadow-none outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="********"
                              type={showPassword ? "text" : "password"}
                              disabled={form.formState.isSubmitting}
                              className="h-9 px-0 pr-8 border-0 border-b border-gray-300 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#D90000] transition-colors md:text-[14px] placeholder:text-gray-300 font-medium shadow-none outline-none"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="absolute inset-y-0 right-0 flex items-center px-1 text-gray-400 hover:text-[#D90000] outline-none"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
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
                      <FormItem className="space-y-2">
                        <FormLabel className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="********"
                              type={showConfirmPassword ? "text" : "password"}
                              disabled={form.formState.isSubmitting}
                              className="h-9 px-0 pr-8 border-0 border-b border-gray-300 rounded-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#D90000] transition-colors md:text-[14px] placeholder:text-gray-300 font-medium shadow-none outline-none"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword((prev) => !prev)}
                              className="absolute inset-y-0 right-0 flex items-center px-1 text-gray-400 hover:text-[#D90000] outline-none"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-6 flex flex-col gap-8">
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem className="flex gap-3 items-start space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 h-[18px] w-[18px] rounded-[3px] bg-[#D90000] border-none text-white focus:ring-[#D90000] data-[state=checked]:bg-[#D90000] shadow-none"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-tight pt-px">
                          <FormLabel className="text-[12px] text-gray-500 font-medium cursor-pointer">
                            I agree All the Statements in <br />
                            <Link href="/terms" className="text-[#D90000] font-bold hover:underline">
                              Terms of service
                            </Link>
                          </FormLabel>
                          <FormMessage className="text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 mt-2 bg-[#D90000] hover:bg-[#B30000] text-white text-[14px] font-medium rounded-lg shadow-md shadow-[#D90000]/30 transition-transform active:scale-[0.98]"
                    disabled={form.formState.isSubmitting}
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </Form>

          </div>
        </div>
      </div>
    </div>
  );
}
