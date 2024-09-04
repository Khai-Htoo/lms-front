"use client";
import WatchPageSkeleton from "@/components/core/WatchSkeleton";
import { useUsersAnalythicQuery } from "@/redux/features/user/userApi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserAnalythic = () => {
  const { data, isLoading } = useUsersAnalythicQuery({});
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold text-primary ">
        User Analythic
      </h1>
      {isLoading ? (
        <WatchPageSkeleton />
      ) : (
        <div className=" w-full h-[300px] md:h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={150}
              height={400}
              data={data?.result}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
export default UserAnalythic;
