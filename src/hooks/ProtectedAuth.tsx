import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";

type Props = {
  children: ReactNode;
};
const ProtectedAuth: FC<Props> = ({ children }) => {
  const { user } = useSelector((state: any) => state.auth);
  return user ? <>{children} </> : redirect("/");
};

export default ProtectedAuth;
