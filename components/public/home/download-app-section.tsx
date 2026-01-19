import Image from "next/image";
import React from "react";

const steps = [
  "Download our app",
  "Explore and Sign Up",
  "Customize preferences for a personalized learning",
  "Dive into Playful Learning",
  "Track Progress and Celebrate Achievements",
  "Stay Connected & Enjoy the Benefits of MiNi Online Skills",
];

const DownloadApp = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-tight">
                How it works: <br />
                Downloading MiNi Online Skills
              </h2>
              <p className="text-gray-600 text-lg font-medium leading-relaxed max-w-xl">
                Discover the magic of MiNi Online Skills in just a few simple steps!
                Download the app and unlock a world where learning meets fun. All
                designed to captivate young minds and make education an exciting journey.
              </p>
            </div>

            {/* Steps List */}
            <ul className="space-y-6">
              {steps.map((step, index) => (
                <li key={index} className="flex items-center gap-4 group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#b23b3b] text-white font-bold shrink-0 text-sm">
                    {index + 1}
                  </div>
                  <span className="text-[#1a1a1a] font-semibold text-lg leading-tight">
                    {step}
                  </span>
                </li>
              ))}
            </ul>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="transition-transform hover:scale-105">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  width={160}
                  height={48}
                  className="h-12 w-auto"
                />
              </button>
              <button className="transition-transform hover:scale-105">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  width={160}
                  height={48}
                  className="h-12 w-auto"
                />
              </button>
            </div>
          </div>

          {/* Right Visual (Phone Mockup) */}
          <div className="flex-1 relative w-full max-w-150 aspect-4/5 lg:aspect-auto lg:h-200">
            {/* Background Blob Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[110%] bg-gray-50 rounded-[100px] rotate-[-10deg] -z-10" />
            
            <div className="relative w-full h-full">
              <Image
                src="/phone-Mockup.png"
                alt="MiNi Online Skills App Mockup"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
              
              {/* Decorative Star Element (from screenshot) */}
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;