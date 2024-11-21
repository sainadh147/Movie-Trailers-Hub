import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = ({ movieId }) => {
  // console.log("useMovieTrailer");
  // console.log(movieId);
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
      const response = await fetch(url, API_Options);
      const json = await response.json();
      // console.log(json);
      const trailers = json.results.filter((video) => video.type === "Trailer");
      if (trailers.length > 0) {
        const video = trailers[Math.floor(Math.random() * trailers.length)];
        if (video && video.key) {
          dispatch(addTrailerVideo(video.key));
        }
      }
    } catch (error) {
      console.error("Error fetching movie videos:", error);
      // Reload the page on error
      // window.location.reload();
    }
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
