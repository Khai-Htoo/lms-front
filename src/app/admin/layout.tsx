"use client";
import Header from "@/components/admin/core/Header";
import SideBar from "@/components/admin/core/SideBar";
import React, { FC, ReactNode, useState } from "react";
type Props = {
  children: ReactNode;
};
const Layout: FC<Props> = ({ children }) => {
  const [navActive, setNavActive] = useState<boolean>(false);
  return (
    <div className=" w-full min-h-screen flex">
      <div
        className={`md:w-[220px] h-screen top-0 bottom-0 border-r fixed md:sticky md:left-0 transition-all duration-300 bg-white z-50 dark:bg-black ${
          navActive ? "left-0" : "left-[-220px] "
        }`}
      >
        <SideBar setNavActive={setNavActive} navActive={navActive} />
      </div>
      <div className="w-full flex-1 ">
        <Header setNavActive={setNavActive} navActive={navActive} />
        <div className=" p-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
