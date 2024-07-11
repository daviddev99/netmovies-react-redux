import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { Switch } from "../components/Switch";
import { Featured } from "../components/Featured";
import { Link } from "react-router-dom";
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
    <section className="w-full relative">
      <div className="max-w-7xl mx-auto h-[600px] flex flex-col items-center justify-center">
        <div className="absolute left-0 max-h-[600px] overflow-hidden opacity-50">
          <img
            src={url?.backdrop + homeRandomMovie?.backdrop_path}
            alt=""
            className="w-full h-full object-cover object-top"
          />
          <div className="bg-gradient-to-t absolute bottom-0 h-96 from-[#080f28] to-transparent text-white w-full"></div>
        </div>
        <div className="flex flex-col gap-4 text-white w-full z-10">
          <h3 className="text-5xl font-bold">
            {homeRandomMovie?.original_title}
          </h3>
          <div className="flex gap-2">
            <p className="text-orange-300">
              {homeRandomMovie?.vote_average.toFixed(1)}/10
            </p>
            <p>{date}</p>
          </div>
          <p className="text-2xl text-gray-400">{homeRandomMovie?.overview}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto  text-white">
        <div className="flex justify-between">
          <div>
            <div className="flex gap-10 items-end w-full ">
              <h3 className="text-3xl font-bold">Movies</h3>
              <Switch data={["DAY", "WEEK"]} />
            </div>
            <div className="grid grid-cols-5 gap-6 pt-4 pr-4">
              {data?.results?.slice(0, 15).map((item) => {
                let posterImage = url?.backdrop + item?.poster_path;
                let releaseDate = new Date(
                  item.release_date
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });
                return (
                  <Link to={`/movie/${item?.id}`} key={item?.id} className="group relative">
                    <img
                      src={posterImage}
                      alt=""
                      className="rounded-lg  group-hover:opacity-40"
                    />
                    <p className="group-hover:text-blue-500 text-center pt-2">
                      {item?.original_title}
                    </p>
                    <div className="absolute hidden group-hover:block top-[30%]  bg-black border-2  translate-x-20 z-10 border-blue-500 p-4 h-36  rounded-md w-[40ch] overflow-hidden">
                      <h5 className="text-nowrap font-bold">
                        {item.original_title}
                      </h5>
                      <div className="flex gap-3">
                        <p>{item.vote_average.toFixed(1)}/10</p>
                        <p>{releaseDate}</p>
                      </div>
                      <span className="text-gray-400 overflow-ellipsis  ">
                        {item.overview}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-20">
              <div className="flex gap-10 items-end w-full ">
                <h3 className="text-3xl font-bold">Tv Shows</h3>
                <Switch data={["DAY", "WEEK"]} />
              </div>
              <div className="grid grid-cols-5 gap-6 pt-4 pr-4">
                {data?.results?.slice(0, 15).map((item) => {
                  let posterImage = url?.backdrop + item?.poster_path;
                  let releaseDate = new Date(
                    item.release_date
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  });
                  return (
                    <div key={item?.id} className="group relative">
                      <img
                        src={posterImage}
                        alt=""
                        className="rounded-lg  group-hover:opacity-40"
                      />
                      <p className="group-hover:text-blue-500 text-center pt-2">
                        {item?.original_title}
                      </p>
                      <div className="absolute hidden group-hover:block top-[30%]  bg-black border-2  translate-x-20 z-10 border-blue-500 p-4 h-36  rounded-md w-[40ch] overflow-hidden">
                        <h5 className="text-nowrap font-bold">
                          {item.original_title}
                        </h5>
                        <div className="flex gap-3">
                          <p>{item.vote_average.toFixed(1)}/10</p>
                          <p>{releaseDate}</p>
                        </div>
                        <span className="text-gray-400 overflow-ellipsis  ">
                          {item.overview}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Featured/>
        </div>
      </div>
    </section>
  );
};
