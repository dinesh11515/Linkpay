import Image from "next/image";
import React, { FormEvent, useState } from "react";

const register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [twitter, setTwitter] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  const registerHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <section>
      <div className="flex w-[90%] mx-auto mt-10 gap-4 h-full rounded-xl">
        <div className="flex-[0.43] bg-gradient-to-b py-20 from-[#FBE8FA] to-[#FFE4C4] rounded-xl">
          <h2 className="text-3xl font-Poppins font-semibold px-10 leading-[40px] mb-10">
            Start making your <br /> payment easy.
          </h2>

          <div className="relative">
            <Image
              src="/gradient.svg"
              alt=""
              width={480}
              height={450}
              className="mx-auto absolute z-10  left-[50%] top-[70%] translate-x-[-50%]"
            />

            <Image
              src="/frame.svg"
              width={300}
              height={300}
              alt=""
              className="absolute z-20 left-[50%] top-[70%] translate-x-[-50%] translate-y-[30%] "
            />
          </div>
        </div>
        <form
          onSubmit={registerHandler}
          className="w-full flex-[0.57] bg-[url('/formbg.svg')]"
        >
          <div className="p-10">
            <h2 className="font-light font-Poppins text-3xl tracking-wider mb-6 ">
              Linkpay, Fast & Secure <br /> payment
            </h2>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Name</label>
              <input
                required
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Sanskar Khandelwal"
                className="p-2 border border-gray-400 focus:outline-none rounded-md bg-[#F8F8F8] mb-4"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">
                Profile Image
              </label>
              <input
                required
                type="file"
                onChange={(e: any) => {
                  let selectedFile = e.target.files[0];
                  if (selectedFile) {
                    setImage(selectedFile);
                  }
                }}
                className="p-2 border border-gray-400 focus:outline-none rounded-md bg-[#F8F8F8] mb-4"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Username</label>

              <label className="bg-[#F8F8F8] px-2 gap-1 rounded-md border border-gray-400 focus:outline-none flex items-center mb-4">
                <span>
                  <Image src="/name.svg" alt="" width={20} height={20} />
                </span>
                <input
                  required
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="sanskar1234"
                  className="p-2  w-full rounded-md bg-[#F8F8F8] outline-none focus:outline-none"
                />
              </label>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Twitter</label>

              <label className="bg-[#F8F8F8] px-2 gap-1 rounded-md border border-gray-400 focus:outline-none flex items-center mb-4">
                <span>
                  <Image src="/twitter.svg" alt="" width={20} height={20} />
                </span>
                <input
                  required
                  onChange={(e) => {
                    setTwitter(e.target.value);
                  }}
                  type="text"
                  placeholder="sanskar_khandelwal"
                  className="p-2 w-full rounded-md bg-[#F8F8F8] outline-none focus:outline-none"
                />
              </label>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Bio</label>
              <label className="bg-[#F8F8F8] px-2 gap-1 rounded-md border border-gray-400 focus:outline-none flex mb-4">
                <span>
                  <Image
                    src="/bio.png"
                    alt=""
                    width={20}
                    height={20}
                    className="pt-2"
                  />
                </span>
                <textarea
                  required
                  placeholder="Software Developer"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  className="p-2 w-full rounded-md bg-[#F8F8F8] outline-none focus:outline-none min-h-[120px]"
                />
              </label>
            </div>

            <button
              className="bg-[#B3DDEB] uppercase font-semibold tracking-wide py-3 text-[#35484F] border border-[#35484F] rounded-md w-full"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default register;
