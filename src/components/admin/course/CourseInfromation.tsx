import { courseInfromationSchema } from "@/validations";
import React, { FC, useState } from "react";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import CustomForm from "@/components/CustomForm";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePondFile } from "filepond";
import toast from "react-hot-toast";
import { ICourseInformation } from "@/app/admin/create-course/page";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

type Props = {
  setCourse: (course: string) => void;
  setDone: (done: number[]) => void;
  courseInformation: ICourseInformation;
  setCourseInformation: (courseInfromation: ICourseInformation) => void;
};
const CourseInfromation: FC<Props> = ({
  setCourse,
  setDone,
  setCourseInformation,
  courseInformation,
}) => {
  const [localDone, setLocalDone] = useState<number[]>([1]);
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string>(
    courseInformation.demoUrl ? courseInformation.demoUrl : ""
  );
  const [category, setCategory] = useState<string | null>(
    courseInformation.category
  );
  const { data: cData } = useGetCategoriesQuery({});
  const handleUpdateFiles = (fileItems: FilePondFile[]) => {
    setFiles(fileItems);
    if (fileItems.length > 0) {
      const file = fileItems[0].file;
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result! as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const form = useForm<z.infer<typeof courseInfromationSchema>>({
    resolver: zodResolver(courseInfromationSchema),
    defaultValues: {
      name: courseInformation.name,
      description: courseInformation.description,
      price: courseInformation.price,
      estimatedPrice: courseInformation.estimatedPrice?.toString(),
      tags: courseInformation.tags,
      level: courseInformation.level,
      demoUrl: courseInformation.demoUrl,
    },
  });

  function onSubmit(values: z.infer<typeof courseInfromationSchema>) {
    if (uploadedImage.length < 1) {
      return toast.error("Image is Required");
    }
    setCourseInformation({
      ...values,
      thumbnail: uploadedImage,
      category: category as string,
    });

    const newDone = [...localDone, 2];
    setLocalDone(newDone);
    setDone(newDone);
    setCourse("option");
  }

  return (
    <div className="w-full md:px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <CustomForm
            name="name"
            label="Course Name"
            control={form.control}
            fieldType="text"
          />
          <CustomForm
            name="description"
            label="Course Description"
            control={form.control}
            fieldType="textarea"
          />
          <div className="flex gap-x-5">
            <CustomForm
              name="price"
              label="Course Price"
              control={form.control}
              fieldType="textarea"
            />
            <CustomForm
              name="estimatedPrice"
              label="Course Estimate Price"
              control={form.control}
              fieldType="text"
            />
          </div>
          <div className="flex gap-x-5 items-center">
            <CustomForm
              name="tags"
              label="Course Tags"
              control={form.control}
              fieldType="text"
            />
            <div className=" w-full md:space-y-2">
              <p className=" text-sm">Category</p>

              <Select value={category!} onValueChange={(e) => setCategory(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {cData &&
                    cData.result.map((data: any, i: number) => (
                      <SelectItem key={i} value={data.title}>
                        {data.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-x-5">
            <CustomForm
              name="level"
              label="Course Level"
              control={form.control}
              fieldType="textarea"
            />
            <CustomForm
              name="demoUrl"
              label="Demo Url"
              control={form.control}
              fieldType="text"
            />
          </div>
          <div className="w-full ">
            <FilePond
              files={files as any}
              onupdatefiles={handleUpdateFiles}
              name="files"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
          </div>
          <div className="flex justify-end">
            <Button className=" px-20" type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CourseInfromation;
