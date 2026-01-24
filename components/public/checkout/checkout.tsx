"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const checkoutSchema = z.object({
  customer_name: z.string().min(1, "Full name is required"),
  customer_email: z.string().email("Invalid email address"),
  customer_phone: z.string().min(1, "Phone number is required"),
  customer_address: z.string().min(1, "Address is required"),
  customer_city: z.string().min(1, "City is required"),
  couponCode: z.string().optional(),
});

const Checkout = ({ courseId }: { courseId: string }) => {

    const router = useRouter();

    if(!courseId) {
        router.push("/");
    }

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      customer_address: "",
      customer_city: "",
      couponCode: "",
    },
  });

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if(!data.success) {
        router.push("/login");
      }

    };
    getUser();
    
  }, [router]);

  const onSubmit = (values: z.infer<typeof checkoutSchema>) => {
    console.log("Checkout data:", values);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a]">
            Complete Your Enrollment
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Review your course details and select your preferred payment gateway
            to complete your enrollment. Don&apos;t forget to apply you promo
            code (If you have any).
          </p>
        </div>

        {/* Main Content Grid */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Customer Info & Course */}
            <div className="lg:col-span-7 space-y-6">
              {/* Customer Information Card */}
              <Card className="border-gray-100 shadow-sm rounded-none">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-lg font-bold text-[#1a1a1a] border-b border-gray-50 pb-4">
                    Customer Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="customer_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Full Name"
                              className="h-12 rounded-none border-gray-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customer_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email Address"
                              type="email"
                              className="h-12 rounded-none border-gray-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customer_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Phone Number"
                              className="h-12 rounded-none border-gray-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customer_city"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="City"
                              className="h-12 rounded-none border-gray-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="customer_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Full Address"
                            className="h-12 rounded-none border-gray-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="border-gray-100 shadow-sm rounded-none overflow-hidden">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                    <h2 className="text-lg font-bold text-[#1a1a1a]">
                      Courses 03
                    </h2>
                  </div>

                  {/* Course Item */}
                  <div className="flex gap-4 items-start">
                    <div className="relative w-24 h-16 rounded overflow-hidden shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=200"
                        alt="Course Thumbnail"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-medium text-[#1a1a1a] leading-snug">
                        Math with practical game-play
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[#CC0000] font-bold">$32.00</span>
                        <span className="text-gray-300 line-through text-sm">
                          $62.00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Section */}
                  <div className="pt-6 border-t border-gray-50 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      Coupon
                    </h3>
                    <div className="flex gap-0">
                      <FormField
                        control={form.control}
                        name="couponCode"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Enter Code"
                                className="h-12 rounded-none border-gray-200 focus:ring-0 focus:border-gray-300"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        onClick={() =>
                          console.log(
                            "Applying coupon:",
                            form.getValues("couponCode"),
                          )
                        }
                        className="h-12 px-8 bg-[#d98c8c] hover:bg-[#c97b7b] text-white font-semibold rounded-none transition-colors"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <Card className="border-gray-100 shadow-sm rounded-none">
                <CardContent className="p-8 space-y-8">
                  <h2 className="text-xl font-bold text-[#1a1a1a]">
                    Order Summery
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Subtotal</span>
                      <span className="text-[#1a1a1a]">$61.97 BDT</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Coupon Discount</span>
                      <span className="text-[#1a1a1a]">8%</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex justify-between items-baseline">
                    <span className="text-xl font-bold text-[#1a1a1a]">
                      Total:
                    </span>
                    <span className="text-3xl font-black text-[#1a1a1a]">
                      $75.00 USD
                    </span>
                  </div>

                  <div className="space-y-6 pt-4 text-center">
                    <div className="relative h-12 w-32 mx-auto">
                      <Image
                        src="/shurjo-pay.png"
                        alt="shurjoPay"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-14 bg-[#CC0000] hover:bg-[#B30000] text-white font-bold text-lg rounded-none shadow-lg shadow-red-100 transition-all active:scale-[0.98]"
                    >
                      Complete Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
