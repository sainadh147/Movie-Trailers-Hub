import { API_Options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTopRated } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRated = () => {
  const dispatch = useDispatch();
  const getTopRated = async () => {
    const url = "https://api.themoviedb.org/3/movie/top_rated";
    const data = await fetch(url, API_Options);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addTopRated(json.results));
  };
  useEffect(() => {
    getTopRated();
  }, []);
};
export default useTopRated;
