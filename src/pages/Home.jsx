import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { Featured } from "../components/Featured";
import { HomeGrid } from "../components/HomeGrid";
export const Home = () => {
  const { url } = useSelector((state) => state.home);
  const { data } = useFetch("/movie/upcoming");
  const homeRandomMovie =
    data?.results?.[Math.floor(Math.random() * data.results.length)];
  const date = new Date(homeRandomMovie?.release_date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <section className="w-full relative min-h-screen">
      <div className="max-w-7xl w-[90%]  mx-auto h-[600px] flex flex-col items-center justify-center">
        <div className="absolute left-0 top-0 h-[600px] w-full overflow-hidden opacity-50">
          <img
            src={url?.backdrop + homeRandomMovie?.backdrop_path}
            alt=""
            className="w-full h-full object-cover object-top"
          />
          <div className="bg-gradient-to-t absolute bottom-0 h-96 from-[#080f28] to-transparent text-white w-full"></div>
        </div>
        {homeRandomMovie && (
          <div className="flex flex-col gap-4 text-white w-full z-10">
            <h3 className="text-3xl md:text-5xl font-bold">
              {homeRandomMovie?.original_title}
            </h3>
            <div className="flex gap-2">
              <p className="text-orange-300">
                {homeRandomMovie?.vote_average.toFixed(1)}/10
              </p>
              <p>{date}</p>
            </div>
            <p className="text-md md:text-2xl text-gray-400 ">
              {homeRandomMovie?.overview.slice(0, 200)}...
            </p>
          </div>
        )}
      </div>
      <div className="max-w-7xl w-[90%] mx-auto   text-white">
        <div className="flex flex-col lg:flex-row justify-between">
          <div>
            <HomeGrid
              mediaType="Movies"
              switchData={["UPCOMING", "POPULAR", "TOP RATED"]}
            />
            <div className="mt-20">
              <HomeGrid mediaType="Tv" switchData={["DAY", "WEEK"]} />
            </div>
          </div>
          <Featured />
        </div>
      </div>
    </section>
  );
};
