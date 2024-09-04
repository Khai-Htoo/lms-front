"use client";
import TeamTable from "@/components/admin/users/TeamTable";
import Loader from "@/components/core/Loader";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
const Page = () => {
  const { data, isLoading, refetch } = useGetUsersQuery({});
  const admin = data?.result.filter((data: any) => data.role == "admin");
  return (
    <>
      {isLoading ? (
        <div className=" w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <TeamTable admin={admin} user={data.result} refetch={refetch} />
        </div>
      )}
    </>
  );
};
export default Page;
