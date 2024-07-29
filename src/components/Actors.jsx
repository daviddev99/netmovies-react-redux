import useFetch from "../hooks/useFetch";

export const Actors = ({ mediaType, id }) => {
  const { data: credits } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <>
      {credits.cast && (
        <>
          <h5 className="text-2xl">Actors: </h5>
          <p className="text-balance">
            {credits?.cast
              ?.slice(0, 10)
              .map((a) => a?.name)
              .join(", ")}
          </p>
        </>
      )}
    </>
  );
};
