import React from "react";

const VideoTitle = ({ originalTitle, overview }) => {
  return (
    <div className="pt-[20%] md:px-24 w-screen aspect-video text-white absolute bg-gradient-to-r from-black opacity-80 ">
      <h1 className="text-6xl font-bold">{originalTitle}</h1>
      <p className="py-6 text-lg w-1/4"> {overview}</p>
      <div>
        <button className="bg-white text-black p-4 px-12 text-xl hover:bg-opacity-50 rounded-lg duration-150">
          ▶ Play
        </button>
        <button className="bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg mx-2">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
