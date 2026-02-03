import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { Quicksand } from "next/font/google";
import React from "react";

const quicksand = Quicksand({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
