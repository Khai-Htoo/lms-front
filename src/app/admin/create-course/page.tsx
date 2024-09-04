"use client";
import CourseContent from "@/components/admin/course/CourseContent";
import CourseInfromation from "@/components/admin/course/CourseInfromation";
import CourseOptions from "@/components/admin/course/CourseOptions";
import CoursePreview from "@/components/admin/course/CoursePreview";
import { Button } from "@/components/ui/button";
import {
  useCreateCourseMutation,
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
const Page = () => {
  const [done, setDone] = useState<number[]>([1]);
  const [courseInformation, setCourseInformation] =
    useState<ICourseInformation>({
      category: "",
      name: "",
      description: "",
      price: "",
      estimatedPrice: "",
      tags: "",
      level: "",
      demoUrl: "",
      thumbnail: "",
    });

  const [benefits, setBenefits] = useState<IBenefit[]>([{ title: "" }]);
  const [preRequisities, setPreRequisities] = useState<IPreReq[]>([
    { title: "" },
  ]);
  const [courseContent, setCourseContent] = useState<ICourseContent[]>([
    {
      videoSection: "Untitled Section",
      data: [
        {
          videoUrl: "",
          title: "",
          description: "",
          links: [
            {
              title: "",
              url: "",
            },
          ],
          suggestion: "",
        },
      ],
    },
  ]);
  const data = {
    name: courseInformation.name,
    description: courseInformation.description,
    price: courseInformation.price,
    estimatedPrice: courseInformation.estimatedPrice,
    tags: courseInformation.tags,
    level: courseInformation.level,
    demoUrl: courseInformation.demoUrl,
    thumbnail: courseInformation.thumbnail,
    category: courseInformation.category,
    benefits: benefits,
    prerequisites: preRequisities,
    courseData: courseContent,
  };
  const [createCourse, { isLoading, isSuccess, error, data: createdData }] =
    useCreateCourseMutation();

  const handleCreate = () => {
    createCourse(data);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(createdData?.msg);
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.msg);
      }
    }
  }, [isSuccess, error]);

  const [course, setCourse] = useState<string>("information");
  return (
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
            isLoading={isLoading}
            handleCreate={handleCreate}
            data={data}
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
  );
};

export default Page;
