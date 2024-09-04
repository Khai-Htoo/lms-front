"use client";
import WatchPageSkeleton from "@/components/core/WatchSkeleton";
import { useCoursesAnalythicQuery } from "@/redux/features/course/courseApi";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CourseAnalythic = () => {
  const { isLoading, data } = useCoursesAnalythicQuery({});
  console.log(data);

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold text-primary ">
        Course Analythic
      </h1>
      {isLoading ? (
        <WatchPageSkeleton />
      ) : (
        <div className=" w-full h-[300px] md:h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={150}
              height={400}
              data={data?.result}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="month" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="count" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
export default CourseAnalythic;
