"use client";
import AvatarCircles from "@/components/magicui/avatar-circles";

const avatarUrls = [
  "/images/pp1.jpg",
  "/images/pp2.jpg",
  "/images/pp3.jpg",
  "/images/pp4.jpg",
];

export async function Avatar() {
  return <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />;
}
