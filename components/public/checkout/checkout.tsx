"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showError, showLoading } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const checkoutSchema = z.object({
  customerName: z.string().min(1, "Full name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(1, "Phone number is required"),
  customerAddress: z.string().min(1, "Address is required"),
  customerCity: z.string().min(1, "City is required"),
  couponCode: z.string().optional(),
});

const Checkout = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [course, setCourse] = React.useState<{
    id: string;
    price: number;
    discountPrice: number;
  } | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/course/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.data);
        console.log("Course Data: ", data.data);
      });
  }, [courseId]);

  if (!courseId) {
    router.push("/");
  }



  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerAddress: "",
      customerCity: "",
      couponCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof checkoutSchema>) => {
    showLoading("Processing payment...");
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment/enrollment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId, ...values }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log("First Request: ",data)
          await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/surjopay/${data.data.id}`,
            {
              method: "POST",
              credentials: "include",
              body: JSON.stringify(values),
            },
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              router.push(data.data.checkout_url);
            });
        });
    } catch (error) {
      console.log(error);
      toast.dismiss();
      setLoading(false);
      showError({
        message:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    }
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
                      name="customerName"
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
                      name="customerEmail"
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
                      name="customerPhone"
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
                      name="customerCity"
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
                    name="customerAddress"
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
                        <span className="text-[#CC0000] font-bold">
                          ৳{course?.discountPrice}
                        </span>
                        <span className="text-gray-500 line-through text-sm">
                          ৳{course?.price}
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
                        disabled={loading}
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
                      {course?.discountPrice ? (
                        <span className="text-[#1a1a1a] relative">
                          ৳{course.price} BDT
                          <span className="absolute left-0 top-1/2 w-full h-[2px] bg-gray-400 rotate-[-12deg]"></span>
                        </span>
                      ) : (
                        <span className="text-[#1a1a1a]">
                          ৳{course?.price} BDT
                        </span>
                      )}
                      <span className="text-[#1a1a1a]">
                        ৳{course?.discountPrice ? course?.discountPrice : course?.price} BDT
                      </span>
                    </div>
                    {/* <div className="flex justify-between text-gray-500 font-medium">
                      <span>Coupon Discount</span>
                      <span className="text-[#1a1a1a]">8%</span>
                    </div> */}
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex justify-between items-baseline">
                    <span className="text-xl font-bold text-[#1a1a1a]">
                      Total:
                    </span>
                    <span className="text-3xl font-black text-[#1a1a1a]">
                      ৳{course?.discountPrice ? course?.discountPrice : course?.price} BDT
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
                      disabled={loading}
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
