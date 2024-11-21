import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  // console.log("Video background");
  useMovieTrailer({ movieId });
  const trailer = useSelector((store) => store.movies.trailerVideo);
  // console.log(trailer);
  return (
    <div className="bg-gradient-to-b from-black">
      <iframe
        className="w-screen aspect-video "
        src={
          "https://www.youtube.com/embed/" +
          trailer +
          "?autoplay=1&mute=1&loop=1&playlist=" +
          trailer +
          "&controls=0&showinfo=0&modestbranding=0&iv_load_policy=3&disablekb=1&fs=0&rel=0"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
