"use client";
import Profile from "@/components/profile/Profile";
import { useGetAuthUserQuery } from "@/redux/features/api/apiSlice";
import {
  useLogoutMutation,
  useUploadProfileMutation,
} from "@/redux/features/user/userApi";
import { profileItems } from "@/static";
import { Camera, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ChangePassword from "../../components/profile/ChangePassword";
import ProtectedAuth from "@/hooks/ProtectedAuth";
import { Button } from "@/components/ui/button";
import Loader from "@/components/core/Loader";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/core/Header";

const Page = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [uploadProfile, { isLoading, isSuccess, data, error }] =
    useUploadProfileMutation();
  const [logout] = useLogoutMutation();
  const { refetch } = useGetAuthUserQuery({});

  const [active, setActive] = useState<number>(0);
  const handleUplod = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === FileReader.DONE) {
        uploadProfile({ avatar: reader.result as string });
      }
    };
    reader.onerror = (error) => {
      console.error("File reading error:", error);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log(errorData);
        toast.error(errorData.data.msg);
      }
    }
  }, [isSuccess, error]);
  return (
    <ProtectedAuth>
      <Header />
      <div className=" container mx-auto py-5 flex ">
        <div className="">
          {user?.role == "admin" && (
            <Link href={"/admin"}>
              <Button className=" w-full mb-3">
                ADMIN DASHBOARD <ChevronRight className=" ml-3" />
              </Button>
            </Link>
          )}
          <div className=" border border-slate-700 rounded-md  md:min-w-60 mr-5">
            {profileItems.map((data, i) => (
              <div
                className={`bg-gray-900 p-3 px-5 border-b flex  items-center cursor-pointer ${
                  active == i
                    ? "text-primary border-l border-l-primary"
                    : "text-gray-300"
                }`}
                onClick={() => setActive(i)}
                key={i}
              >
                {data?.icon && <data.icon size={20} className=" mr-5" />}
                {!data?.icon && (
                  <Image
                    src={
                      user?.avatar?.url
                        ? user?.avatar?.url
                        : "/images/profile.webp"
                    }
                    width={30}
                    alt="profile"
                    className=" rounded-full mr-5 border border-primary"
                    height={30}
                  />
                )}
                <span className=" hidden md:block"> {data.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className=" w-full  md:mx-36">
          {active == 0 && (
            <div>
              {isLoading && (
                <div className=" mx-auto size-20 rounded-full flex justify-center items-center  border border-primary">
                  <Loader />
                </div>
              )}
              {!isLoading && (
                <div className=" mb-3 w-full flex justify-center relative">
                  <Image
                    src={
                      user?.avatar ? user?.avatar?.url : "/images/profile.webp"
                    }
                    alt="avatar"
                    className=" rounded-full border-primary border"
                    width={80}
                    height={80}
                  />
                  <Camera className=" bg-black mt-9 p-[3px] rounded-full -ml-4 cursor-pointer" />
                  <input
                    onChange={handleUplod}
                    type="file"
                    className="w-8 mt-9 cursor-pointer  -ml-6 opacity-0"
                  />
                </div>
              )}
              <Profile />
            </div>
          )}
          {active == 1 && <ChangePassword />}
          {active == 3 && (
            <Button
              onClick={() => {
                logout({});
                redirect("/");
                refetch();
              }}
              variant={"destructive"}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </ProtectedAuth>
  );
};

export default Page;
