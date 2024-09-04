"use client";
import Category from "@/components/admin/category/category";
import Loader from "@/components/core/Loader";
import { Input } from "@/components/ui/input";
import {
  useGetCategoriesQuery,
  useStoreCategoryMutation,
} from "@/redux/features/category/categoryApi";
import { Check, CircleCheck, PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { isLoading: getLoad, data, refetch } = useGetCategoriesQuery({});
  const [
    storeCategory,
    { isLoading: storeLoad, data: storeData, error, isSuccess },
  ] = useStoreCategoryMutation();
  const [active, setActive] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const handleStore = () => {
    if (title.length < 1) {
      toast.error("Title is required");
    } else {
      storeCategory({ title });
      setActive(false);
      setTitle("");
      refetch();
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(storeData.msg);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.msg);
      }
    }
  }, [isSuccess, error]);
  return (
    <>
      {getLoad && (
        <div className=" w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!getLoad && (
        <div className=" flex justify-center flex-1 mt-5">
          <div className=" px-2 w-[400px]">
            <h1 className=" text-2xl font-semibold text-center mb-3">
              Categories
            </h1>
            {data?.result.map((category: any, i: number) => (
              <div
                className=" w-full bg-gray-700 bg-opacity-15 p-3 mb-3 rounded-md"
                key={i}
              >
                <Category
                  refresh={refetch}
                  title={category.title}
                  id={category._id}
                />
              </div>
            ))}
            {active && (
              <div className=" flex items-center justify-between space-x-3">
                <Input
                  placeholder=" Enter title ...."
                  onChange={(e) => setTitle(e.target.value)}
                />
                <CircleCheck
                  onClick={handleStore}
                  className=" cursor-pointer text-primary"
                />
              </div>
            )}
            {!active ? (
              <PlusCircle
                className=" text-center w-full mt-3 cursor-pointer"
                onClick={() => setActive(!active)}
              />
            ) : (
              <X
                className=" text-center w-full mt-3 cursor-pointer"
                onClick={() => setActive(!active)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Page;
