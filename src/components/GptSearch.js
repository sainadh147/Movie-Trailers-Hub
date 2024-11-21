import React from "react";
import GPTSearchBar from "./GPTSearchBar";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import BackgroundImage from "../utils/Background-image.jpg";

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10 ">
        <img
          className="w-full h-screen object-cover lg:w-screen lg:object-cover"
          src={BackgroundImage}
          alt="Background-img"
        />
      </div>
      <div className="">
        <GPTSearchBar />
        <GPTMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;
