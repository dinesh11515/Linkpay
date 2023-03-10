import Image from "next/image";
import React, { useEffect } from "react";
import { HiCheckBadge } from "react-icons/hi2";
import { BsGithub, BsTwitter, BsCalendarCheck, BsUpload } from "react-icons/bs";
import { CiStreamOn } from "react-icons/ci";
import { ethers, Signer } from "ethers";
import { sendNotification } from "@/Push";
import { useAuth } from "@arcana/auth-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import PaymentModal from "@/components/Modal/PaymentModal";
import RequestModal from "@/components/Modal/RequestModal";
import WalletModal from "@/components/Modal/ConnectWalletModal";

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

  const [showStreamModal, setShowStreamModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [account, setAccount] = useState("");

  const router = useRouter();
  const { userName, chain } = router.query;

  const auth = useAuth();
  console.log(auth, "auth");
  const provider = auth.provider;
  console.log(provider, "provider");
  const onLogin = async () => {
    const provider = auth.provider;
    try {
      await auth.connect();
      console.log(provider, "provider");
      if (chain === "mumbai") {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "80001" }],
        });
      } else {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "5001",
              chainName: "Mantle Testnet",
              rpcUrls: ["https://rpc.testnet.mantle.xyz"],
              nativeCurrency: {
                name: "BIT",
                symbol: "BIT", // 2-6 characters long
                decimals: 18,
              },
            },
          ],
        });
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "5001" }],
        });
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      }
    } catch (e) {
      console.log(e, "onLogin");
    }
  };

  const payHandler = async (
    tokenName: string,
    tokenAddress: string,
    amount: string
  ) => {
    try {
      const provider = auth.provider;
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();

      const erc20Contract = new ethers.Contract(tokenAddress, erc20abi, signer);
      console.log(erc20Contract);

      const decimals = await erc20Contract.decimals();
      console.log(decimals);

      console.log(ethers.utils.parseUnits(amount, decimals));

      let tx = await erc20Contract.approve(
        chain === "mumbai" ? mumbaiAddress : mantleAddress,
        ethers.utils.parseUnits(amount, decimals)
      );
      await tx.wait();

      const allowance = await erc20Contract.allowance(
        await signer.getAddress(),
        chain === "mumbai" ? mumbaiAddress : mantleAddress
      );
      console.log(allowance.toString());

      const contract = new ethers.Contract(
        chain === "mumbai" ? mumbaiAddress : mantleAddress,
        contractABI,
        signer
      );

      tx = await contract.payToUser(
        userName,
        Number(amount),
        tokenAddress,
        tokenName
      );
      await tx.wait();

      await sendNotification(amount, await signer.getAddress());
      toast.success("Payment Successful");
      setShowPaymentModal(false);
    } catch (err) {
      console.log(err);
    }
  };
  const scheduleHandler = () => {
    // setShowRequestModal(true);
  };

  const requestHandler = (address: string, name: string) => {
    setShowPaymentModal(true);
    setTokenAddress(address);
    setTokenName(name);
  };
  const requestingHandler = () => {
    setShowRequestModal(true);
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
  }, [userName]);

  console.log(tokenDetails);

  return (
    <div>
      {loading ? (
        <p></p>
      ) : (
        <section>
          <header className="relative  h-[45vh] ">
            <Image src="/head.png" alt="header img" fill />
            {/* <div className="w-full h-full bg-gradient-to-r from-[#000000] via-[#1B0B22] to-[#1C1A28] " /> */}
          </header>
          <div className="w-[80%] max-w-[1200px] mx-auto ">
            <div className="flex">
              <div className="relative w-[180px]">
                {user?.image === null ? (
                  <Image
                    src="/pfp.png"
                    alt="user"
                    width={180}
                    className="rounded-full absolute -top-10 bg-white/50 p-2"
                  />
                ) : (
                  <img
                    src={user?.image}
                    width={180}
                    height={100}
                    className="rounded-full absolute -top-10 bg-white/50 p-2"
                    alt="profile-pic"
                  />
                )}
                {/* <img
                  src={user?.image}
                  width={180}
                  height={100}
                  className="rounded-full absolute -top-10 bg-white/50 p-2"
                  alt="profile-pic"
                /> */}
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
                      onClick={requestingHandler}
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

            <div className="flex gap-20">
              {tokenDetails?.length > 0 &&
                tokenDetails.map((token: any) => {
                  const img = "/" + token.tokenName + ".png";
                  return (
                    <button
                      onClick={() =>
                        requestHandler(token.tokenAddress, token.tokenName)
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
          </div>
          {showStreamModal && (
            <StreamModal
              onClose={closeStreamHandler}
              provider={provider}
              address={user?.userAddress}
            />
          )}
          {showPaymentModal && (
            <PaymentModal
              onClose={() => {
                setShowPaymentModal(false);
              }}
              payHandler={payHandler}
              tokenAddress={tokenAddress}
              tokenName={tokenName}
              userName={userName as string}
            />
          )}
          {showRequestModal && (
            <RequestModal
              onClose={() => {
                setShowRequestModal(false);
              }}
              account={account}
              receiver={user?.userAddress}
            />
          )}
        </section>
      )}

      {!auth.isLoggedIn && <WalletModal connectWallet={onLogin} />}
      <ToastContainer />
    </div>
  );
};

export default Pay;
