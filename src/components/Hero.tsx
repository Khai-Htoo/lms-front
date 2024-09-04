"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import SparklesText from "./magicui/sparkles-text";
import { Avatar } from "./core/Avatar";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Hero = () => {
  return (
    <section className=" overflow-hidden w-full relative h-[700px] md:h-[900px] flex items-center justify-center bg-gradient-to-b from-indigo-100 to-indigo-200 dark:from-gray-900 dark:to-black">
      <div className="w-full z-10 flex justify-between items-center">
        <div className="w-1/2 hidden md:flex">
          <Image
            src="/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mx-5 md:w-1/2">
          <SparklesText text="Improve Your Skill Online" />
          <h1 className="text-3xl md:text-5xl font-bold py-7 dark:text-white text-gradient">
            Learning Experience Better
          </h1>
          <p className="dark:text-muted-foreground mt-5">
            We have 40k+ online courses & 500K+ online registered students. Find
            your desired courses from them.
          </p>
          <div className="w-[320px] md:w-[700px] flex py-5 md:py-9">
            <input
              type="text"
              className="px-3 py-4 w-10/12 md:w-11/12 outline-none bg-gray-300"
              placeholder="Search courses ..."
            />
            <div className="w-1/12 bg-primary flex items-center justify-center cursor-pointer">
              <Search color="white" />
            </div>
          </div>
          <div className="flex flex-wrap space-x-3 items-center">
            <div className="min-w-[36px]">
              <Avatar />
            </div>
            <h1>
              500K+ people already trusted us.{" "}
              <span className="text-green-500">View Course</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
