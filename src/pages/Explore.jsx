import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { fetchFromApi } from "../api";
import { Img } from "../components/Img";
import NoPoster from "../assets/no-poster.png";
import Select from "react-select";
import useFetch from "../hooks/useFetch";

let filters = {};


export const Explore = () => {
  const { mediaType } = useParams();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortBy] = useState(null);
  const { url } = useSelector((state) => state.home);

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
  

  const fetchData = () => {
    fetchFromApi(`/discover/${mediaType}?${new URLSearchParams(filters).toString()}`).then(
      (res) => {
        setData(res);
        setPage((prev) => prev + 1);
      }
    );
  };

  const fetchNextData = () => {
    fetchFromApi(`/discover/${mediaType}?page=${page}&${new URLSearchParams(filters).toString()}`).then((res) => {
      if (data?.results) {
          setData({
              ...data,
              results: [...data?.results, ...res.results],
          });
          setPage((prev) => prev + 1);
      } else {
          setData(res);
      }
  })
  }

  useEffect(() => {
    filters = {};
    setData(null);
    setPage(1);
    setSortBy(null);
    setGenre(null);
    fetchData();
  }, [mediaType]);

  useEffect(()=>{
    if(inView){
      fetchNextData()
    }
  },[inView])

  const onChange = (selectedItems, action) => {
    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id).toString();
        filters.with_genres = genreId;
        console.log(filters);
      } else {
        delete filters.with_genres;
      }
    }
    if (action.name === "sortby") {
      setSortBy(selectedItems);
      if(action.action !== "clear") {
        filters.sort_by = selectedItems.value
        console.log(filters)
      }else{
        delete filters.sort_by
      }
    }
    fetchData();
    setPage(1);
  };

  return (
    <section className="w-full relative text-white">
      <div className="max-w-7xl mx-auto  flex flex-col gap-4 pt-32 ">
        <div className="w-full flex justify-between">
          <h4>
            {mediaType === "movie" ? "Explore Movies" : "Explore Tv Shows"}
          </h4>
          <div className="flex gap-4 text-black">
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
        <div className="grid grid-cols-5 gap-6 pt-4 pr-4">
          {data?.results?.map((item) => {
            let posterImage = item?.poster_path
              ? url?.backdrop + item?.poster_path
              : NoPoster;
            return (
              <Link
                to={`/${mediaType}/${item?.id}`}
                key={item?.id}
                className="group relative flex flex-col"
              >
                <div className="group-hover:opacity-40 group-hover:duration-[350ms]">

                <Img
                  src={posterImage}
                  alt=""
                  className="rounded-lg flex-shrink-0 "
                />
                </div>
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
