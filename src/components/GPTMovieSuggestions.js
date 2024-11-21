import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList.js";
import SearchedMovie from "./SearchedMovie.js";

const GPTMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames) return null;
  return (
    <div className="p-4 m-4 bg-slate-800 text-white">
      <div className="">
        {movieNames.map((movieName, index) => {
          return (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
