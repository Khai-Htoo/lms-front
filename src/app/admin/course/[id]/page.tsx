"use client";
import CourseContent from "@/components/admin/course/CourseContent";
import CourseInfromation from "@/components/admin/course/CourseInfromation";
import CourseOptions from "@/components/admin/course/CourseOptions";
import CoursePreview from "@/components/admin/course/CoursePreview";
import Loader from "@/components/core/Loader";
import { Button } from "@/components/ui/button";
import {
  useGetAllCourseQuery,
  useUpdateCourseMutation,
} from "@/redux/features/course/courseApi";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
export interface ICourseInformation {
  category: string;
  name: string;
  description: string;
  price: string;
  estimatedPrice?: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
}
export interface IBenefit {
  title: string;
}
export interface IPreReq {
  title: string;
}
interface Link {
  title: string;
  url: string;
}

interface VideoData {
  videoUrl: string;
  title: string;
  description: string;
  links: Link[];
  suggestion: string;
}

export interface ICourseContent {
  videoSection: string;
  data: VideoData[];
}
const Page = ({ params }: any) => {
  const { data: courses, isLoading } = useGetAllCourseQuery({});
  const courseD = courses?.result.find((c: any) => c._id == params.id);
  console.log(courseD, "hehe");

  const [done, setDone] = useState<number[]>([1]);
  const [courseInformation, setCourseInformation] =
    useState<ICourseInformation>({
      category: courseD?.category,
      name: courseD?.name,
      description: courseD?.description,
      price: courseD?.price,
      estimatedPrice: courseD?.estimatedPrice,
      tags: courseD?.tags,
      level: courseD?.level,
      demoUrl: courseD?.demoUrl,
      thumbnail: courseD?.thumbnail,
    });

  const [benefits, setBenefits] = useState<IBenefit[]>(courseD?.benefits);
  const [preRequisities, setPreRequisities] = useState<IPreReq[]>(
    courseD?.prerequisites
  );
  const [courseContent, setCourseContent] = useState<ICourseContent[]>(
    courseD?.courseData
  );
  const data = {
    name: courseInformation.name,
    description: courseInformation.description,
    price: courseInformation.price,
    estimatePrice: courseInformation.estimatedPrice,
    tags: courseInformation.tags,
    level: courseInformation.level,
    demoUrl: courseInformation.demoUrl,
    thumbnail: courseInformation.thumbnail,
    category: courseInformation.category,
    benefits: benefits,
    prerequisites: preRequisities,
    courseData: courseContent,
  };

  const [
    updateCourse,
    {
      isSuccess: updateSuccess,
      error: updateError,
      data: updateData,
      isLoading: PLoad,
    },
  ] = useUpdateCourseMutation();

  const handleUpdate = () => {
    updateCourse({ id: params.id, data });
  };
  useEffect(() => {
    if (updateSuccess) {
      toast.success(updateData?.msg);
    }

    if (updateError) {
      if ("data" in updateError) {
        const errorData = updateError as any;
        toast.error(errorData.data.msg);
      }
    }
  }, [updateSuccess, updateError]);

  const [course, setCourse] = useState<string>("information");
  return (
    <>
      {isLoading ? (
        <div className=" w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className=" flex">
          <div className=" flex-1">
            {course == "information" && (
              <CourseInfromation
                setCourse={setCourse}
                setDone={setDone}
                setCourseInformation={setCourseInformation}
                courseInformation={courseInformation}
              />
            )}
            {course == "option" && (
              <CourseOptions
                done={done}
                setDone={setDone}
                setCourse={setCourse}
                benefits={benefits}
                preRequisities={preRequisities}
                setPreRequisities={setPreRequisities}
                setBenefits={setBenefits}
              />
            )}
            {course == "content" && (
              <CourseContent
                setDone={setDone}
                setCourseContent={setCourseContent}
                courseContent={courseContent}
                setCourse={setCourse}
              />
            )}
            {course == "preview" && (
              <CoursePreview
                id={params.id}
                handleUpdate={handleUpdate}
                isLoading={PLoad}
                data={courseD}
              />
            )}
          </div>
          <div className=" w-[300px] hidden md:block">
            {/* course information */}
            <div className="">
              <div className="flex item-center space-x-3">
                <Check
                  className={` rounded-full  p-[2px] ${
                    done.includes(1) ? "bg-primary" : "bg-gray-500"
                  }`}
                />
                <p>Course Infromation</p>
              </div>
              <div
                className={`h-8 ml-[10px] my-2 w-1 ${
                  done.includes(1) ? "bg-primary" : "bg-gray-500"
                }`}
              ></div>
            </div>
            {/* course Options */}
            <div className="">
              <div className="flex item-center space-x-3">
                <Check
                  className={` rounded-full  p-[2px] ${
                    done.includes(2) ? "bg-primary" : "bg-gray-500"
                  }`}
                />
                <p>Course Options</p>
              </div>
              <div
                className={`h-8 ml-[10px] my-2 w-1 ${
                  done.includes(2) ? "bg-primary" : "bg-gray-500"
                }`}
              ></div>
            </div>
            {/* course Content */}
            <div className="">
              <div className="flex item-center space-x-3">
                <Check
                  className={` rounded-full  p-[2px] ${
                    done.includes(3) ? "bg-primary" : "bg-gray-500"
                  }`}
                />
                <p>Course Content</p>
              </div>
              <div
                className={`h-8 ml-[10px] my-2 w-1 ${
                  done.includes(3) ? "bg-primary" : "bg-gray-500"
                }`}
              ></div>
            </div>
            {/* course Preview */}
            <div className="">
              <div className="flex item-center space-x-3">
                <Check
                  className={` rounded-full  p-[2px] ${
                    done.includes(4) ? "bg-primary" : "bg-gray-500"
                  }`}
                />
                <p>Course Preview</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
