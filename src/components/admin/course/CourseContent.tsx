import { ICourseContent } from "@/app/admin/create-course/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, PlusCircle } from "lucide-react";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
type Props = {
  setCourseContent: (courseContent: ICourseContent[]) => void;
  courseContent: ICourseContent[];
  setCourse: (course: string) => void;
  setDone: (done: number[]) => void;
};
const CourseContent: FC<Props> = ({
  setCourseContent,
  courseContent,
  setCourse,
  setDone,
}) => {
  const [localDone, setLocalDone] = useState<number[]>([1, 2, 3]);

  const addLink = (index: number, dataindex: number) => {
    const updatedCourseContent = [...courseContent];
    updatedCourseContent[index].data[dataindex].links.push({
      title: "",
      url: "",
    });
    setCourseContent(updatedCourseContent);
  };

  const addContentData = (i: number) => {
    let updateCourseData = [...courseContent];
    let hasError = false;
    updateCourseData[i].data.forEach((data) => {
      if (!data.description || !data.title || !data.videoUrl) {
        toast.error("All fields are required in content data");
        hasError = true;
      }
      data.links.forEach((link) => {
        if (!link.title || !link.url) {
          toast.error("All fields are required in link");
          hasError = true;
        }
      });
    });
    if (!hasError) {
      updateCourseData[i].data.push({
        videoUrl: "",
        title: "",
        description: "",
        links: [{ title: "", url: "" }],
        suggestion: "",
      });
      setCourseContent(updateCourseData);
    }
  };

  const addNewSection = () => {
    setCourseContent([
      ...courseContent,
      {
        videoSection: "Untitled Section",
        data: [
          {
            videoUrl: "",
            title: "",
            description: "",
            links: [{ title: "", url: "" }],
            suggestion: "",
          },
        ],
      },
    ]);
  };

  const next = () => {
    let error = false;
    courseContent.forEach((item) => {
      if (!item.videoSection) error = true;
      item.data.forEach((d) => {
        if (!d.description || !d.title || !d.videoUrl) error = true;
        d.links.forEach((link) => {
          if (!link.title || !link.url) error = true;
        });
      });
    });
    if (error) {
      toast.error("All fields are required");
    } else {
      setCourse("preview");
      const newDone = [...localDone, 4];
      setLocalDone(newDone);
      setDone(newDone);
    }
  };

  return (
    <div className="flex-1 md:mx-8 text-black/[0.9] dark:text-gray-200">
      {courseContent.map((item, index) => (
        <div
          className="bg-indigo-50 dark:bg-gray-900 p-3 rounded-md mb-5"
          key={index}
        >
          <input
            type="text"
            value={item?.videoSection}
            className="bg-transparent text-2xl max-w-[250px] font-semibold outline-none text-primary"
            onChange={(e) => {
              const updateContent = courseContent.map((course, i) =>
                i == index
                  ? { ...course, videoSection: e.target.value }
                  : course
              );
              setCourseContent(updateContent);
            }}
          />
          <div className="my-5 ">
            {item?.data.map((d, dataindex) => (
              <div
                className="text-gray-300 space-y-3 border-b py-3 border-primary"
                key={dataindex}
              >
                {/* title */}
                <div className=" text-black/[0.9] dark:text-gray-200">
                  <p className="mb-2 ">Video Title</p>
                  <Input
                    type="text"
                    value={d.title}
                    className="bg-transparent border-gray-600"
                    onChange={(e) => {
                      const updateContent = [...courseContent];
                      const updatedData = [...updateContent[index].data];
                      updatedData[dataindex] = {
                        ...updatedData[dataindex],
                        title: e.target.value,
                      };
                      updateContent[index].data = updatedData;
                      setCourseContent(updateContent);
                    }}
                  />
                </div>
                {/* url */}
                <div className="text-black/[0.9] dark:text-gray-200">
                  <p className="mb-2">Video Url</p>
                  <Input
                    type="text"
                    className="bg-transparent border-gray-600"
                    value={d.videoUrl}
                    onChange={(e) => {
                      const updatedContent = [...courseContent];
                      updatedContent[index].data[dataindex].videoUrl =
                        e.target.value;
                      setCourseContent(updatedContent);
                    }}
                  />
                </div>
                {/* description */}
                <div>
                  <p className="mb-2">Video Description</p>
                  <Textarea
                    className="bg-transparent border-gray-600"
                    value={d.description}
                    onChange={(e) => {
                      const updatedContent = [...courseContent];
                      updatedContent[index].data[dataindex].description =
                        e.target.value;
                      setCourseContent(updatedContent);
                    }}
                  />
                </div>
                {/* links */}
                {d.links.map((link, lindex) => (
                  <div className="space-y-2" key={lindex}>
                    <p>Link {lindex + 1}</p>
                    <Input
                      value={link.title}
                      onChange={(e) => {
                        const updatedContent = [...courseContent];
                        const updatedLinks = [
                          ...updatedContent[index].data[dataindex].links,
                        ];
                        updatedLinks[lindex] = {
                          ...updatedLinks[lindex],
                          title: e.target.value,
                        };
                        updatedContent[index].data[dataindex].links =
                          updatedLinks;
                        setCourseContent(updatedContent);
                      }}
                      type="text"
                      className="bg-transparent border-gray-600"
                      placeholder="Please enter title ..."
                    />
                    <Input
                      value={link.url}
                      onChange={(e) => {
                        const updatedContent = [...courseContent];
                        const updatedLinks = [
                          ...updatedContent[index].data[dataindex].links,
                        ];
                        updatedLinks[lindex] = {
                          ...updatedLinks[lindex],
                          url: e.target.value,
                        };
                        updatedContent[index].data[dataindex].links =
                          updatedLinks;
                        setCourseContent(updatedContent);
                      }}
                      type="text"
                      placeholder="Please enter url ..."
                      className="bg-transparent border-gray-600"
                    />
                  </div>
                ))}
                <Button
                  variant={"ghost"}
                  onClick={() => addLink(index, dataindex)}
                >
                  <Link className="mr-3" /> Add Links
                </Button>
                <br />
                {dataindex + 1 === item.data.length && (
                  <Button
                    variant={"secondary"}
                    onClick={() => addContentData(index)}
                  >
                    Add Content Data
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button
        variant={"outline"}
        className="my-3 text-gray-500"
        onClick={addNewSection}
      >
        <PlusCircle className="mr-3" /> Add Course Section
      </Button>
      <div className="flex justify-between">
        <Button className="md:px-20" onClick={() => setCourse("option")}>
          Prev
        </Button>
        <Button className="md:px-20" onClick={next}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseContent;
