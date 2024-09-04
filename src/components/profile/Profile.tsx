import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { updateProfileSchema } from "@/validations";
import CustomForm from "../CustomForm";
import { useSelector } from "react-redux";
import { useGetAuthUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "../core/Loader";
const Profile = () => {
  const { user } = useSelector((state: any) => state.auth);

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });
  function onSubmit(values: z.infer<typeof updateProfileSchema>) {
    console.log(values);
  }
  if (!user) {
    return (
      <div className=" flex items-center justify-center w-full h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className=" w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <CustomForm
            name="name"
            label="Name"
            control={form.control}
            fieldType="text"
          />
          <CustomForm
            name="email"
            label="Email"
            control={form.control}
            fieldType="email"
          />
          <Button type="submit" size={"sm"}>
            Submit
            {/* {isLoading ? <Loader /> : "Submit"} */}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
