"use client";
import Faq from "@/components/admin/faq/faq";
import Loader from "@/components/core/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bold, Italic, Pen, Plus, Trash, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  useGetAllFaqQuery,
  useStoreFaqMutation,
} from "@/redux/features/faq/faqApi";
import { PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { isLoading, data, refetch } = useGetAllFaqQuery({});
  const [create, setCreate] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [destroy, setDestroy] = useState<boolean>(false);

  const [
    storeFaq,
    { isLoading: storeLoad, error, isSuccess, data: storeData },
  ] = useStoreFaqMutation();
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const handleStore = () => {
    if (!question || !answer) {
      toast.error("All field is required");
    } else {
      storeFaq({ question, answer });
      setCreate(false);
      setQuestion(null);
      setAnswer(null);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(storeData.msg);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.msg);
      }
    }
  }, [isSuccess, error]);
  return (
    <>
      {isLoading ? (
        <div className=" w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className=" flex justify-center">
          <div className=" w-[600px] ">
            <h1 className=" te mb-5 text-3xl font-semibold dark:text-gray-300 text-center">
              Frequenty asked questions
            </h1>
            {data &&
              data?.result.map((item: any, i: any) => (
                <Faq
                  refetch={refetch}
                  edit={edit}
                  setEdit={setEdit}
                  destroy={destroy}
                  setDestroy={setDestroy}
                  key={i}
                  id={item._id}
                  answer={item.answer}
                  question={item.question}
                />
              ))}
            {create && (
              <div className=" space-y-3 my-2 border-t ">
                <Input
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter question ..."
                />
                <Input
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter answer ..."
                />
                <Button
                  onClick={handleStore}
                  variant={"secondary"}
                  className=" w-full"
                >
                  {storeLoad ? <Loader /> : "Submit"}
                </Button>
              </div>
            )}

            <ToggleGroup variant="outline" type="multiple">
              <ToggleGroupItem
                value="plus"
                onClick={() => setCreate(!create)}
                aria-label="Toggle bold"
              >
                <div>
                  {create ? (
                    <X className=" text-gray-300 w-full mx-auto cursor-pointer" />
                  ) : (
                    <Plus className=" text-gray-300 w-full mx-auto cursor-pointer" />
                  )}
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="edit"
                aria-label="Toggle bold"
                onClick={() => setEdit(!edit)}
              >
                <div>
                  {edit ? (
                    <X className=" text-gray-300 w-full mx-auto cursor-pointer size-5" />
                  ) : (
                    <Pen className=" text-gray-300 w-full mx-auto cursor-pointer size-5" />
                  )}
                </div>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="delete"
                aria-label="Toggle italic"
                onClick={() => setDestroy(!destroy)}
              >
                <div>
                  {destroy ? (
                    <X className=" text-gray-300 w-full mx-auto cursor-pointer size-5" />
                  ) : (
                    <Trash className=" text-gray-300 w-full mx-auto cursor-pointer size-5" />
                  )}
                </div>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      )}
    </>
  );
};
export default Page;
