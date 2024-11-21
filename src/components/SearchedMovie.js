import React from "react";
import MovieCard from "./MovieCard";

const SearchedMovie = ({ title, movies }) => {
  return (
    <div className="px-5">
      <div className="text-2xl py-4 font-bold text-white">{title}</div>
      <div className="flex overflow-x-scroll no-scrollbar">
        {movies && (
          <div className="flex">
            <MovieCard key={movies} movie={movies} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchedMovie;
