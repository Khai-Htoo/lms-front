"use client";
import Faq from "@/components/admin/faq/faq";
import Footer from "@/components/core/Footer";
import Header from "@/components/core/Header";
import Loader from "@/components/core/Loader";
import { FaqC } from "@/components/faq/FaqC";
import { useGetAllFaqQuery } from "@/redux/features/faq/faqApi";
const Page = () => {
  const { data, isLoading } = useGetAllFaqQuery({});

  return (
    <div>
      <Header />
      {isLoading ? (
        <div className=" w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className=" max-w-[600px] mx-5 sm:mx-auto py-8 min-h-[600px]">
          {data?.result.map((faq: any, i: number) => (
            <div key={i}>
              <FaqC faq={faq} />
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};
export default Page;
