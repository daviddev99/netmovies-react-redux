import useFetch from "../hooks/useFetch";
import { useState } from "react";
import { Switch } from "./Switch";
import { useSelector } from "react-redux";
import { Img } from "./Img";
import { Link } from "react-router-dom";

export const Featured = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data } = useFetch(`/${endpoint}/popular`);
  const { url, genres } = useSelector((state) => state.home);

  const onActiveChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  const findGenresById = (genresArray, genreIds) => {
    const selectedGenres = genreIds?.map((genreId) => {
        const genre = genresArray.find((genre) => genre.id === genreId);
        return genre ? genre.name : null;
      })
      .filter((genreName) => genreName !== null);
    return selectedGenres;
  };

  return (
    <div className="">
      <h3 className="text-center text-xl font-bold">Featured</h3>
      <Switch data={["Movies", "Tv Shows"]} onActiveChange={onActiveChange} />
      <div className="w-full grid pt-4 gap-6">
        {data?.results?.slice(0, 5).map((item) => {
          let posterImage = url?.backdrop + item?.poster_path;
          const selectedGenres = findGenresById(genres, item.genre_ids);
          return (
            <Link
              to={`/${endpoint}/${item.id}`}
              key={item?.id}
              className="group flex   relative gap-2"
            >
              <Img
                src={posterImage}
                alt=""
                className="rounded-lg   group-hover:opacity-40 flex-shrink-0 max-w-[100px]"
              />
              <div>
                <p className="group-hover:text-blue-500  max-w-[20ch] ">
                  {item?.original_title || item?.original_name}
                </p>
                <p className="text-gray-400">
                  {item.vote_average.toFixed(1)}/10
                </p>
                <p>{selectedGenres.slice(0, 2).join(", ")}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
