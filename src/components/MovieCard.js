import React from "react";
import { IMG_CDN_URL } from "../utils/constant";

function MovieCard({ posterPath }) {
  console.log(posterPath);
  return (
    <div>
      <img src={IMG_CDN_URL + posterPath} alt="Movie Card" />
    </div>
  );
}

export default MovieCard;