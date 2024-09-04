import { MessageCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useReplyQuestionMutation } from "@/redux/features/course/courseApi";
import toast from "react-hot-toast";
import Loader from "../core/Loader";

type Props = {
  data: any;
  contentId: any;
  id: any;
  dataId: any;
  refetch: any;
};
const QuestionReply = ({ data, id, contentId, dataId, refetch }: Props) => {
  const [isReply, setIsReply] = useState<boolean>(false);
  const [reply, setReply] = useState<string | null>(null);
  console.log(data);
  const [replyQuestion, { isLoading, error, isSuccess }] =
    useReplyQuestionMutation();
  const handleReply = (questionId: any) => {
    replyQuestion({ id, contentId, dataId, questionId, reply });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Question reply success");
      refetch();
    }
    if (error) {
      let errorMsg = error as any;
      toast.error(errorMsg.data.msg);
    }
  }, [isSuccess, error]);
  return (
    <div className=" flex py-2 my-2 border-b space-x-3">
      <div className=" size-18">
        <Image
          src={
            data?.user?.avatar
              ? data?.user?.avatar?.url
              : "/images/profile.webp"
          }
          alt="profile"
          width={50}
          height={50}
        />
      </div>
      <div className=" w-full">
        <h1 className=" text-primary">{data?.user?.name}</h1>
        <div className="flex justify-between w-full items-center">
          <p>{data?.question}</p>
          <div className=" cursor-pointer" onClick={() => setIsReply(!isReply)}>
            {!isReply ? (
              <p className=" mt-3">
                <MessageCircle className=" inline-block" /> Reply
              </p>
            ) : (
              <p className=" mt-3">
                <X className=" inline-block" />
              </p>
            )}
          </div>
        </div>
        {isReply && (
          <div className=" flex">
            <Input onChange={(e) => setReply(e.target.value)} />
            <Button onClick={() => handleReply(data._id)}>
              {isLoading ? <Loader /> : "Reply"}
            </Button>
          </div>
        )}
        {data?.questionReplies.length > 0 && (
          <div>
            {data?.questionReplies.map((q: any, i: any) => (
              <div className=" flex space-x-3 border-t border-b my-2" key={i}>
                <Image
                  alt="profile"
                  width={20}
                  height={20}
                  className="size-11 rounded-full"
                  src={
                    q.user.avatar ? q.user.avatar.url : "/images/profile.webp"
                  }
                />
                <div className="">
                  <h1>{q.user.name}</h1>
                  <p>{q.reply}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default QuestionReply;
