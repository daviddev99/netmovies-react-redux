import useFetch from "../hooks/useFetch";
import { MovieCard } from "./MovieCard";

export const Recomendations = ({ mediaType, id }) => {
  const { data: recommendations } = useFetch(
    `/${mediaType}/${id}/recommendations?language=en-US`
  );
  return (
    <>
      {recommendations?.results?.length > 1 && (
        <div className="overflow-hidden flex flex-col gap-4">
          <h5 className="text-2xl">Recommendations</h5>
          <div className="grid grid-cols-4 gap-4 w-full ">
            {recommendations?.results?.slice(0, 4)?.map((item) => {
              return <MovieCard item={item} key={item?.id} mediaType={mediaType}/>;
            })}
          </div>
        </div>
      )}
    </>
  );
};
