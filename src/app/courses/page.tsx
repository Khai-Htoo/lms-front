"use client";
import Footer from "@/components/core/Footer";
import Header from "@/components/core/Header";
import Loader from "@/components/core/Loader";
import CourseCard from "@/components/courses/courseCard";
import { Button } from "@/components/ui/button";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { data, isSuccess, isLoading } = useGetAllCourseQuery({});
  const [categories, setCategories] = useState<any>(null);
  const [category, setCategory] = useState("all");
  const [courses, setCourses] = useState([]);
  const search = useSearchParams();

  useEffect(() => {
    if (data) {
      if (search.get("name")) {
        const course = data?.result.filter((d: any) =>
          d.name.toLowerCase().includes(search.get("name")!.toLowerCase())
        );
        course?.length > 0 ? setCourses(course) : setCourses([]);
      } else {
        setCourses(data?.result);
      }
    }
    if (category == "all") {
      setCourses(data?.result);
    } else {
      setCourses(data?.result.filter((d: any) => d.category == category));
    }
    if (isSuccess) {
      setCategories(
        Array.from(new Set(data?.result.map((d: any) => d.category)))
      );
    }
  }, [data, search, isSuccess, category]);

  return (
    <div className=" w-full">
      <Header />

      {isLoading ? (
        <div className=" w-full flex items-center h-screen justify-center">
          <Loader />
        </div>
      ) : (
        <div className=" min-h-[600px] container mx-auto md:mt-10">
          <div className=" mb-3 flex space-x-3">
            <Button
              onClick={() => setCategory("all")}
              className={`${
                category == "all" && "bg-primary text-white hover:bg-primary"
              }`}
              variant={"secondary"}
            >
              All
            </Button>
            {categories &&
              categories.map((c: any, i: any) => (
                <Button
                  onClick={() => setCategory(c)}
                  className={`${
                    category == c && "bg-primary text-white hover:bg-primary"
                  }`}
                  variant={"secondary"}
                  key={i}
                >
                  {c}
                </Button>
              ))}
          </div>
          {!!courses?.length ? (
            <div className=" w-full grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {courses.map((course: any, i: any) => (
                <CourseCard course={course} key={i} />
              ))}
            </div>
          ) : (
            <Image
              src={"/images/No Data Found.jpeg"}
              alt="data not found"
              width={1000}
              height={1000}
              className=" w-full md:h-[600px]"
            />
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};
export default Page;
