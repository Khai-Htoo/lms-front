"use client";

import CourseTable from "@/components/admin/course/CourseTable";
import Loader from "@/components/core/Loader";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
const Page = () => {
  const { isLoading, data, refetch } = useGetAllCourseQuery({});
  return (
    <div>
      {isLoading ? (
        <div className=" flex justify-center items-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <CourseTable courses={data.result} refetch={refetch} />
      )}
    </div>
  );
};
export default Page;
