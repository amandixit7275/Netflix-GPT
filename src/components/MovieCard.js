import React from "react";
import { IMG_CDN_URL } from "../utils/constant";

function MovieCard({ posterPath }) {
  console.log(posterPath);
  return (
    <div className="w-36 md:w-46 pr-4">
      <img src={IMG_CDN_URL + posterPath} alt="Movie Card" />
    </div>
  );
}

export default MovieCard;
