"use client";
import { SwitchTheme } from "@/components/switch-theme";
import { navItems } from "@/static";
import { AlignRight, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MenuAnimation from "../menu-animation";
import AuthFormDialog from "../AuthFormDialog";
import { useSelector } from "react-redux";
import Image from "next/image";

const Header = () => {
  const path = usePathname();
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className=" shadow-md sticky top-0 inset-x-0 z-50 bg-white dark:bg-black   dark:border-b-gray-600 border-b   w-full">
      <div className=" container flex mx-auto justify-between items-center py-2">
        <Link href={"/"}>
          {" "}
          <h1 className=" dark:text-white text-2xl font-semibold">Kdemy</h1>
        </Link>
        <div className="hidden md:flex space-x-10 items-center text-lg dark:text-gray-200 text-gray-700">
          {navItems.map((data, i) => (
            <Link href={data.url} key={i}>
              <h1 className={data.url == path ? " text-primary" : ""}>
                {data.name}
              </h1>
            </Link>
          ))}
        </div>
        <div className="flex space-x-6 items-center">
          <SwitchTheme />
          {user && (
            <Link href={"/profile"}>
              <Image
                src={
                  user?.avatar
                    ? user?.avatar?.url.toString()
                    : "/images/profile.webp"
                }
                width={40}
                height={40}
                alt="profile"
                className="rounded-full border border-indigo-500"
              />
            </Link>
          )}
          {/*auth dialog */}
          <AuthFormDialog />
          <Sheet>
            <SheetTrigger asChild>
              <AlignRight className="md:hidden" />
            </SheetTrigger>
            <SheetContent>
              <MenuAnimation />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
