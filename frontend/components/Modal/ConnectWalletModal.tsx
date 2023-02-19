import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";

const Backdrop = () => {
  return (
    <div className="fixed top-0 left-0 z-10  h-screen w-screen bg-black/60 backdrop-blur-sm"></div>
  );
};

type Prop = {
  connectWallet: () => {};
};

const WalletModal = ({ connectWallet }: Prop) => {
  //   const { connectWallet } = useContext(WalletContext);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <Backdrop />
      <div className="bg-white z-20 shadow-xl drop-shadow-md w-[470px] rounded-xl  py-8 px-10 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        {/* <p className="text-2xl font-bold font-Grotesk text-center">SpaceDAO</p> */}
        <Image
          src="/wallet.svg"
          alt="wallet"
          height={100}
          width={200}
          className="mx-auto"
        />
        <p className="text-gray-500 font-semibold mb-5 font-Poppins text-center px-4 mt-10">
          <span className="font-bold text-[#CAE7C0]">LinkPay</span> wants you to
          connect your wallet!
        </p>
        <button
          onClick={connectWallet}
          className="bg-[#CAE7C0] rounded-lg text-white hover:bg-[#7c9374] font-semibold py-3 w-full "
        >
          Connect Wallet
        </button>
      </div>
    </>
  );
};

export default WalletModal;
