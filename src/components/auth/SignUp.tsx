"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signUpSchema } from "@/validations";
import { z } from "zod";
import CustomForm from "../CustomForm";
import { FC, useEffect } from "react";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import Loader from "../core/Loader";
type Props = {
  setAuthForm: (authForm: string) => void;
};
const SignUp: FC<Props> = ({ setAuthForm }) => {
  const [register, { isSuccess, data, isLoading, error }] =
    useRegisterMutation();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    register(values);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      setAuthForm("activate");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.msg);
      }
    }
  }, [isSuccess, error]);
  return (
    <div className=" py-5">
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
          <CustomForm
            name="password"
            label="Password"
            control={form.control}
            fieldType="password"
          />
          <Button type="submit" className="w-full">
            {isLoading ? <Loader /> : "Submit"}
          </Button>

          <p className=" text-center dark:text-gray-200">
            Already Have any account?
            <Button onClick={() => setAuthForm("login")} variant={"link"}>
              Sign In
            </Button>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
