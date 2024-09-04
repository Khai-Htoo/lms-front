"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import { FC, ReactNode, useState } from "react";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ActivateAcc from "./auth/ActivateAcc";
import { useSelector } from "react-redux";

const AuthFormDialog = () => {
  const [authForm, setAuthForm] = useState<string>("login");
  const { user } = useSelector((state: any) => state.auth);
  return (
    <Dialog>
      <DialogTrigger>{!user && <User />}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" text-center">
            {authForm == "login" && "Sign In with Elearning"}
            {authForm == "signUp" && "Sign Up with Elearning"}
            {authForm == "activate" && "Verify Your Account"}
          </DialogTitle>
          {authForm == "login" && <Login setAuthForm={setAuthForm} />}
          {authForm == "signUp" && <SignUp setAuthForm={setAuthForm} />}
          {authForm == "activate" && <ActivateAcc setAuthForm={setAuthForm} />}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthFormDialog;
