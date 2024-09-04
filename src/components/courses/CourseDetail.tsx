import { CheckCheck } from "lucide-react";
import { StarRating } from "star-rating-react-ts";

type Props = {
  course: any;
};
const CourseDetail = ({ course }: Props) => {
  return (
    <div className=" w-full space-y-5 dark:text-gray-200 ">
      <h1 className="text-xl md:text-3xl font-semibold text-primary">
        {course?.name}
      </h1>
      <div className=" flex space-x-4 items-center">
        <StarRating readOnly initialRating={course?.ratings} />
        <p className=" text-xl">{course?.reviews.length} reviews</p>
      </div>
      <div className=" ">
        <h1 className="text-xl md:text-3xl font-semibold">
          What you will learn from this course?
        </h1>
        {course?.benefits.map((b: any, i: string) => (
          <p
            key={i}
            className=" text-xl my-2 text-gray-600 dark:text-muted-foreground"
          >
            <CheckCheck className=" inline-flex mr-3" /> <span>{b.title}</span>
          </p>
        ))}
      </div>
      <div className=" ">
        <h1 className="text-xl md:text-3xl font-semibold">
          What are the prerequisities for starting this course?
        </h1>
        {course?.prerequisites.map((b: any, i: string) => (
          <p
            key={i}
            className=" text-xl my-2 text-gray-600 dark:text-muted-foreground"
          >
            <CheckCheck className=" inline-flex mr-3" /> <span>{b.title}</span>
          </p>
        ))}
      </div>
      <h1
        className="text-xl md:text-3xl font-semibold
      "
      >
        Course Overview{" "}
      </h1>
      <p className=" text-xl font-semibold">Course Content List</p>
      {course?.courseData.map((data: any, i: any) => (
        <div className="" key={i}>
          <h1 className=" text-xl font-semibold">{data.videoSection}</h1>
          <p>{data.data.length} Lessons</p>
        </div>
      ))}
      <div className="">
        <h1 className="text-xl md:text-3xl font-semibold">Course details</h1>
        <p>{course?.description}</p>
      </div>
    </div>
  );
};
export default CourseDetail;
