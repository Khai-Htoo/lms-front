"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { loginSchema } from "@/validations";
import { z } from "zod";
import CustomForm from "../CustomForm";
import { FC, useEffect } from "react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { GithubIcon } from "lucide-react";
import Loader from "../core/Loader";
type Props = {
  setAuthForm: (authForm: string) => void;
};
const Login: FC<Props> = ({ setAuthForm }) => {
  const [login, { isLoading, isSuccess, data, error }] = useLoginMutation();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login(values);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      redirect("/");
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
    <div className=" py-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <CustomForm
            name="email"
            label="Email"
            control={form.control}
            fieldType="text"
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
          <form className=" w-full">
            <Button variant={"outline"} className=" w-full">
              <GithubIcon className=" mr-3" />
              <span className=" text-gray-500"> Continue with Github</span>
            </Button>
          </form>
          <p className=" text-center md:text-gray-200">
            Not have any account?
            <Button onClick={() => setAuthForm("signUp")} variant={"link"}>
              Sign Up
            </Button>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Login;
