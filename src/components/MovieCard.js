import React from "react";
import { imageURL } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div>
      <div className="w-48 pr-4">
        <Link to={`/player/${movie.id}`}>
          <img src={imageURL + movie.poster_path} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
