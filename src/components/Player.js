import React, { useEffect, useState } from "react";
import back_arrow from "../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trailerData, setTrailerData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });
  const [loader, setLoader] = useState(true);
  const getTrailer = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos`;
    const data = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_KEY}`,
      },
    });
    const json = await data.json();
    if (json.results.length > 0) {
      setTrailerData(json.results[0]);
    }
    setLoader(false);
  };
  useEffect(() => {
    getTrailer();
  }, []);

  return (
    <div className="h-[100vh] flex flex-col justify-center align-middle bg-black">
      <img
        className="top-5 left-5 cursor-pointer w-14"
        src={back_arrow}
        alt=""
        onClick={() => navigate("/")}
      />
      {loader ? (
        <Spinner />
      ) : trailerData.key ? (
        <>
          <iframe
            className="m-auto w-11/12 h-5/6"
            src={`https://www.youtube.com/embed/${trailerData.key}`}
            title="Trailer"
            allowFullScreen="true"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
          <div className="flex flex-col items-center text-white mt-4">
            <p className="mb-2 text-lg font-semibold">{trailerData.name}</p>
          </div>
        </>
      ) : (
        <div className=" text-white font-extrabold flex justify-center ">
          Trailer Not Found
        </div>
      )}
    </div>
  );
};

export default Player;
