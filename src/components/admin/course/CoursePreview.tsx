import { FC, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import { CheckCheck, Layers2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Loader from "@/components/core/Loader";
type Props = {
  id?: any;
  data: any;
  handleUpdate?: () => void;
  handleCreate?: () => void;
  isLoading: boolean;
};
const CoursePreview: FC<Props> = ({
  data,
  handleUpdate,
  handleCreate,
  isLoading,
  id,
}) => {
  const discountPercent =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;
  return (
    <div className=" px-10 space-y-8">
      <VideoPlayer videoUrl={data.demoUrl} name={data.name} />
      <div className=" flex ">
        <h1 className=" text-3xl font-semibold ">{data?.price} $</h1>
        <strong className=" ml-3">{data?.estimatedPrice} $</strong>
        <h1 className=" text-3xl text-[crimson] font-semibold ml-5">
          {Math.floor(discountPercent)} %
        </h1>
      </div>
      {/* buy now */}
      <Button className="bg-green-500 rounded-full px-5">
        Buy now {data?.price} $
      </Button>
      {/* discount */}
      <div className=" flex items-center  space-x-3">
        <Input
          type="text"
          className=" md:w-[700px]"
          placeholder="Discount code .."
        />
        <Button className=" px-10">Apply</Button>
      </div>
      {/* Description */}
      <div className=" space-y-2">
        <div className=" flex space-x-3 items-center mt-3 dark:dark:text-gray-400">
          <Layers2 /> <p>Source code included</p>
        </div>
        <div className=" flex space-x-3 items-center mt-3 dark:dark:text-gray-400">
          <Layers2 /> <p>Full Lifetime Access</p>
        </div>
        <div className=" flex space-x-3 items-center mt-3 dark:dark:text-gray-400">
          <Layers2 /> <p>Certificate of completion</p>
        </div>
        <div className=" flex space-x-3 items-center mt-3 dark:dark:text-gray-400">
          <Layers2 /> <p>Premiun Support</p>
        </div>
      </div>
      <h1 className=" text-2xl font-semibold dark:text-gray-300">
        {data?.description}
      </h1>
      {/* benefit */}
      <div className="">
        <h1 className=" text-2xl font-semibold dark:text-gray-300">
          What you will learn from this course ?
        </h1>
        {data?.benefits.map((benefit: any, index: number) => (
          <div
            className=" flex space-x-3 items-center mt-3 dark:text-gray-400"
            key={index}
          >
            <CheckCheck /> <p>{benefit?.title}</p>
          </div>
        ))}
      </div>
      {/* pre requisites */}
      <div className="">
        <h1 className=" text-2xl font-semibold dark:text-gray-300">
          What are the prerequisites for starting this course ?
        </h1>
        {data?.prerequisites.map((benefit: any, index: number) => (
          <div
            className=" flex space-x-3 items-center mt-3 dark:text-gray-400"
            key={index}
          >
            <CheckCheck /> <p>{benefit?.title}</p>
          </div>
        ))}
      </div>
      <div className=" w-full">
        {id ? (
          <Button onClick={handleUpdate}>
            {isLoading ? <Loader /> : "Update Course"}
          </Button>
        ) : (
          <Button onClick={handleCreate} className=" px-10">
            {isLoading ? <Loader /> : "Create Course"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CoursePreview;
