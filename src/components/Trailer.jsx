import useFetch from "../hooks/useFetch";
import { useState } from "react";
import { Img } from "./Img";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";

export const Trailer = ({ mediaType, id }) => {
  const { data: videos } = useFetch(
    `/${mediaType}/${id}/videos?language=en-US`
  );
  const trailer = videos?.results?.find((video) => video.type === "Trailer");
  const [popup, setPopup] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h5 className="text-2xl">Trailer</h5>
        <div className=" group relative  w-fit" onClick={() => setPopup(true)}>
          <Img
            src={`https://img.youtube.com/vi/${trailer?.key}/mqdefault.jpg`}
            alt=""
            className="group-hover:blur-sm"
          />
          <FaPlay className="absolute hidden group-hover:text-red-500 group-hover:block z-20 text-5xl  top-0 bottom-0 left-0 right-0 m-auto" />
        </div>
      </div>

      {popup && (
        <div
          className="fixed overflow-auto backdrop-blur-md bg-transparent h-screen w-full top-0 left-0 z-40 flex items-center justify-center "
          onClick={() => setPopup(false)}
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer.key}`}
            controls={true}
          />
        </div>
      )}
    </>
  );
};
