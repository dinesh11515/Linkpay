import Image from "next/image";
import React, { useEffect } from "react";
import { HiCheckBadge } from "react-icons/hi2";
import { BsGithub, BsTwitter, BsCalendarCheck, BsUpload } from "react-icons/bs";
import { CiStreamOn } from "react-icons/ci";
import usdc from "../public/usdc.png";
import usdt from "../public/t.png";
import dai from "../public/dai.png";
import matic from "../public/matic.png";
import Button from "@/components/UI/Button";
import { ethers, Signer } from "ethers";
import {
  contractABI,
  mantleAddress,
  mumbaiAddress,
  mantleRPC,
  mumbaiRPC,
  erc20abi,
} from "@/constants";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStyleRegistry } from "styled-jsx";
import StreamModal from "@/components/Modal/StreamModal";

interface IUser {
  name: string;
  image: string;
  bio: string;
  twitter: string;
  userAddress: string;
}

const Pay = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser>();
  const [tokenDetails, setTokenDetails] = useState<any>(null);
  const [signer, setSigner] = useState<any>();
  const [showStreamModal, setShowStreamModal] = useState(false);

  const router = useRouter();
  const userName = "dineshaitham";
  const chain = "mumbai";

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );

      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      const signer = provider.getSigner();
      setSigner(signer);
    } catch (err) {
      console.log(err, "connect Wallet");
    }
  };

  const payHandler = async (
    tokenName: string,
    tokenAddress: string,
    amount: string
  ) => {
    try {
      const erc20Contract = new ethers.Contract(tokenAddress, erc20abi, signer);

      const decimals = erc20Contract.decimals();

      await erc20Contract.approve(
        chain === "mumbai" ? mumbaiAddress : mantleAddress,
        ethers.utils.parseUnits(amount, decimals)
      );

      const contract = new ethers.Contract(
        chain === "mumbai" ? mumbaiAddress : mantleAddress,
        contractABI,
        signer
      );

      const tx = await contract.payToUser(
        userName,
        ethers.utils.parseUnits(amount, decimals),
        tokenAddress,
        tokenName
      );
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };
  const scheduleHandler = () => {
    console.log("Schedule popup");
  };

  const requestHandler = () => {
    console.log("Request popup");
  };

  const streamHandler = () => {
    setShowStreamModal(true);
  };

  const closeStreamHandler = () => {
    setShowStreamModal(false);
  };

  //get token details by user name
  const getDetails = async (name: string) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        chain === "mumbai" ? mumbaiRPC : mantleRPC
      );
      const contract = new ethers.Contract(
        chain === "mumbai" ? mumbaiAddress : mantleAddress,
        contractABI,
        provider
      );
      const user = await contract.users(name);
      setUser(user);
      const tokenDetails = await contract.getTokensByUser(name);
      setTokenDetails(tokenDetails);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails(userName as string);
  }, []);

  console.log(tokenDetails);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section>
          {/* <button onClick={connectWallet}>Connect Wallet</button> */}
          <header className="relative  h-[45vh] ">
            <Image src="/head.png" alt="header img" fill />
            {/* <div className="w-full h-full bg-gradient-to-r from-[#000000] via-[#1B0B22] to-[#1C1A28] " /> */}
          </header>
          <div className="w-[80%] max-w-[1200px] mx-auto ">
            <div className="flex">
              <div className="relative w-[180px]">
                <img
                  src={user?.image}
                  width={180}
                  height={100}
                  className="rounded-full absolute -top-10 bg-white/50 p-2"
                  alt="profile-pic"
                />
              </div>
              <div className="w-full p-4">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-2xl font-bold flex items-center gap-1">
                    {user?.name}
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

                <p className="text-gray-500 text-sm font-medium">{user?.bio}</p>
                <div className="flex gap-2 items-center mt-4 text-gray-500">
                  <BsGithub className="cursor-pointer" />
                  <BsTwitter
                    className="cursor-pointer"
                    onClick={() => window.open(user?.twitter)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[75%] mx-auto mt-16 max-w-[1200px]">
            <p className="text-xl mb-5 font-semibold text-gray-600">
              Initiate Payment
            </p>

            <div className="flex gap-20"></div>

            {tokenDetails?.length > 0 &&
              tokenDetails.map((token: any) => {
                const img = "/" + token.tokenName + ".png";
                return (
                  <button
                    onClick={() =>
                      payHandler(token.tokenName, token.tokenAddress, "0.1")
                    }
                    className={`rounded-xl w-[220px] pl-5 py-3 items-center bg-blue-100 flex gap-2 hover:bg-blue-200`}
                  >
                    <Image
                      src={img}
                      alt={token.tokenName}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <p className={`font-semibold text-blue-600 text-lg`}>
                      Pay with {token.tokenName}
                    </p>
                  </button>
                );
              })}
          </div>
          {showStreamModal && <StreamModal onClose={closeStreamHandler} />}
        </section>
      )}
    </div>
  );
};

export default Pay;
