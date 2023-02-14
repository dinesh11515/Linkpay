import Image from "next/image";
import React from "react";
import { HiCheckBadge } from "react-icons/hi2";
import { BsGithub, BsTwitter, BsCalendarCheck, BsUpload } from "react-icons/bs";
import { CiStreamOn } from "react-icons/ci";
import usdc from "../public/usdc.png";
import usdt from "../public/t.png";
import dai from "../public/dai.png";
import matic from "../public/matic.png";
import Button from "@/components/UI/Button";

const Pay = () => {
  const usdcHandler = () => {
    console.log("Pay via usdc");
  };

  const usdtHandler = () => {
    console.log("Pay via usdt");
  };

  const maticHandler = () => {
    console.log("Pay via matic");
  };

  const daiHandler = () => {
    console.log("Pay via dai");
  };

  const scheduleHandler = () => {
    console.log("Schedule popup");
  };

  const requestHandler = () => {
    console.log("Request popup");
  };

  const streamHandler = () => {
    console.log("Stream popup");
  };

  return (
    <section>
      <header className="relative w-[100vw] h-[32vh] ">
        {/* <Image src="/header.png" alt="header img" fill={true} /> */}
        <div className="w-full h-full bg-gradient-to-r from-[#000000] via-[#1B0B22] to-[#1C1A28] " />
      </header>
      <div className="w-[80%] max-w-[1200px] mx-auto ">
        <div className="flex">
          <div className="relative w-[180px]">
            <Image
              src="/pfp.png"
              width={180}
              height={100}
              className="rounded-full absolute -top-10 bg-white/50 p-2"
              alt="profile-pic"
            />
          </div>
          <div className="w-full p-4">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-2xl font-bold flex items-center gap-1">
                Aman Mandal{" "}
                <span>
                  <HiCheckBadge color="#6B7280" />
                </span>
              </h2>
              <div className="flex gap-5">
                <button
                  onClick={scheduleHandler}
                  className="border border-black  rounded-xl px-6 py-2 hover:border-[#1B0B22] hover:text-[#1B0B22] hover:bg-black/10"
                >
                  <p className="flex gap-2 items-center  font-semibold">
                    Schedule{" "}
                    <span>
                      <BsCalendarCheck />
                    </span>
                  </p>
                </button>
                <button
                  onClick={requestHandler}
                  className="border border-black  rounded-xl px-6 py-2 hover:border-[#1B0B22] hover:text-[#1B0B22] hover:bg-black/10"
                >
                  <p className="flex gap-2 items-center  font-semibold">
                    Request{" "}
                    <span>
                      <BsUpload />
                    </span>
                  </p>
                </button>

                <button
                  onClick={streamHandler}
                  className="border border-black  rounded-xl px-6 py-2 hover:border-[#1B0B22] hover:text-[#1B0B22] hover:bg-black/10"
                >
                  <p className="flex gap-2 items-center  font-semibold">
                    Stream{" "}
                    <span>
                      <CiStreamOn />
                    </span>
                  </p>
                </button>
              </div>
            </div>

            <p className="text-gray-500 text-sm font-medium">Developer</p>
            <div className="flex gap-2 items-center mt-4 text-gray-500">
              <BsGithub className="cursor-pointer" />
              <BsTwitter className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[75%] mx-auto mt-16 max-w-[1200px]">
        <p className="text-xl mb-5 font-semibold text-gray-600">
          Initiate Payment
        </p>

        <div className="flex gap-20">
          <button
            onClick={usdcHandler}
            className={`rounded-xl w-[220px] pl-5 py-3 items-center bg-blue-100 flex gap-2 hover:bg-blue-200`}
          >
            <Image
              src={usdc}
              alt="USDC"
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className={`font-semibold text-blue-600 text-lg`}>
              Pay with USDC
            </p>
          </button>

          <button
            onClick={usdtHandler}
            className={`rounded-xl w-[220px] pl-5 py-3 items-center bg-green-100 flex gap-2 hover:bg-green-200`}
          >
            <Image
              src={usdt}
              alt="USDT"
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className={`font-semibold text-green-500 text-lg`}>
              Pay with USDT
            </p>
          </button>

          <button
            onClick={daiHandler}
            className={`rounded-xl w-[220px] pl-5 py-3 items-center bg-yellow-100 flex gap-2 hover:bg-yellow-200`}
          >
            <Image
              src={dai}
              alt="DAI"
              width={30}
              height={30}
              className="rounded-full"
            />
            <p className={`font-semibold text-yellow-500 text-lg`}>
              Pay with DAI
            </p>
          </button>
        </div>

        <div className="flex gap-20 mt-10">
          <button
            onClick={maticHandler}
            className={`rounded-xl w-[220px] pl-5 py-3 items-center bg-purple-200 flex gap-2 hover:bg-purple-300`}
          >
            <Image
              src={matic}
              alt="Matic"
              width={40}
              height={30}
              className="rounded-full"
            />
            <p className={`font-semibold text-purple-700 text-lg`}>
              Pay with Matic
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pay;
