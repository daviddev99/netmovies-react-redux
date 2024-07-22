import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate()
  const [isSticky, setIsSticky] = useState(false);
  const [query,setQuery] = useState("")
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed z-20 w-full bg-[#00000040] backdrop-blur-sm duration-300 ${
        isSticky ? "-translate-y-20" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl h-20 flex w-5/6 mx-auto items-center justify-between">
        <div className="flex gap-10 items-end text-white">
          <Link to={"/"} className="text-3xl font-bold">
            NetMovies
          </Link>
          <ul className="flex gap-6 font-light uppercase ">
            <Link
              target="_parent"
              to="/explore/movie"
              className="tracking-widest hover:text-blue-500 duration-150"
            >
              Movies
            </Link>
            <Link
              target="_parent"
              to="/explore/tv"
              className="tracking-widest hover:text-blue-500 duration-150"
            >
              Tv Shows
            </Link>
          </ul>
        </div>
        <div className="rounded-full bg-[#080f28] border border-blue-500 py-2 px-4 flex items-center">
          <input
            type="text"
            className="outline-none bg-transparent text-gray-400"
            placeholder="Ice Age, Shrek..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            onKeyDown={(e) => {
              if(e.key === "Enter") {
                navigate(`/search?query=${query}`,{
                  replace:true
                })
              }
            }}
          />
            <FaSearch className="text-blue-600" onClick={()=>{
              navigate(`/search?query=${query}`)
            }}/>
        </div>
      </div>
    </header>
  );
};
