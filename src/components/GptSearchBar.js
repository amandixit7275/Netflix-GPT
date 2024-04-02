import React from "react";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";

function GptSearchBar() {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="py-[8%] flex justify-center ">
      <form className="bg-black w-1/2 grid grid-cols-12 ">
        <input
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-4 m-4 col-span-9 "
        />
        <button className=" col-span-3 m-4 px-4 py-2 bg-red-700 text-white rounded-lg">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;
