import Navbar from "@/components/shared/navbar";
import { Quicksand } from "next/font/google";
import React from "react";

const quicksand = Quicksand({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${quicksand.className} max-w-360 mx-auto`}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
