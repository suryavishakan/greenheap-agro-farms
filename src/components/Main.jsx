import React from "react";
// images
import bg from "../assets/main-slider.jpg";

const Main = () => {
  return (
    <div className="text-gray-800">
      <div className="container mx-auto flex justify-center items-center flex-col py-10">
        <h2 className="text-5xl font-semibold relative">
          Investing in farming re-imagined
          <span className="absolute -top-4 -right-8 text-2xl ">✨</span>
        </h2>
        <h2 className="text-5xl font-semibold mt-2">
          with <span className="text-green-700">Greenheap</span>
        </h2>
        <img
          src={bg}
          alt="main banner"
          width="500px"
          height="800px"
          className="rounded-md w-4/5 object-cover mt-5"
        />
      </div>
    </div>
  );
};

export default Main;
