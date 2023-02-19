import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const Hero = () => {
  const router = useRouter();

  const createAccountHandler = () => {
    router.push("/register");
  };
  return (
    <section className="bg-[#13A891] rounded-[20px] w-full py-20 my-8 text-center">
      <p className="text-[#D4D4D4] tracking-wider leading-7 font-Poppins">
        spending is easy but controlling is not!
      </p>
      <h2 className="text-white font-Poppins font-bold text-7xl leading-[100px] my-1 tracking-wide">
        We make payment, <br /> we make time
      </h2>
      <p className="text-[#D4D4D4] tracking-wider leading-7 font-Poppins">
        We are standing with you in every payment, trust
        <br /> us and make payments
      </p>

      <button
        onClick={createAccountHandler}
        className="bg-[#0FB298] shadow-md text-white font-Poppins py-3 px-6 rounded-xl mt-6 mb-10 "
      >
        <p className="flex gap-3 items-center text-xl">
          Create Account{" "}
          <span>
            <AiOutlineArrowRight />
          </span>{" "}
        </p>
      </button>
    </section>
  );
};

export default Hero;
