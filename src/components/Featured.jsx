import useFetch from "../hooks/useFetch";
import { useState } from "react";
import { Switch } from "./Switch";
import { useSelector } from "react-redux";
import { Img } from "./Img";
import { Link } from "react-router-dom";

export const Featured = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);
  const { url, genres } = useSelector((state) => state.home);

  const onActiveChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  const findGenresById = (genresArray, genreIds) => {
    const selectedGenres = genreIds
      ?.map((genreId) => {
        const genre = genresArray?.find?.((genre) => genre?.id === genreId);
        return genre ? genre.name : null;
      })
      .filter((genreName) => genreName !== null);
    return selectedGenres;
  };

  const skeleton = () => {
    return (
      <div className="flex animate-pulse  gap-2">
        <div className="flex items-center justify-center w-[100px] h-[150px]  rounded-lg   bg-blue-950">
          <svg
            className="w-10 h-10  dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <span className="max-w-[25ch] w-full h-7 rounded-xl bg-blue-950">

              </span>
      </div>
    );
  };

  return (
    <div className="w-full md:max-w-72 pt-10 md:pt-0">
      <h3 className="text-center text-2xl font-bold">Featured</h3>
      <Switch data={["Movies", "Tv Shows"]} onActiveChange={onActiveChange} />
      <div className="w-full grid pt-4 gap-6">
        {!loading ? (
          data?.results?.slice(0, 5).map((item) => {
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
                  <p className="group-hover:text-blue-500  md:max-w-[20ch] ">
                    {item?.original_title || item?.original_name}
                  </p>
                  <p className="text-gray-400">
                    {item.vote_average.toFixed(1)}/10
                  </p>
                  <p>{selectedGenres.slice(0, 2).join(", ")}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <>
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </>
        )}
      </div>
    </div>
  );
};
