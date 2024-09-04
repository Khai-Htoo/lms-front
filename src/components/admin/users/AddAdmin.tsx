import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useUpdateRoleMutation } from "@/redux/features/user/userApi";
import Loader from "@/components/core/Loader";
type Props = {
  user: any;
  refetch: () => void;
};
const AddAdmin: FC<Props> = ({ user, refetch }) => {
  const [id, setId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [updateRole, { isLoading, isSuccess, error }] = useUpdateRoleMutation();
  const [isOpen, setIsOpen] = useState(false);
  const handleUpdateRole = () => {
    if (!id || !role) {
      toast.error("All field is requied");
    } else {
      updateRole({ id, role });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Role updated");
      refetch();
      setIsOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.msg);
      }
    }
  }, [isSuccess, error]);
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button variant={"outline"}>Add Admin</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Add Admin</DialogHeader>
          <Select onValueChange={(d) => setId(d)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select email" />
            </SelectTrigger>
            <SelectContent>
              {user.map((u: any, i: number) => (
                <SelectItem key={i} value={u._id}>
                  {u.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(d) => setRole(d)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={"secondary"}
            onClick={handleUpdateRole}
            className=" w-full"
          >
            {isLoading ? <Loader /> : "Submit"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddAdmin;
