"use client";
import { UserTable } from "@/components/admin/users/UserTable";
import Loader from "@/components/core/Loader";
import { useGetUsersQuery } from "@/redux/features/user/userApi";

const Page = () => {
  const { data, isLoading } = useGetUsersQuery({});

  return (
    <>
      {isLoading ? (
        <div className=" flex items-center justify-center h-screen w-full">
          <Loader />
        </div>
      ) : (
        <div>
          <UserTable data={data?.result} />
        </div>
      )}
    </>
  );
};
export default Page;
