import React, { useRef } from "react";
import lang from "../utils/languageConstant";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";

export default function GptSearchBar() {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );

    const json = await data.json();
    return json.results;
  };

  async function handleGptSearchClick() {
    if (!searchText.current.value) return;
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    //make an API call to GPT API and get Movie Results

    const gptResults = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: gptQuery }],
    });

    const gptMovies = gptResults?.choices[0]?.message?.content.split(",");
    console.log(gptMovies);

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
    console.log(tmdbResults);
  }

  return (
    <div className=" pt-[40%] md:pt-[10%]  flex justify-center ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black w-full md:w-1/2 grid grid-cols-12 "
      >
        <input
          type="text"
          ref={searchText}
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-4 m-4 col-span-9 "
        />
        <button
          onClick={handleGptSearchClick}
          className=" col-span-3 m-4 px-4 py-2 bg-red-700 text-sm text-white rounded-lg"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
}
