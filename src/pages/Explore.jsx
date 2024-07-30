import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { fetchFromApi } from "../api";
import Select from "react-select";
import useFetch from "../hooks/useFetch";
import { MovieCard } from "../components/MovieCard";

let filters = {};

export const Explore = () => {
  const { mediaType } = useParams();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortBy] = useState(null);
  const [loading, setLoading] = useState(false);

  const { inView, ref } = useInView();

  useEffect(() => {
    if (genre || sortby) {
      fetchData();
    }
  }, [genre, sortby]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mediaType]);

  useEffect(() => {
    filters = {};
    setData(null);
    setPage(1);
    setSortBy(null);
    setGenre(null);
    fetchData();
  }, [mediaType]);

  useEffect(() => {
    if (inView) {
      fetchNextData();
    }
  }, [inView]);

  const { data: genresList } = useFetch(`/genre/${mediaType}/list`);

  const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ];

  const filtersURL = new URLSearchParams(filters).toString();

  const fetchData = () => {
    setLoading(true);
    fetchFromApi(`/discover/${mediaType}?${filtersURL}`).then((res) => {
      setData(res);
      setLoading(false);
      setPage((prev) => prev + 1);
    });
  };

  const fetchNextData = () => {
    setLoading(true);
    fetchFromApi(`/discover/${mediaType}?page=${page}&${filtersURL}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data.results, ...res.results],
          });
          setLoading(false);
          setPage((prev) => prev + 1);
        } else {
          setData(res);
          setLoading(false);
        }
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

  const onChange = (selectedItems, action) => {
    if (action.name === "genres") {
      setGenre(selectedItems);
      let genreId = selectedItems?.map((g) => g.id).toString();
      filters.with_genres = genreId;
      if (action.name === "clear") {
        delete filters.with_genres;
      }
    }
    if (action.name === "sortby") {
      setSortBy(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }
  };

  return (
    <section className="w-full relative text-white">
      <div className="max-w-7xl mx-auto min-h-screen w-[90%]  flex flex-col gap-4 pt-32 ">
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-4 items-center">
          <h4 className="text-2xl text-nowrap font-bold text-orange-400">
            {mediaType === "movie" ? "Explore Movies" : "Explore Tv Shows"}
          </h4>
          <div className="flex justify-center gap-4 w-full md:w-fit text-black">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresList?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
            />
            <Select
              name="sortby"
              value={sortby}
              closeMenuOnSelect={false}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6  w-full">
          {!loading
            ? data?.results?.map((item) => {
                return (
                  <MovieCard item={item} mediaType={mediaType} key={item?.id} />
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
