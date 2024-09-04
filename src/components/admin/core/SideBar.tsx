import { sideBarItems } from "@/static";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
type Props = {
  setNavActive: (navActive: boolean) => void;
  navActive: boolean;
};
const SideBar: FC<Props> = ({ setNavActive, navActive }) => {
  const path = usePathname();
  return (
    <div>
      <div className="w-full border-b">
        <div className="flex justify-between items-center">
          <h1 className=" h-14 py-3 text-2xl md:pl-10 font-semibold text-primary">
            Kdemy
          </h1>
          <X
            className=" hover:cursor-pointer md:hidden"
            onClick={() => setNavActive(!navActive)}
          />
        </div>
      </div>
      <div className=" m-3">
        {sideBarItems.map((data, i) => (
          <div className=" my-3" key={i}>
            <Link
              className={`${
                path == data.url &&
                "border-l border-3 text-primary border-l-primary"
              } flex items-center space-x-3 bg-indigo-100 dark:bg-indigo-50 dark:bg-opacity-5 text-sm px-3 py-2 rounded-md`}
              href={data.url}
            >
              <data.Icon size={22} /> <p className=" ">{data.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
