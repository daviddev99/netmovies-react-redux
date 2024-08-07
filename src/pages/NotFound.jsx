import { useNavigate } from "react-router-dom";
export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[90vh] flex flex-col  justify-center items-center text-white text-4xl font-bold">
      <span className="text-red-500">404</span>
      <span>Page not found!</span>
      <button 
      className=" py-2 px-4 rounded-lg text-xl mt-4 bg-blue-500"
      onClick={()=>navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
};
