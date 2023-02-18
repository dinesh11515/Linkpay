import Image from "next/image";
import React, { useState } from "react";
import Backdrop from "../UI/Backdrop";

const PaymentModal = ({ onClose }: any) => {
  const [amount, setAmount] = useState("");

  const paymentHandler = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed bg-white px-10 pt-10 pb-5 border rounded-xl z-50 translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] ">
        <Image
          src="/payment.svg"
          alt="payment"
          width={100}
          height={100}
          className="mx-auto"
        />

        <form onSubmit={paymentHandler} className="flex flex-col">
          <input
            type="number"
            onChange={(e: any) => {
              setAmount(e.target.value);
            }}
            className="rounded-md p-3 w-[250px] border  bg-gray-100 mt-7"
            placeholder="Amount"
          />
          <button
            type="submit"
            className="font-Poppins uppercase font-semibold w-full bg-[#45d4bf] text-white hover:bg-[#34a796] rounded-md my-3 py-3"
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentModal;
