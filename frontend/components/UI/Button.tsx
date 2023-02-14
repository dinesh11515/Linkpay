import Image from "next/image";
import React, { ComponentType } from "react";
import { IconType } from "react-icons/lib/esm/iconBase";

const Button = ({ icon, title }: { icon: Element; title: string }) => {
  return (
    <button className="border border-black  rounded-xl px-6 py-2 hover:border-[#1B0B22] hover:text-[#1B0B22] hover:bg-black/10">
      <div className="flex gap-2 items-center  ">
        <p className="font-semibold">{title}</p>
        <>{icon}</>
      </div>
    </button>
  );
};

export default Button;
