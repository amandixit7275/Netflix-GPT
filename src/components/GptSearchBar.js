import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useSelector } from "react-redux";
import openai from "../utils/openai";

export default function GptSearchBar() {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  async function handleGptSearchClick() {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    //make an API call to GPT API and get Movie Results

    const gptResults = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: gptQuery }],
    });
    console.log(gptResults.choices);
  }

  return (
    <div className="py-[8%] flex justify-center ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black w-1/2 grid grid-cols-12 "
      >
        <input
          type="text"
          ref={searchText}
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-4 m-4 col-span-9 "
        />
        <button
          onClick={handleGptSearchClick}
          className=" col-span-3 m-4 px-4 py-2 bg-red-700 text-white rounded-lg"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
}
