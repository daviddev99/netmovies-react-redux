import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { Img } from "../components/Img";
import { Similar } from "../components/Similar";
import { Recomendations } from "../components/Recomendations";
import { Trailer } from "../components/Trailer";
import { Actors } from "../components/Actors";
import { useEffect } from "react";

export const Details = () => {
  const { mediaType, id } = useParams();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  useEffect(() => {
    window.addEventListener(onload, window.scrollTo(0, 0));
  }, [mediaType, id]);
  return (
    <section className="w-full relative">
      <div className="max-w-7xl w-[90%] mx-auto min-h-screen flex ">
        {!loading ? (
          <>
            <div className="absolute left-0  top-0 overflow-hidden opacity-30">
              <Img
                src={url?.backdrop + data?.backdrop_path}
                alt=""
                className={`${
                  data?.backdrop_path ? "w-screen" : "w-full"
                } h-full object-cover object-top`}
              />
              <div className="bg-gradient-to-t absolute bottom-0 h-96 from-[#080f28] to-transparent text-white w-full"></div>
            </div>
            <div className="flex flex-col md:flex-row gap-10 text-white  z-10 py-32">
              <div className="overflow-hidden flex-shrink-0  ">
                <Img
                  src={url?.backdrop + data?.poster_path}
                  alt=""
                  className="md:max-w-[350px]  rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-4xl font-bold">
                  {data?.original_title || data?.name}
                </h3>
                <h5 className="text-2xl italic text-gray-400">
                  {data?.tagline}
                </h5>
                <div className="text-lg flex flex-wrap gap-3">
                  {data?.genres?.map((g, i) => (
                    <p key={i} className="p-1 px-2 bg-red-500 rounded-lg">
                      {g?.name}
                    </p>
                  ))}
                </div>
                <Actors id={data?.id} mediaType={mediaType} />
                {data?.overview && (
                  <>
                    <h5 className="text-2xl">Overview</h5>
                    <p className="max-w-[80ch] text-gray-400">
                      {data?.overview}
                    </p>
                  </>
                )}
                <Trailer
                  id={data?.id}
                  mediaType={mediaType}
                />
                <Similar id={data?.id} mediaType={mediaType} />
                <Recomendations id={data?.id} mediaType={mediaType} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col md:flex-row gap-10 text-white  py-32 min-h-screen ">
            <div className="bg-blue-600 h-full max-w-[350px] flex-shrink-0 max-h-[525px] w-full rounded-xl"></div>
            <div className=" flex flex-col gap-4">
              <div className="h-20 bg-blue-700 w-80 rounded-full"></div>
              <div className="w-[300px] h-14 bg-blue-700 rounded-full"></div>
              <div className="w-[500px] h-14 bg-blue-700 rounded-full"></div>
              <div className="h-52 w-[600px] bg-blue-700 rounded-2xl"></div>
              <div className="w-[325px] h-[180px] rounded-xl bg-blue-600"></div>
              <div className="grid grid-cols-4 gap-4 w-full">
                <div className="w-full h-52 bg-blue-600 rounded-xl"></div>
                <div className="w-full h-52 bg-blue-600 rounded-xl"></div>
                <div className="w-full h-52 bg-blue-600 rounded-xl"></div>
                <div className="w-full h-52 bg-blue-600 rounded-xl"></div>
              </div>
              <div></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
