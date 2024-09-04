"use client";
import VideoPlayer from "@/components/admin/course/VideoPlayer";
import Header from "@/components/core/Header";
import Loader from "@/components/core/Loader";
import CourseData from "@/components/courses/courseData";
import QuestionReply from "@/components/courses/QuestionReply";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetAuthUserQuery } from "@/redux/features/api/apiSlice";
import {
  useAddQuestionMutation,
  useAddReviewMutation,
  useGetPaidCourseQuery,
} from "@/redux/features/course/courseApi";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StarRating } from "star-rating-react-ts";

const Page = ({ params }: any) => {
  const {
    isLoading,
    data: course,
    error,
    isSuccess,
    refetch,
  } = useGetPaidCourseQuery(params.id);
  const {} = useGetAuthUserQuery({});
  const [activeContent, setActiveContent] = useState<any>(null);
  const [activeData, setActiveData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<number>(1);
  const [review, setReview] = useState<string | null>(null);

  const [rating, setRating] = useState<number>(0);
  const [
    addReview,
    { error: reviewError, isLoading: reviewLoad, isSuccess: reviewSuccess },
  ] = useAddReviewMutation();
  const handleReview = () => {
    if (!review) {
      toast.error("Review filed is required");
    } else {
      const id = params.id;
      addReview({ id, review, rating });
      setReview(null);
      setRating(0);
    }
  };
  const [question, setQuestion] = useState<string | null>(null);
  const [
    addQuestion,
    { isLoading: loadQue, isSuccess: successQue, error: errorQue },
  ] = useAddQuestionMutation();
  const handleAddQuestion = (dataId: any) => {
    if (!question) {
      toast.error("Please fill the question field");
    } else {
      const id = params.id;
      const contentId = activeContent._id;
      addQuestion({ id, dataId, contentId, question }).then(() => refetch());
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setActiveData(course?.result?.courseData[0]?.data[0]);
      setActiveContent(course?.result?.courseData[0]);
    }
    if (reviewSuccess) {
      toast.success("Add review success");
    }
    if (successQue) {
      toast.success("Add Question success");
    }
    if (reviewError) {
      const errorMsg = reviewError as any;
      toast.error(errorMsg.data.msg);
    }
    if (errorQue) {
      const errorMsg = errorQue as any;
      toast.error(errorMsg.data.msg);
    }
  }, [isSuccess, reviewSuccess, reviewError, errorQue, successQue]);

  useEffect(() => {
    if (error) {
      const errorMsg = error as any;

      if (!errorMsg.data.success) {
        toast.error(errorMsg.data.msg);
        redirect("/");
      }
    }
  }, [error]);
  return (
    <div>
      <Header />
      {isLoading ? (
        <div className=" w-full flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className=" mx-auto container  my-3 flex space-x-6">
          <div className=" mx-auto md:w-[70%] ">
            {activeContent && (
              <VideoPlayer
                name={course?.result?.name}
                videoUrl={activeData?.videoUrl}
              />
            )}
            <h1 className=" text-primary text-2xl font-semibold my-5">
              {activeData?.title}
            </h1>
            <div className=" md:hidden">
              {course?.result?.courseData.map((course: any, i: any) => (
                <CourseData
                  setActiveData={setActiveData}
                  course={course}
                  key={i}
                />
              ))}
            </div>
            {/* active section */}
            <div className=" w-full flex justify-between dark:bg-gray-800 p-3 bg-indigo-300 font-semibold md:text-xl text-white">
              <h1
                className={`${
                  activeSection == 1 && "text-[crimson]"
                } cursor-pointer`}
                onClick={() => setActiveSection(1)}
              >
                Overview
              </h1>
              <h1
                className={`${
                  activeSection == 2 && "text-[crimson]"
                } cursor-pointer`}
                onClick={() => setActiveSection(2)}
              >
                Resources
              </h1>
              <h1
                className={`${
                  activeSection == 3 && "text-[crimson]"
                } cursor-pointer`}
                onClick={() => setActiveSection(3)}
              >
                Q&A
              </h1>
              <h1
                className={`${
                  activeSection == 4 && "text-[crimson]"
                } cursor-pointer`}
                onClick={() => setActiveSection(4)}
              >
                Reviews
              </h1>
            </div>
            {/* active section content */}
            {activeSection == 1 && (
              <div className=" w-full my-5">
                <h1>{activeData?.description}</h1>
              </div>
            )}
            {activeSection == 2 && (
              <div className=" w-full my-5">
                {activeData.links.map((link: any, i: any) => {
                  return (
                    <div className=" space-y-2 py-2 border-b" key={i}>
                      <h1>Title : {link?.title} </h1>
                      <h1>Url : {link?.url} </h1>
                    </div>
                  );
                })}
              </div>
            )}
            {/* question answer */}
            {activeSection == 3 && (
              <div className="">
                <Textarea
                  className=" my-3"
                  placeholder=" Enter your question"
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <Button
                  className=" w-full"
                  onClick={() => handleAddQuestion(activeData._id)}
                >
                  {loadQue ? <Loader /> : "Submit"}
                </Button>
                <div className=" border mt-5 p-2">
                  {activeData.question &&
                    activeData.question.map((data: any, i: any) => (
                      <div className="" key={i}>
                        <QuestionReply
                          data={data}
                          contentId={activeContent._id}
                          id={params.id}
                          dataId={activeData._id}
                          refetch={refetch}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
            {/* review */}
            {activeSection == 4 && (
              <div className=" w-full my-5">
                <div className=" flex space-x-3">
                  {" "}
                  <Image
                    src={"/images/profile.webp"}
                    alt="profile"
                    width={50}
                    height={50}
                    className=" size-16 rounded-full"
                  />
                  <div className=" w-full">
                    <Textarea onChange={(e) => setReview(e.target.value)} />
                    <div className=" my-2">
                      <StarRating onClick={(e) => setRating(e)} />
                    </div>
                    <Button className=" mt-3" onClick={handleReview}>
                      {reviewLoad ? <Loader /> : "Submit Review"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className=" hidden md:block md:w-[30%]">
            {course?.result?.courseData.map((course: any, i: any) => (
              <CourseData
                setActiveData={setActiveData}
                course={course}
                key={i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
