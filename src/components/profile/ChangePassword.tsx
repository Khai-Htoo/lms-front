import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { chnangePasswordSchema } from "@/validations";
import CustomForm from "@/components/CustomForm";
import { useChangePasswordMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Loader from "@/components/core/Loader";
const ChangePassword = () => {
  const [changePassword, { isLoading, isSuccess, data, error }] =
    useChangePasswordMutation();
  const form = useForm<z.infer<typeof chnangePasswordSchema>>({
    resolver: zodResolver(chnangePasswordSchema),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
      confirmPassword: "",
    },
  });
  function onSubmit({
    newPassword,
    oldPassword,
  }: z.infer<typeof chnangePasswordSchema>) {
    changePassword({ newPassword, oldPassword });
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      form.reset();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log(errorData);
        toast.error(errorData.data.msg);
      }
    }
  }, [isSuccess, error]);
  return (
    <div className=" w-full">
      <h1 className=" mb-5 text-center text-2xl font-semibold">
        Change Password
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <CustomForm
            name="oldPassword"
            label="Old Password"
            control={form.control}
            fieldType="password"
          />
          <CustomForm
            name="newPassword"
            label="New Password"
            control={form.control}
            fieldType="password"
          />
          <CustomForm
            name="confirmPassword"
            label="Confirm Password"
            control={form.control}
            fieldType="password"
          />
          <Button type="submit" className="w-full">
            {isLoading ? <Loader /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
