import { navItems } from "@/static";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MenuAnimation() {
  return (
    <div className="flex min-w-fit flex-col gap-2 overflow-hidden px-10">
      {navItems.map((item, index) => (
        <div key={index} className="group flex items-center gap-5">
          <ArrowRight className="size-5 -translate-x-full text-black opacity-0 transition-all duration-300 ease-out hover:z-20 group-hover:translate-x-0 group-hover:text-blue-500 group-hover:opacity-100 md:size-10" />

          <Link href={item.url}>
            {" "}
            <h1 className="z-10 -translate-x-6 cursor-pointer font-mono font-semibold text-black transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:text-blue-500 dark:text-white md:-translate-x-12 md:text-4xl md:group-hover:translate-x-0">
              {item.name}
            </h1>
          </Link>
        </div>
      ))}
    </div>
  );
}
