"use client";
import { footer } from "@/static";

const Footer = () => {
  return (
    <div className="w-full border-t p-5 md:p-10">
      <div className=" container mx-auto  flex justify-evenly flex-wrap ">
        {footer.map((data, i) => {
          return (
            <div key={i} className=" min-w-[270px] mx-auto mb-10">
              <h1 className=" text-xl font-semibold mb-3">{data.title}</h1>
              {data.item.map((d, i) => (
                <p key={i} className=" dark:text-muted-foreground">
                  {d}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Footer;
