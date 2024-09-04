"use client";
import Footer from "@/components/core/Footer";
import Header from "@/components/core/Header";
import Courses from "@/components/courses/Courses";
import Hero from "@/components/Hero";
import { Review } from "@/components/review/review";
import { showCases } from "@/static";
import Image from "next/image";
import CountUp from "react-countup";
const Page = () => {
  return (
    <div className=" bg-indigo-50 dark:bg-black">
      <Header />
      <Hero />
      <div className=" container mx-auto">
        <div className=" bg-gray-100 dark:bg-gray-900  my-8 md:my-20 container mx-auto md:border-2 py-8  rounded-lg md:flex items-center justify-between">
          {showCases.map((item, i) => (
            <div
              className={`flex items-center justify-center space-x-14 md:space-x-6 ${
                item.border && "md:border-r-2"
              } border-primary w-full`}
              key={i}
            >
              <Image
                src={item.image}
                width={100}
                height={100}
                alt={item.title}
              />
              <div className="">
                <h1 className=" text-2xl font-semibold">
                  <CountUp end={item.number} />
                </h1>
                <h1 className=" text-muted-foreground mt-2">{item.title}</h1>
              </div>
            </div>
          ))}
        </div>
        <Courses />
        <Review />
      </div>
      <Footer />
    </div>
  );
};
export default Page;
