import {
  AlignEndHorizontal,
  BadgePlus,
  BookOpenCheck,
  BookOpenText,
  ChartNoAxesCombined,
  Copyright,
  LockKeyhole,
  LogOut,
  TableOfContents,
  Users,
} from "lucide-react";

export const navItems = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Contact Us",
    url: "/contact",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

export const profileItems = [
  {
    name: "My Account",
  },
  {
    name: "Change Password",
    icon: LockKeyhole,
  },
  {
    name: "Enrolled Courses",
    icon: BookOpenText,
  },
  {
    name: "Log Out",
    icon: LogOut,
  },
];
export const sideBarItems = [
  {
    url: "/admin",
    Icon: AlignEndHorizontal,
    title: "Dashboard",
  },
  {
    url: "/admin/users",
    Icon: Users,
    title: "Users",
  },
  {
    url: "/admin/create-course",
    Icon: BadgePlus,
    title: "Create Course",
  },
  {
    url: "/admin/live-courses",
    Icon: BookOpenCheck,
    title: "Live Courses",
  },
  {
    url: "/admin/faq",
    Icon: TableOfContents,
    title: "FAQ",
  },
  {
    url: "/admin/categories",
    Icon: Copyright,
    title: "Categories",
  },
  {
    url: "/admin/team",
    Icon: Users,
    title: "Manage Team",
  },
];

export const showCases = [
  {
    image: "/images/edu.png",
    title: "Students",
    number: 300,
    border: true,
  },
  {
    image: "/images/video.png",
    title: "Videos",
    number: 520,
    border: true,
  },
  {
    image: "/images/blog.png",
    title: "Blogs",
    number: 110,
    border: false,
  },
];

export const footer = [
  {
    title: "About",
    item: ["Our Story", "Privacy Policy", "FAQ"],
  },
  {
    title: "Quick Links",
    item: ["Courses", "My Account", "Course Dashboard"],
  },
  {
    title: "Social Links",
    item: ["Youtube", "Instagram", "Github"],
  },
  {
    title: "Contact Info",
    item: [
      "Call Us : 09 794 257 469",
      "Address : Yangon , Hmawbi",
      "Mail us : khaihtooag@gmail.com",
    ],
  },
];
