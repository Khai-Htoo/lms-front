import { List } from "lucide-react";
import { Card } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { StarRating } from "star-rating-react-ts";

type Props = {
  course: any;
};
const CourseCard = ({ course }: Props) => {
  return (
    <Link href={`course-detail/${course._id}`} className="w-full ">
      <Card className="max-w-[310px] mx-auto p-3 shadow-md h-[400px] cursor-pointer">
        <div className=" w-full h-60 overflow-hidden p-3">
          <Image
            src={course?.thumbnail.url}
            alt={course?.name}
            width={1000}
            height={1000}
            className=" w-full h-full"
          />
        </div>
        <h1 className=" line-clamp-2 text-xl font-semibold">{course?.name}</h1>
        <div className=" flex items-center justify-between my-2">
          <div className="">
            <StarRating readOnly initialRating={course?.ratings} />
          </div>
          <p>{course?.purchased} Students</p>
        </div>
        <div className=" flex justify-between items-center">
          <div className=" flex space-x-3">
            <p>{course?.price} $ </p>
            <p className=" text-[crimson] line-through">
              {course?.estimatedPrice} $
            </p>
          </div>
          <div className=" flex text-lg space-x-2">
            <List />
            <p>{course?.courseData.length} Lectures</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
export default CourseCard;
