"use client";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import CourseCard from "./courseCard";

const Courses = () => {
  const { data, isLoading } = useGetAllCourseQuery({});

  if (isLoading) {
    return <div>Loading...</div>; // Optionally, you can include a loader or message
  }

  return (
    <div>
      <div className="w-full mb-5 md:mb-20">
        <h1 className="text-2xl md:text-4xl font-semibold text-center">
          Expand Your Career <span className="text-gradient">Opportunity</span>
        </h1>
        <h1 className="text-2xl md:text-4xl font-semibold text-center">
          With Our Courses
        </h1>
      </div>
      <div className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.result.map((course: any, i: any) => (
          <CourseCard course={course} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
