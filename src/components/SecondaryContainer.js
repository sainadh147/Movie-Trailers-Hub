import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const topRated = useSelector((store) => store.movies.topRated);
  const nowTrending = useSelector((store) => store.movies.nowTrending);
  const upComingMovies = useSelector((store) => store.movies.upComingMovies);

  return (
    <div className="bg-black">
      <div className="pt-40 lg:pt-0 lg:-my-50 xl:-my-60 lg:pl-10 relative z-10">
        <MovieList title={"Now Playing"} movies={nowPlayingMovies} />
        <MovieList title={"Popular Movies"} movies={popularMovies} />
        <MovieList title={"Top Rated"} movies={topRated} />
        <MovieList title={"Now Trending"} movies={nowTrending} />
        <MovieList title={"Upcoming Movies"} movies={upComingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
