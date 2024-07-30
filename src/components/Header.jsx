import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";

export const Header = () => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenu = (e) => {
    e.preventDefault();
    setMenu(!menu);
  };
  return (
    <header
      className={`fixed z-20 w-full bg-[#00000040] backdrop-blur-sm duration-300 ${
        isSticky ? "-translate-y-20" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl h-20 flex w-[90%] mx-auto items-center justify-between">
        <div className="flex gap-10 items-end justify-between w-full text-white">
          <Link to={"/"} className="text-3xl font-bold">
            NetMovies
          </Link>
          <div className="hidden md:flex items-end justify-between w-full">
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
            <div className="rounded-full bg-[#080f28] border border-blue-500 py-2 px-4 flex items-center">
              <input
                type="text"
                className="outline-none bg-transparent text-gray-400"
                placeholder="Ice Age, Shrek..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/search?query=${query}`, {
                      replace: true,
                    });
                  }
                }}
              />
              <FaSearch
                className="text-blue-600"
                onClick={() => {
                  navigate(`/search?query=${query}`);
                }}
              />
            </div>
          </div>
          <CiMenuFries
            className="md:hidden cursor-pointer"
            size={30}
            onClick={handleMenu}
          />
        </div>

        <aside
          className={
            menu
              ? "fixed flex flex-col bg-[#080f28] p-4 h-screen w-[300px] duration-300 top-0 right-0 z-30"
              : "fixed flex flex-col bg-[#080f28] p-4 h-screen w-[300px] duration-300 top-0 right-[-100%] z-30"
          }
        >
          <div className=" text-black flex justify-between items-center">
            <h3 className=" text-2xl"></h3>
            <AiFillCloseCircle
              onClick={handleMenu}
              className="cursor-pointer text-red-600"
              size={30}
            />
          </div>
          <ul className="flex flex-col gap-6 font-light uppercase text-white">
            <li>
              <Link
                target="_parent"
                to="/explore/movie"
                className="tracking-widest hover:text-blue-500 duration-150"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                target="_parent"
                to="/explore/tv"
                className="tracking-widest hover:text-blue-500 duration-150"
              >
                Tv Shows
              </Link>
            </li>
            <li>
              <div className="rounded-full bg-[#080f28] border border-blue-500 py-2 px-4 flex items-center justify-between">
                <input
                  type="text"
                  className="outline-none bg-transparent text-gray-400"
                  placeholder="Ice Age, Shrek..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate(`/search?query=${query}`, {
                        replace: true,
                      });
                    }
                  }}
                />
                <FaSearch
                  className="text-blue-600"
                  onClick={(e) => {
                    navigate(`/search?query=${query}`);
                    handleMenu(e)
                  }}
                />
              </div>
            </li>
          </ul>
        </aside>

        {menu && (
          <nav className="fixed w-full z-10 h-[100dvh] bg-black/80 top-0 left-0"></nav>
        )}
      </div>
    </header>
  );
};
