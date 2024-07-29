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

  const { inView, ref } = useInView();

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
    fetchFromApi(`/discover/${mediaType}?${filtersURL}`).then((res) => {
      setData(res);
      setPage((prev) => prev + 1);
    });
  };

  const fetchNextData = () => {
    fetchFromApi(`/discover/${mediaType}?page=${page}&${filtersURL}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
          setPage((prev) => prev + 1);
        } else {
          setData(res);
        }
      }
    );
  };

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

  const onChange = (selectedItems, action) => {
    if (action.name === "genres") {
      setGenre(selectedItems);
      let genreId = selectedItems?.map((g) => g.id).toString();
      filters.with_genres = genreId;
      console.log(filters);
      if (action.name === "clear") {
        delete filters.with_genres;
      }
    }
    if (action.name === "sortby") {
      setSortBy(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
        console.log(filters);
      } else {
        delete filters.sort_by;
      }
    }
  };

  useEffect(()=>{
    if(genre || sortby){
      fetchData()
    }
  },[genre,sortby])

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
          {data?.results?.map((item) => {
            return (
              <MovieCard item={item} mediaType={mediaType} key={item?.id} />
            );
          })}
        </div>
        <div ref={ref}></div>
      </div>
    </section>
  );
};
