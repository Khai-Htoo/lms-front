import Image from "next/image";
import { FC, useEffect, useState } from "react";
import "animate.css";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import { useSelector } from "react-redux";

type Props = {
  setAuthForm: (authForm: string) => void;
};
const ActivateAcc: FC<Props> = ({ setAuthForm }) => {
  const [otp, setOtp] = useState<number | null>(null);
  const token = useSelector((state: any) => state.auth.token);

  const [activate, { isSuccess, data, error }] = useActivationMutation();
  const handleActivate = () => {
    activate({ code: otp, token });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      setAuthForm("login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.msg);
      }
    }
  }, [isSuccess, error]);
  return (
    <div className=" w-full">
      <Image
        className=" py-5 mx-auto"
        src={"/images/verify.jpeg"}
        width={100}
        height={100}
        alt="verify"
      />
      <div className=" w-full flex justify-center">
        <div>
          <InputOTP maxLength={4} onChange={(e) => setOtp(parseInt(e))}>
            <InputOTPGroup>
              <InputOTPSlot
                className={
                  error && "border-red-500 animate__animated animate__shakeX"
                }
                index={0}
              />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot
                className={
                  error && "border-red-500 animate__animated animate__shakeX"
                }
                index={1}
              />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot
                className={
                  error && "border-red-500 animate__animated animate__shakeX"
                }
                index={2}
              />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot
                className={
                  error && "border-red-500 animate__animated animate__shakeX"
                }
                index={3}
              />
            </InputOTPGroup>
          </InputOTP>
          <Button
            disabled={otp?.toString().length! < 4 || otp == null}
            onClick={handleActivate}
            className={`w-full my-5 ${
              otp?.toString().length == 4
                ? "cursor-pointer "
                : " cursor-not-allowed"
            }`}
          >
            Verify OTP
          </Button>
          <p className=" text-center dark:text-gray-200 text-sm">
            Go Back to Sign In?
            <Button onClick={() => setAuthForm("login")} variant={"link"}>
              Sign In
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ActivateAcc;
