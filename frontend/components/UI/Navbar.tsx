import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="flex justify-between items-center px-7 py-3 border border-black rounded-[20px]">
      <Image src="/logo.svg" alt="logo" width={100} height={50} />
      <div className="text-lg font-semibold font-Poppins flex gap-8 items-center">
        <p
          onClick={() => {
            router.push("/");
          }}
          className="cursor-pointer"
        >
          Home
        </p>
        <p
          onClick={() => {
            router.push("/dashboard");
          }}
          className="cursor-pointer"
        >
          Dashboard
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
