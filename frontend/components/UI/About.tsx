import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <>
      <section className="flex justify-between px-10 my-28 ">
        <div className="flex flex-col gap-10 py-8">
          <h2 className="text-6xl font-semibold font-Pragati leading-[70px] relative">
            Recieve Crypto from, <br /> anyone with our{" "}
            <span className="">LinkPay.</span>
            <div className="absolute bottom-0 right-1 w-44 h-3 bg-green-200 rounded-sm"></div>
          </h2>

          <p className="font-Pragati text-lg tracking-wide w-[500px]">
            LinkPay is your one stop gateway for recieving payments in crypto
            with a very simple yet modern UI. Pay, Request or stream just with a
            single click!
          </p>

          <p className="font-Pragati text-lg tracking-wide w-[500px] -mt-6">
            <span className="font-semibold">Excited?</span> Give it a shot right
            now and enjoy hassle free payments.
          </p>

          <ul className="font-Pragati tracking-wider">
            {[
              { text: "Fast and secure payment" },
              { text: "Generate a payment link with a simple click" },
              { text: "Pay with any token you want" },

              { text: "Manage Streams, schedule transactions and what not!!!" },
            ].map((item, i) => (
              <li className="flex gap-4 items-center text-xl font-semibold">
                <span>
                  <Image src="/arrow.svg" alt="arrow" width={20} height={20} />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-10">
          <Image src="/about1.svg" alt="about1" width={400} height={400} />
          <Image src="/about2.svg" alt="about2" width={400} height={400} />
          <Image src="/about3.svg" alt="about3" width={400} height={400} />
        </div>
      </section>

      <section className="w-full rounded-[20px] mx-auto flex justify-around items-center bg-[#FBDFF9]">
        <Image src="/about4.svg" alt="about4" width={700} height={800} />
        <div className="relative ">
          <p className="font-Pragati text-6xl font-bold z-10">
            Pay with multiple <br /> currency, <br />
            link your meta <br />
            wallet.
          </p>
          {/* <Image src='/about5.svg' className="absolute -top-20 -right-20" alt='about-5' width={400} height={400} /> */}
        </div>
      </section>
    </>
  );
};

export default About;
