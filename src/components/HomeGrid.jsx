import { Switch } from "./Switch";
import { MovieCard } from "./MovieCard";
import {  useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
export const HomeGrid = ({ mediaType, switchData }) => {
  const [endpoint, setEndpoint] = useState(switchData?.[0]?.toLowerCase() || "");
  const { data, loading } = useFetch(
    `${mediaType === "Movies" ? "" : "/trending"}/${
      mediaType === "Movies" ? "movie" : "tv"
    }/${endpoint}`
  );
  const navigate = useNavigate()

  const onActiveChange = (tab) => {
    if (tab === "TOP RATED") {
      setEndpoint("top_rated");
    } else {
      setEndpoint(tab.toLowerCase());
    }
  };
  console.log(mediaType)
  const skeleton = () => {
    return (
      <div className="flex animate-pulse flex-col items-center gap-2 w-[170px]">
        <div className="flex items-center justify-center w-full h-[265px]  rounded-lg   bg-blue-950">
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
        <span className="w-full h-7 rounded-xl bg-blue-950"></span>
      </div>
    );
  };
  return (
    <div>
      <div className="flex justify-between gap-4 sm:gap-10 items-end w-full ">
        <h3 className="text-2xl md:text-3xl font-bold text-nowrap">
          {mediaType === "Movies" ? "Movies" : "Tv Shows"}
        </h3>
        <Switch data={switchData} onActiveChange={onActiveChange} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 min-h-[900px] lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-4 pr-4">
        {!loading ? (
          data?.results?.slice(0, 15).map((item) => {
            return (
              <MovieCard
                item={item}
                mediaType={item?.media_type}
                key={item?.id}
              />
            );
          })
        ) : (
          <>
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </>
        )}
      </div>
      <button onClick={()=>{
        navigate(`/explore/${mediaType === "Movies" ? "movie" : "tv"}`)
      }} className="text-white">
        See more {mediaType === "Movies" ? "Movies" : "Tv Shows"}
      </button>
    </div>
  );
};
