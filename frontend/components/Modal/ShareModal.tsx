import React, { useState } from "react";
import Backdrop from "../UI/Backdrop";
import Image from "next/image";
import { BsShare } from "react-icons/bs";
import {
  EmailShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  FacebookMessengerShareButton,
  EmailIcon,
  WhatsappIcon,
  TwitterIcon,
  TelegramIcon,
  LinkedinIcon,
  PinterestIcon,
  FacebookIcon,
} from "react-share";
import FacebookShareButton from "react-share/lib/FacebookShareButton";

// const Backdrop = () => {
//   return (
//     <div className="fixed top-0 left-0 z-10  h-screen w-screen bg-black/60 backdrop-blur-sm"></div>
//   );
// };

const ShareModal = ({ onClose }: any) => {
  const [showShare, setShowShare] = useState(false);

  const shareUrl = "https://www.vercel.linkPay/pay/dinesh";

  return (
    <>
      <Backdrop onClose={onClose} />
      {/* <Backdrop /> */}
      <div className="bg-white z-20 shadow-xl drop-shadow-md w-[550px] rounded-xl  py-8 px-10 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        {/* <p className="text-2xl font-bold font-Grotesk text-center">SpaceDAO</p> */}
        <Image
          src="/done.svg"
          alt="wallet"
          height={100}
          width={150}
          className="mx-auto"
        />
        <p className="text-gray-500 font-semibold mb-5 font-Poppins text-center px-4 mt-10">
          You have successfully generated the Pay link!
        </p>

        <div className="flex gap-4">
          <p className="border rounded-md py-2 w-full bg-gray-200 text-gray-700 text-lg px-4 font-medium font-Poppins tracking-wide">
            {shareUrl}
          </p>
          <button
            onClick={() => {
              setShowShare(!showShare);
            }}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md p-2"
          >
            <BsShare size={25} />
          </button>
        </div>
        {showShare && (
          <div className="flex gap-5 py-2 rounded-2xl bg-gray-100 mt-5 justify-around">
            <EmailShareButton url={shareUrl}>
              <EmailIcon size={30} round={true} />
            </EmailShareButton>

            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={30} round={true} />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={30} round={true} />
            </TwitterShareButton>

            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={30} round={true} />
            </WhatsappShareButton>

            <TelegramShareButton url={shareUrl}>
              <TelegramIcon size={30} round={true} />
            </TelegramShareButton>

            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={30} round={true} />
            </LinkedinShareButton>

            <PinterestShareButton media="link" url={shareUrl}>
              <PinterestIcon size={30} round={true} />
            </PinterestShareButton>
          </div>
        )}
      </div>
    </>
  );
};

export default ShareModal;
