"use client";
import Header from "@/components/core/Header";
import Loader from "@/components/core/Loader";
import CourseDetail from "@/components/courses/CourseDetail";
import { Button } from "@/components/ui/button";
import { useGetAllCourseQuery } from "@/redux/features/course/courseApi";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import {
  useGetStripeKeyQuery,
  useOrderPaymentMutation,
} from "@/redux/features/order/orderApi";
import { useEffect, useState } from "react";
import { OrderForm } from "@/components/order/OrderForm";
const Page = ({ params }: any) => {
  const { isLoading, data } = useGetAllCourseQuery({});
  const { user } = useSelector((state: any) => state.auth);
  const purchased = user?.courses.find((u: any) => u._id == params.id);
  const course = data?.result.find((d: any) => d._id == params.id);
  const { data: config } = useGetStripeKeyQuery({});
  const [orderPayment, { data: paymentData }] = useOrderPaymentMutation();

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const key = config?.stripeKey;
      setStripePromise(loadStripe(key));
    }
    if (course) {
      const amount = Math.round(course.price * 100);
      console.log(amount);
      orderPayment({ amount });
    }
  }, [config, course]);
  useEffect(() => {
    if (paymentData) {
      setClientSecret(paymentData?.result);
    }
  }, [paymentData]);
  return (
    <div>
      <Header />
      {isLoading ? (
        <div className=" flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {stripePromise && (
            <div className=" container mx-auto py-10 flex flex-col-reverse md:flex-row">
              <div className="md:w-[65%]">
                <CourseDetail course={course} />
              </div>
              <div className="md:w-[35%] ">
                <Image
                  src={course?.thumbnail?.url}
                  alt="image"
                  width={1000}
                  height={900}
                  className=" w-full h-[300px] border p-2 "
                />
                <div className=" flex space-x-3 my-5">
                  <h1 className=" text-2xl font-semibold">{course?.price} $</h1>
                  <strong className=" line-through text-[crimson]">
                    {course?.estimatedPrice}$
                  </strong>
                  <h1 className=" text-2xl  font-semibold">
                    {Math.floor(
                      ((course?.estimatedPrice - course?.price) /
                        course?.estimatedPrice) *
                        100
                    )}
                    % off
                  </h1>
                </div>
                {purchased ? (
                  <Link href={`access-course/${params.id}`}>
                    <Button className=" rounded-full px-5  py-3 font-semibold">
                      Study Now !
                    </Button>
                  </Link>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className=" rounded-full px-5 bg-[crimson] py-3 font-semibold">
                        Buy Now ${course?.price}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-indigo-100">
                      <div className="w-full">
                        {stripePromise && clientSecret && (
                          <Elements
                            stripe={stripePromise}
                            options={{ clientSecret }}
                          >
                            <OrderForm course={course} />
                          </Elements>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                <ul className=" my-5">
                  <li className=" flex space-x-3 items-center">
                    <Check size={18} className=" mr-5" />
                    Source code included
                  </li>
                  <li className=" flex space-x-3 items-center">
                    <Check size={18} className=" mr-5" />
                    Full lifetime access
                  </li>
                  <li className=" flex space-x-3 items-center">
                    <Check size={18} className=" mr-5" />
                    Certificate of completion
                  </li>
                  <li className=" flex space-x-3 items-center">
                    {" "}
                    <Check size={18} className=" mr-5" />
                    Premiun Support
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Page;
