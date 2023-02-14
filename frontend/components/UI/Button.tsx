import Image from "next/image";
import React from "react";

type Prop = {
  //   bgHover: string;
  clr: string;
  //   textClr: string;
  imgUrl: string;
  tokenName: string;
};

const Button = ({ clr, imgUrl, tokenName }: Prop) => {
  return (
    <button
      className={`rounded-xl w-[180px] pl-5 py-2 items-center bg-${clr}-100 flex gap-2 hover:bg-${clr}-200`}
    >
      <Image
        src={imgUrl}
        alt={tokenName}
        width={30}
        height={30}
        className="rounded-full"
      />
      <p className={`font-semibold text-${clr}-600 text-lg`}>{tokenName}</p>
    </button>
  );
};

export default Button;
