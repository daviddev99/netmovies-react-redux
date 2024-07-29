import NoPoster from "../assets/no-poster.png";
import { Link } from "react-router-dom";
import { Img } from "./Img";
import { useSelector } from "react-redux";


export const MovieCard = ({item,mediaType}) => {
    const { url } = useSelector((state) => state.home);


    let posterImage = item?.poster_path
    ? url?.backdrop + item?.poster_path
    : NoPoster;
  return (
    <Link
      to={`/${mediaType ? mediaType : "movie"}/${item?.id}`}
      className="group w-fit relative "
    >
      <Img
        src={posterImage || NoPoster}
        alt=""
        className="rounded-lg  group-hover:opacity-40 "
      />
      <p className="group-hover:text-blue-500   pt-2 truncate max-w-[25ch] text-balance">
        {item?.original_title || item?.name}
      </p>
    </Link>
)}

