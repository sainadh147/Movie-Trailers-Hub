import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import OpenAI from "openai";
import { API_Options } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const OPENAPI_KEY = useRef(null);
  // Search Movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_Options
    );
    const json = await data.json();
    return json.results;
  };
  const handleGPTSearchClick = async (event) => {
    event.preventDefault();
    let gptMovies;
    // When API key is Present
    if (!OPENAPI_KEY) {
      const openai = new OpenAI({
        apiKey: OPENAPI_KEY,
        dangerouslyAllowBrowser: true,
      });
      const gptQuery =
        "Act as a Movie Recommendation System and Suggest Some movies for the query" +
        searchText.current.value +
        " only give me names of 5 movies, comma separated like the example given ahead. Example Result: Sahoo, Kalki, Pushpa, Rockstar, Need For Speed";
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });
      if (gptResults)
        gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    } else gptMovies = searchText.current.value.split(",");

    // const gptMovies = [
    //   "Saaho",
    //   "Kalki",
    //   "Pushpa",
    //   "Rockstar",
    //   "Need For Speed",
    // ];
    // For each movie Seach in TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  return (
    <div className="flex justify-center pt-48">
      <form
        action=""
        className="bg-black w-full md:w-6/12 grid grid-cols-12 gap-2"
      >
        <div className="col-span-12 grid grid-cols-12">
          <input
            ref={searchText}
            type="text"
            className="m-2 p-4 md:p-2 col-span-8"
            placeholder={lang[langKey].searchPlaceholder}
          />
          <button
            className="text-white bg-red-800 m-2 p-2 col-span-4"
            onClick={handleGPTSearchClick}
          >
            {lang[langKey].search}
          </button>
        </div>
        <div className="m-2 col-span-12">
          <input
            ref={OPENAPI_KEY}
            type="text"
            className="p-4 md:p-2 w-full"
            placeholder="Enter API key of OPENAI API"
          />
        </div>
      </form>
    </div>
  );
};

export default GPTSearchBar;
