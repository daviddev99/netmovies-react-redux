import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { fetchFromApi } from "../api";
import { Img } from "../components/Img";
import NoPoster from "../assets/no-poster.png";

export const Search = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { url } = useSelector((state) => state.home);

  const { inView, ref } = useInView();
  // console.log(data);

  const query = searchParams.get("query");

  const fetchInitialData = () => {
    setLoading(true);
    fetchFromApi(`/search/multi?query=${query}&page=${page}`).then((res) => {
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
          console.log(data);
        }
        setPage((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPage(1);
    fetchInitialData();
  }, [query]);

  useEffect(() => {
    if (inView) {
      fetchNextData();
    }
  });

  return (
    <section className="w-full relative text-white">
      <div className="max-w-7xl mx-auto  flex flex-col gap-4 pt-32 ">
        <div className="w-full flex justify-between">
          <h4>Search results for: {searchParams.get("query")}</h4>
          <div className="flex gap-4"></div>
        </div>
        <div className="grid grid-cols-5 gap-6 pt-4 pr-4">
          {data?.results?.map((item) => {
            let posterImage = item?.poster_path
              ? url?.backdrop + item?.poster_path
              : NoPoster;

            return (
              <Link
                to={`/${item?.media_type === "movie" ? "movie" : "tv"}/${
                  item?.id
                }`}
                key={item?.id}
                className="group relative"
              >
                <Img
                  src={posterImage}
                  alt=""
                  className="rounded-lg  group-hover:opacity-40"
                />
                <p className="group-hover:text-blue-500 text-center pt-2">
                  {item?.original_title || item?.name}
                </p>
              </Link>
            );
          })}
        </div>
        <div ref={ref}></div>
      </div>
    </section>
  );
};
