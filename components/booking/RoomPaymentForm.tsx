"use client";

import useBookRoom from "@/hooks/useBookRoom";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { error } from "console";

interface Props {
  clientSecret: string;
  handlePaymentSuccess: (value: boolean) => void;
}

const RoomPaymentForm = ({ clientSecret, handlePaymentSuccess }: Props) => {
  const { bookedRoomData, resetBookRoom } = useBookRoom();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    handlePaymentSuccess(false);
    setIsLoading(false);
  }, [stripe, clientSecret, handlePaymentSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements || !bookedRoomData) {
      return;
    }

    try {
      stripe
        .confirmPayment({ elements, redirect: "if_required" })
        .then((result) => {
          if (!result.error) {
            axios
              .patch(`/api/booking/${result.paymentIntent.id}`)
              .then((res) => {
                toast({
                  description: "Room reservation is done!",
                });
                router.refresh();
                resetBookRoom();
                handlePaymentSuccess(true);
                setIsLoading(false);
              })
              .catch((error) => {
                console.log(error);
                toast({
                  variant: "destructive",
                  description: "Room reservation is failde!",
                });
                setIsLoading(false);
              });
          } else {
            setIsLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const startDate = moment(bookedRoomData?.startDate).format("DD MM YYY");
  const endDate = moment(bookedRoomData?.endDate).format("DD MM YYY");

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <h2 className="font-semibold mb-2 text-lg">Billing Address</h2>
      <AddressElement
        options={{
          mode: "billing",
        }}
      />
      <h2 className="font-semibold mt-5 mb-2 text-lg">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="flex flex-col gap-2">
        <Separator />
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold mb-2 text-lg">Your Booking Summary</h2>
          <p>You Will check-in on {startDate} at 10AM</p>
          <p>You Will check-out on {endDate} at 10PM</p>
          {bookedRoomData?.breakfastIncluded && (
            <p>You will be served breakfast each day at 8AM</p>
          )}
        </div>
        <Separator />
        <div className="font-bold text-lg">
          {bookedRoomData?.breakfastIncluded && (
            <>
              <p className="mb-2">
                Breakfast Price: ${bookedRoomData?.room?.breakfast_price}
              </p>
              <p>Total Price: ${bookedRoomData?.totalPrice}</p>
            </>
          )}
        </div>
      </div>
      <Button disabled={isLoading} className="mt-5">
        {isLoading ? "Processing Payment..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default RoomPaymentForm;
