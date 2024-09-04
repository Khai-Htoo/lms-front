import { Input } from "@/components/ui/input";
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/category/categoryApi";
import { Check, Pen, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  refresh: () => void;
  id: string;
  title: string;
};
const Category: FC<Props> = ({ id, title, refresh }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [updateTitle, setUpdateTitle] = useState(title);
  const [deleteCategory, { isSuccess: deleteSuccess }] =
    useDeleteCategoryMutation();
  const [
    updateCategory,
    { isSuccess: updateSuccess, error, isLoading: updateLoad, data },
  ] = useUpdateCategoryMutation();
  const handleUpdate = () => {
    let error = false;
    if (updateTitle.length < 1) {
      error = true;
    }
    if (error) {
      toast.error("Enter title ...");
    } else {
      updateCategory({
        id,
        title: updateTitle,
      });
    }
    setEdit(false);
  };
  useEffect(() => {
    if (updateSuccess) {
      toast.success(data.msg);
      refresh();
      toast.success("Success Update");
    }
    if (deleteSuccess) {
      refresh();
      toast.success("Success deleted");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.msg);
      }
    }
  }, [updateSuccess, error, deleteSuccess]);
  return (
    <div className=" flex items-center justify-between space-x-2">
      {!edit && <h1>{title}</h1>}
      {edit && (
        <Input
          placeholder=" Enter title ..."
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value)}
        />
      )}
      <div className=" flex items-center space-x-3">
        {!edit && (
          <Pen
            size={20}
            className=" text-primary cursor-pointer"
            onClick={() => setEdit(true)}
          />
        )}
        {edit && (
          <Check
            size={22}
            className=" text-green-500 cursor-pointer"
            onClick={handleUpdate}
          />
        )}
        <Trash
          onClick={() => {
            deleteCategory(id);
            refresh();
          }}
          size={20}
          className=" text-[crimson] cursor-pointer"
        />
      </div>
    </div>
  );
};
export default Category;
