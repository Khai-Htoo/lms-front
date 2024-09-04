import CourseAnalythic from "@/components/admin/charts/CourseAnalythic";
import UserAnalythic from "@/components/admin/charts/UserAnalythic";

const page = () => {
  return (
    <div className=" w-full mx-3 space-y-6">
      <UserAnalythic />
      <CourseAnalythic />
    </div>
  );
};

export default page;
