import { ChevronDown, TvMinimalPlay } from "lucide-react";
import { useState } from "react";

type Props = {
  course: any;
  setActiveData: (course: any) => void;
};
const CourseData = ({ course, setActiveData }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className=" flex justify-between  border-b py-3">
      <div className=" ">
        <h1 className="text-xl font-semibold dark:text-gray-400">
          {course?.videoSection}
        </h1>
        <p>{course.data.length} lessons</p>
        {active && (
          <div>
            {course?.data.map((data: any, i: any) => (
              <div
                className=" my-3 cursor-pointer"
                key={i}
                onClick={() => setActiveData(data)}
              >
                <div className=" flex space-x-3">
                  <TvMinimalPlay className=" text-primary" />
                  <div className="">
                    <p className=" text-muted-foreground">{data.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ChevronDown
        className={`cursor-pointer duration-500 ${active ? "rotate-180" : " "}`}
        onClick={() => setActive(!active)}
      />
    </div>
  );
};
export default CourseData;
