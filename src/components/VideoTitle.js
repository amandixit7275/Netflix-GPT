import React from "react";

const VideoTitle = ({ originalTitle, overview }) => {
  return (
    <div className="pt-[20%] px-6 md:px-24 w-screen aspect-video text-white absolute bg-gradient-to-r from-black opacity-80 ">
      <h1 className=" text-3xl md:text-6xl font-bold">{originalTitle}</h1>
      <p className=" hidden md:inline-block py-6 text-lg w-1/4"> {overview}</p>
      <div className="pt-3 md:pt-0">
        <button className="bg-white text-black py-1  md:py-4 px-2 md:px-12 text-sm md:text-xl hover:bg-opacity-50 rounded-lg duration-150">
          ▶ Play
        </button>
        <button className="  hidden md:inline-block bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg mx-2">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
