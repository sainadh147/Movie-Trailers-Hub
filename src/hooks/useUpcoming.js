import { API_Options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpComingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcoming = () => {
  const dispatch = useDispatch();
  const getUpcomingMovies = async () => {
    const url = "https://api.themoviedb.org/3/movie/upcoming";
    const data = await fetch(url, API_Options);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addUpComingMovies(json.results));
  };
  useEffect(() => {
    getUpcomingMovies();
  }, []);
};
export default useUpcoming;
