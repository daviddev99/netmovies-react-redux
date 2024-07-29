import useFetch from "../hooks/useFetch";
import { MovieCard } from "./MovieCard";
export const Similar = ({ mediaType, id, loading }) => {
  const { data: similar } = useFetch(
    `/${mediaType}/${id}/similar?language=en-US`
  );
  return (
    <>
      {!loading ? (
        <>
          {similar?.results?.length > 0 && (
            <div className="overflow-hidden flex flex-col gap-4">
              <h5 className="text-2xl">
                Similar {mediaType === "tv" ? "Tv Shows" : "Movies"}
              </h5>
              <div className="grid grid-cols-4 gap-4 w-full ">
                {similar?.results?.slice(0, 4)?.map((item) => (
                  <MovieCard item={item} mediaType={mediaType} key={item?.id} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-4 gap-4 w-full">
            <div className="w-full h-full bg-blue-400"></div>
            <div className="w-full h-full bg-blue-400"></div>
            <div className="w-full h-full bg-blue-400"></div>
            <div className="w-full h-full bg-blue-400"></div>
        </div>
      )}
    </>
  );
};
