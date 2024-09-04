import { ChevronDown, ChevronUp } from "lucide-react";
import { FC, useState } from "react";

type Props = {
  faq: any;
};
export const FaqC: FC<Props> = ({ faq }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div
        className=" dark:bg-gray-900 shadow-sm p-3 mb-3 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <div className=" flex justify-between items-center">
          <h1>{faq.question}</h1>
          {show ? <ChevronUp /> : <ChevronDown />}
        </div>
        {show && <p className=" text-muted-foreground mt-2">{faq.answer}</p>}
      </div>
    </>
  );
};
