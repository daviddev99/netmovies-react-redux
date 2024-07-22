import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { Img } from "../components/Img";
import { useState } from "react";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import NoPoster from "../assets/no-poster.png";

export const Details = () => {
  const { mediaType, id } = useParams();

  const [popup, setPopup] = useState(false);

  const { url } = useSelector((state) => state.home);
  const { data } = useFetch(`/${mediaType}/${id}`);
  const { data: credits } = useFetch(`/${mediaType}/${id}/credits`);
  const { data: videos } = useFetch(
    `/${mediaType}/${id}/videos?language=en-US`
  );
  const { data: similar } = useFetch(
    `/${mediaType}/${id}/similar?language=en-US`
  );
  const { data: recommendations } = useFetch(
    `/${mediaType}/${id}/recommendations?language=en-US`
  );

  const date = new Date(data?.release_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const trailer = videos?.results?.find((video) => video.type === "Trailer");

  //   const [videoId, setVideoId] = useState(null);

  console.log(similar);
  return (
    <section className="w-full relative">
      <div className="max-w-7xl mx-auto  flex ">
        <div className="absolute left-0 w-full top-0 overflow-hidden opacity-30">
          <img
            src={url?.backdrop + data?.backdrop_path}
            alt=""
            className="w-full h-full object-cover object-top"
          />
          <div className="bg-gradient-to-t absolute bottom-0 h-96 from-[#080f28] to-transparent text-white w-full"></div>
        </div>
        <div className="flex gap-10 text-white  z-10 py-32">
          <div className="overflow-hidden flex-shrink-0  ">
            <Img
              src={url?.backdrop + data?.poster_path}
              alt=""
              className="max-w-[350px]  rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-4xl font-bold">
              {data?.original_title || data?.name}
            </h3>
            <span className="text-2xl italic text-gray-400">
              {data?.tagline}
            </span>
            <span>Genres: {data?.genres?.map((g) => g?.name).join(", ")}</span>
            <span className="text-balance">
              Actors:{" "}
              {credits?.cast
                ?.slice(0, 10)
                .map((a) => a?.name)
                .join(", ")}
            </span>
            <h5 className="text-2xl">Overview</h5>
            <p className="max-w-[80ch] text-gray-400">{data?.overview}</p>
            <div>
              <p>Trailer</p>
              <div
                className=" group relative  w-fit"
                onClick={() => setPopup(true)}
              >
                <Img
                  src={`https://img.youtube.com/vi/${trailer?.key}/mqdefault.jpg`}
                  alt=""
                  className="group-hover:blur-sm"
                />
                <FaPlay className="absolute hidden group-hover:text-red-500 group-hover:block z-20 text-5xl  top-0 bottom-0 left-0 right-0 m-auto" />
              </div>
            </div>
            {similar?.results?.length > 1 ? (
              <div className="overflow-hidden">
                <h4>Similar {mediaType === "tv" ? "Tv Shows" : "Movies"}</h4>
                <div className="grid grid-cols-5 gap-4">
                  {similar?.results?.slice(0, 4)?.map((item) => {
                    let posterImage = item?.poster_path
                      ? url?.backdrop + item?.poster_path
                      : NoPoster;
                    return (
                      <Link
                        to={`/${mediaType}/${item?.id}`}
                        key={item?.id}
                        className="group relative"
                      >
                        <Img
                          src={posterImage || NoPoster}
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
              </div>
            ) : (
              ""
            )}
            {recommendations?.results?.length > 1 ? (
              <div className="overflow-hidden">
                <h4>Recommendations</h4>
                <div className="grid grid-cols-5 gap-4">
                  {recommendations?.results?.slice(0, 4)?.map((item) => {
                    let posterImage = item?.poster_path
                    ? url?.backdrop + item?.poster_path
                    : NoPoster;
                    return (
                      <Link
                        to={`/${mediaType}/${item?.id}`}
                        key={item?.id}
                        className="group relative"
                      >
                        <Img
                          src={posterImage || NoPoster}
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
              </div>
            ) : (
              ""
            )}
            {popup ? (
              <div
                className="fixed overflow-auto backdrop-blur-md bg-transparent h-screen w-full top-0 left-0 z-40 flex items-center justify-center "
                onClick={() => setPopup(false)}
              >
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer.key}`}
                  controls={true}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
