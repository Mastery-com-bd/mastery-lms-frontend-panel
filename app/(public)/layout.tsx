import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { Quicksand } from "next/font/google";
import React from "react";

const quicksand = Quicksand({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-white flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow overflow-hidden w-full leading-relaxed">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
