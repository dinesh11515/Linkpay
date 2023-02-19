import Image from "next/image";
import React, { useState, FormEvent } from "react";
import Backdrop from "../UI/Backdrop";
import { calculateFlowRate } from "../createFlow";
import { createNewFlow } from "../createFlow";
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

const StreamModal = ({ onClose, address, provider }: any) => {
  const [flowRate, setFlowRate] = useState("");
  const [token, setToken] = useState("USDCx");

  const tokenChangeHandler = (event: any) => {
    setToken(event.target.value);
  };

  const streamHandler = (event: FormEvent) => {
    event.preventDefault();
    createNewFlow(address, flowRate, provider, token);
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
              setFlowRate(e.target.value);
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
                USDCx
              </p>
              <input
                type="radio"
                name="token"
                value="USDCx"
                onChange={tokenChangeHandler}
                checked={token === "USDCx"}
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
                DAIx
              </p>
              <input
                type="radio"
                name="token"
                value="DAIx"
                checked={token === "DAIx"}
                onChange={tokenChangeHandler}
              />
            </label>
          </div>

          <label className="text-sm font-semibold mb-1">
            Your Flow will be{" "}
            {calculateFlowRate(Number(flowRate))?.toPrecision(4)} {token} per
            month{" "}
          </label>

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
