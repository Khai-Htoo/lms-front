import { Input } from "@/components/ui/input";
import {
  useDeleteFaqMutation,
  useUpdateFaqMutation,
} from "@/redux/features/faq/faqApi";
import {
  Check,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  Pen,
  Trash,
} from "lucide-react";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  refetch: () => void;
  edit: boolean;
  destroy: boolean;
  setEdit: (edit: boolean) => void;
  setDestroy: (destroy: boolean) => void;
  id: string;
  question: string;
  answer: string;
};
const Faq: FC<Props> = ({
  id,
  question,
  answer,
  edit,
  setDestroy,
  destroy,
  setEdit,
  refetch,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [input, setInput] = useState<boolean>(false);
  const [uQuestion, setUQuestion] = useState<string | null>(null);
  const [uAnswer, setUAnswer] = useState<string | null>(null);
  const [submit, subSubmit] = useState<boolean>(false);
  const [updateFaq, { isSuccess, error, data }] = useUpdateFaqMutation();
  const [deleteFaq, { isSuccess: dSuccess }] = useDeleteFaqMutation();
  const handleUpdate = () => {
    updateFaq({ id, answer: uAnswer, question: uQuestion });
  };
  useEffect(() => {
    if (!uAnswer || !uQuestion) {
      subSubmit(false);
    } else {
      subSubmit(true);
    }
  }, [uAnswer, uQuestion]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      refetch();
      setInput(false);
      setEdit(false);
    }
    if (dSuccess) {
      toast.success("success delete");
      refetch();
      setDestroy(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.msg);
      }
    }
  }, [isSuccess, error, dSuccess]);
  return (
    <div className={`dark:text-gray-300 mb-4 border-b py-3 cursor-pointer`}>
      <div className=" flex justify-between items-center space-x-3">
        {input ? (
          <div className=" space-y-3 w-full ">
            <Input
              value={uQuestion!}
              placeholder="Enter question ..."
              onChange={(e) => setUQuestion(e.target.value)}
            />
            <Input
              onChange={(e) => setUAnswer(e.target.value)}
              value={uAnswer!}
              placeholder="Enter answer ..."
            />
          </div>
        ) : (
          <h1 className=" text-xl ">{question}</h1>
        )}
        <div className=" flex space-x-2 items-center">
          {!edit && (
            <div className=" cursor-pointer " onClick={() => setShow(!show)}>
              {show ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          )}
          {destroy && (
            <Trash
              className=" size-5 text-[crimson]"
              onClick={() => {
                deleteFaq(id);
              }}
            />
          )}
          {edit &&
            (submit ? (
              <CircleCheck className=" text-green-500" onClick={handleUpdate} />
            ) : (
              <Pen
                className=" size-5 text-primary"
                onClick={() => {
                  setInput(true);
                  setUAnswer(answer);
                  setUQuestion(question);
                }}
              />
            ))}
        </div>
      </div>
      {show && <p className=" text-muted-foreground mt-3 ">{answer}</p>}
    </div>
  );
};
export default Faq;
