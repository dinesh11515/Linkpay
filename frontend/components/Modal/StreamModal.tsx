import Image from "next/image";
import React, { useState, FormEvent } from "react";
import Backdrop from "../UI/Backdrop";

// type Prop = {
//   onClose: () => {};
// };

// const Backdrop = ({ onClose }: Prop) => {
//   return (
//     <div
//       onClick={onClose}
//       className="fixed top-0 left-0 z-50 h-screen w-screen bg-black/75 backdrop-blur-[5px]"
//     ></div>
//   );
// };

const StreamModal = ({ onClose }: any) => {
  const [address, setAddress] = useState("");
  const [flowRate, setFlowRate] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("usdc");

  const tokenChangeHandler = (event: any) => {
    setToken(event.target.value);
  };

  const streamHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Backdrop onClose={onClose} />
      <section className=" fixed bg-white border rounded-xl z-50 translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] ">
        <form onSubmit={streamHandler} className="p-6 flex flex-col w-[400px]">
          <label className="text-sm font-semibold mb-1">Flow Rate</label>
          <input
            required
            placeholder="flow-rate in wei/second"
            className="border border-purple-200 rounded-md p-2 w-full"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          <label className="text-sm font-semibold mb-1 mt-4">Address</label>
          <input
            required
            placeholder="reciepent address"
            className="border border-purple-200 rounded-md p-2 w-full"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          <div className="flex my-4 gap-4">
            <label className="flex flex-row-reverse gap-3  border py-2 px-5 rounded-md cursor-pointer">
              <p className="flex items-center gap-1 font-semibold">
                <span>
                  <Image
                    src="/usdc.png"
                    alt="usdc"
                    width={25}
                    height={25}
                    className="rounded-full"
                  />
                </span>
                USDC
              </p>
              <input
                type="radio"
                name="token"
                value="usdc"
                onChange={tokenChangeHandler}
                checked={token === "usdc"}
              />
            </label>
            <label className="flex flex-row-reverse gap-3  border py-2 px-5 rounded-md cursor-pointer">
              <p className="flex items-center gap-1 font-semibold">
                <span>
                  <Image
                    src="/dai.png"
                    alt="dai"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </span>
                DAI
              </p>
              <input
                type="radio"
                name="token"
                value="dai"
                checked={token === "dai"}
                onChange={tokenChangeHandler}
              />
            </label>
          </div>

          <label className="text-sm font-semibold mb-1">Amount</label>
          <input
            required
            type="number"
            placeholder="amount"
            className="border border-purple-200 rounded-md p-2 w-full"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />

          <button
            type="submit"
            className="bg-[#CAE7C0] py-3 mt-4 rounded-md text-[#315248] font-semibold hover:bg-[#82ad74]"
          >
            Stream Now
          </button>
        </form>
      </section>
    </>
  );
};

export default StreamModal;
