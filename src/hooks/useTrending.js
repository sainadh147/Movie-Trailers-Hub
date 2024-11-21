import { API_Options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowTrending } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTrending = () => {
  const dispatch = useDispatch();
  const getTrending = async () => {
    const url = "https://api.themoviedb.org/3/trending/movie/day";
    const data = await fetch(url, API_Options);
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowTrending(json.results));
  };
  useEffect(() => {
    getTrending();
  }, []);
};
export default useTrending;
