"use client";
import { useOrderMutation } from "@/redux/features/order/orderApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Loader from "../core/Loader";
import { redirect } from "next/navigation";
import socketIO from "socket.io-client";
import { useSelector } from "react-redux";
const ENDPOINT = process.env.NEXT_SOCKET_SERVER_URL || "http://localhost:4000";
const socketId = socketIO(ENDPOINT!, { transports: ["websocket"] });
type Props = {
  course: any;
};
export const OrderForm = ({ course }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [order, { data, error, isSuccess }] = useOrderMutation();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status == "succeeded") {
      setIsLoading(false);
      order({ courseId: course._id, paymentInfo: paymentIntent });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      socketId.emit("notification", {
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
        user,
      });
      redirect(`access-course/${course?._id}`);
    }
  }, [isSuccess]);
  return (
    <div className=" w-full">
      <form action={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          // Access the email value like so:
          // onChange={(event) => {
          //  setEmail(event.value.email);
          // }}
          //
          // Prefill the email field like so:
          // options={{defaultValues: {email: 'foo@bar.com'}}}
        />
        <PaymentElement id="payment-element" />
        <Button
          className=" w-full my-5"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">{isLoading ? <Loader /> : "Pay now"}</span>
        </Button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};
