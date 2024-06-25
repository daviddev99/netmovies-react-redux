import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
export const Home = () => {
  const { url } = useSelector((state) => state.home);
  const { data } = useFetch("/movie/upcoming");
  const homeRandomMovie =
  data?.results?.[Math.floor(Math.random() * data.results.length)];
  const date = new Date(homeRandomMovie?.release_date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  console.log(homeRandomMovie);
  return (
    <section className="w-full relative">
      <div className="max-w-7xl mx-auto h-[800px] flex flex-col items-center justify-center">
        <div className="absolute left-0 max-h-[800px] overflow-hidden opacity-50">
          <img
            src={
              url?.backdrop +
              homeRandomMovie?.backdrop_path
            }
            alt=""
            className="w-full h-full object-cover object-bottom"
          />
          <div className="bg-gradient-to-t absolute bottom-0 h-96 from-[#080f28] to-transparent text-white w-full"></div>
        </div>
        <div className="flex flex-col gap-4 text-white w-full z-10">
          <h3 className="text-5xl font-bold">{homeRandomMovie?.original_title}</h3>
          <div className="flex gap-2">
            <p className="text-orange-300">{homeRandomMovie?.vote_average.toFixed(1)}/10</p>
            <p>{date}</p>
          </div>
          <p className="text-2xl text-gray-400">{homeRandomMovie?.overview}</p>
        </div>
      </div>
    </section>
  );
};
