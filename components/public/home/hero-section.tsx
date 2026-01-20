"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Play, Star } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const HeroSection = () => {
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log("HeroSection getUser:", data);
    };
    getUser();
  }, []);


  return (
    <section className="overflow-hidden pb-12 lg:pb-20">
      <div className="container mx-auto px-4 md:px-6 ">
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 relative pt-32"
          >
            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 h-40 w-px bg-red-500 " />
            <div className="absolute top-0 left-4 h-35 w-px bg-red-500 " />
            <div className="absolute top-0 left-8 h-30 w-px bg-red-500 " />
            <div className="absolute top-0 left-12 h-20 w-px bg-red-500 " />
            <div className="absolute top-0 right-0 h-40 w-px bg-red-500 " />
            <div className="absolute top-0 right-4 h-35 w-px bg-red-500 " />
            <div className="absolute top-0 right-8 h-30 w-px bg-red-500 " />
            <div className="absolute top-0 right-12 h-20 w-px bg-red-500 " />
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight text-[#1A1A1A]">
                Transforming <br />
                education into <br />
                <span className="text-[#D90000]">adventure</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                At MiNi Online Skills, we believe in turning &quot;I have to
                learn&quot; into &quot;I get to learn&quot;. A journey filled
                with excitement that teach.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="bg-[#D90000] hover:bg-[#B30000] text-white px-8 h-14 rounded-xl font-bold text-lg shadow-lg shadow-red-500/20"
              >
                <Link href="/courses">Enroll now</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="bg-secondary/50 border-none hover:bg-secondary text-foreground px-8 h-14 rounded-xl font-bold text-lg gap-2"
              >
                <Link href="/courses">
                  <span className="text-xl">📚</span> Explore library
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg">4.8/5.0</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < 4
                          ? "fill-red-500 text-red-500"
                          : "fill-red-200 text-red-200"
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                based on 2000 reviews
              </p>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative "
          >
            {/* Grid Background */}
            <div
              className="absolute z-10 opacity-40
    bg-[linear-gradient(to_right,#e5e7eb_1px),
        linear-gradient(to_bottom,#e5e7eb_1px)]
    bg-size-[32px_32px]"
            />

            <div className="relative z-10 aspect-square max-w-125 mx-auto">
              {/* Main Image Container */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop"
                  alt="Education Adventure"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-sky-400/20">
                  <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform">
                    <Play className="h-10 w-10 text-white fill-current ml-1" />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 left-10 w-12 h-12 bg-purple-600 rotate-45 opacity-80" />
              <div className="absolute -top-4 right-10 w-6 h-6 bg-purple-500 rounded-full" />
              <div className="absolute -bottom-10 right-20 w-12 h-12 bg-red-500 rounded-full opacity-90" />
              <div className="absolute bottom-20 -right-4 w-10 h-10 bg-green-500 rounded-full" />
              <div className="absolute bottom-10 -left-10 w-12 h-12 border-4 border-red-500 rotate-12" />
            </div>

            {/* Red Blob Background */}
            <div className="absolute -bottom-10 right-0 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
