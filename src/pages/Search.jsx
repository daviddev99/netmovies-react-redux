import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { fetchFromApi } from "../api";
import { MovieCard } from "../components/MovieCard";

export const Search = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("query");

  useEffect(() => {
    setPage(1);
    fetchInitialData();
  }, [query]);

  useEffect(() => {
    if (inView) {
      fetchNextData();
    }
  });



  const { inView, ref } = useInView();


  const fetchInitialData = () => {
    setLoading(true);
    fetchFromApi(
      `/search/multi?query=${query.toLowerCase().trim()}&page=${page}`
    ).then((res) => {
      setData(res);
      setLoading(false);
    });
  };

  const fetchNextData = () => {
    fetchFromApi(`/search/multi?query=${query}&page=${page}`).then(
      (response) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data.results, ...response.results],
          });
        } else {
          setData(response);
        }
        setPage((prev) => prev + 1);
      }
    );
  };

  const skeleton = () => {
    return (
      <div className="flex animate-pulse flex-col items-center gap-2">
        <div className="flex items-center justify-center w-full h-[250px]  rounded-lg   bg-blue-950">
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
    <section className="w-full relative text-white">
      <div className="max-w-7xl mx-auto w-[90%]  flex flex-col gap-4 pt-32 ">
        <div className="w-full flex justify-between">
          <h4 className="text-2xl font-bold text-gray-400">
            Search results for: <span className="text-white">{query}</span>
          </h4>
          <div className="flex gap-4"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 min-h-[900px] lg:grid-cols-5 gap-6 pt-4 pr-4">
          {!loading
            ? data?.results?.map((item, i) => {
                return (
                  <MovieCard item={item} key={i} mediaType={item?.media_type} />
                );
              })
            : <>
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            </>}
        </div>
        <div ref={ref}></div>
      </div>
    </section>
  );
};
