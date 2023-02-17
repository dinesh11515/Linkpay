import React from "react";

type Prop = {
  onClose: () => {};
};

const Backdrop = ({ onClose }: Prop) => {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 z-50 h-screen w-screen bg-black/75 backdrop-blur-[5px]"
    ></div>
  );
};

export default Backdrop;
