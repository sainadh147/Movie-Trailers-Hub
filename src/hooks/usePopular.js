import { API_Options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopular = () => {
  const dispatch = useDispatch();
  const checkUsePopular = useSelector((store) => store.movies.popularMovies);
  const getPopular = async () => {
    const url = "https://api.themoviedb.org/3/movie/popular";
    const data = await fetch(url, API_Options);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addPopularMovies(json.results));
  };
  useEffect(() => {
    if (!checkUsePopular) getPopular();
  }, []);
};
export default usePopular;
