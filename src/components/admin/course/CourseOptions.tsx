import { IBenefit, IPreReq } from "@/app/admin/create-course/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { error } from "console";
import { PlusCircle } from "lucide-react";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
type Props = {
  done: number[];
  setDone: (done: number[]) => void;
  setCourse: (course: string) => void;
  benefits: IBenefit[];
  setBenefits: (benefits: IBenefit[]) => void;
  preRequisities: IPreReq[];
  setPreRequisities: (preRequisities: IPreReq[]) => void;
};
const CourseOptions: FC<Props> = ({
  benefits,
  setBenefits,
  preRequisities,
  setPreRequisities,
  setCourse,
  done,
  setDone,
}) => {
  const [localDone, setLocalDone] = useState<number[]>([1, 2]);
  const addBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  const addPreReq = () => {
    setPreRequisities([...preRequisities, { title: "" }]);
  };
  const handleChangeBene = (e: any, i: number) => {
    const updatedBenefits = benefits?.map((benefit, index) =>
      i === index ? { ...benefit, title: e.target.value } : benefit
    );
    setBenefits(updatedBenefits);
  };
  const handleChangePreReq = (e: any, i: number) => {
    const updatePreReq = preRequisities?.map((data, index) =>
      i === index ? { ...data, title: e.target.value } : data
    );
    setPreRequisities(updatePreReq);
  };
  const handleNext = () => {
    let isError = false;
    benefits?.map((data) => {
      if (data.title.length < 1) {
        isError = true;
      }
    });
    preRequisities?.map((data) => {
      if (data.title.length < 1) {
        isError = true;
      }
    });
    if (isError) {
      return toast.error("All field is required");
    } else {
      setCourse("content");
      const newDone = [...localDone, 3];
      setLocalDone(newDone);
      setDone(newDone);
    }
  };
  return (
    <div className=" flex-1 md:px-8 space-y-5">
      <h1 className=" dark:text-gray-300 text-lg md:text-2xl font-semibold">
        What are the benefits for students in this course?
      </h1>
      <div className=" py-3 space-y-3">
        {benefits?.map((data, i) => (
          <Input
            key={i}
            type="text"
            value={data.title as any}
            onChange={(e) => handleChangeBene(e, i)}
            placeholder="Enter benefit ..."
          />
        ))}
        <PlusCircle
          className=" my-3 text-gray-300 cursor-pointer"
          onClick={addBenefit}
        />
      </div>
      <h1 className=" dark:text-gray-300 text-lg md:text-2xl font-semibold">
        What are the prerequisities for starting in this course?
      </h1>
      {preRequisities?.map((data, i) => (
        <Input
          key={i}
          type="text"
          value={data.title as any}
          onChange={(e) => handleChangePreReq(e, i)}
          placeholder="Enter prerequisities ..."
        />
      ))}
      <PlusCircle
        className=" my-3 text-gray-300 cursor-pointer"
        onClick={addPreReq}
      />
      <div className=" flex justify-between items-center">
        <Button onClick={() => setCourse("information")}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};

export default CourseOptions;
