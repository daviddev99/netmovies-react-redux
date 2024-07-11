import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

export const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
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
      className={`fixed z-10 w-full bg-[#00000040] backdrop-blur-sm duration-300 ${
        isSticky ? "-translate-y-20" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl h-20 flex w-full mx-auto items-center justify-between">
        <div className="flex gap-10 items-end text-white">
          <h1 className="text-3xl font-bold">NetMovies</h1>
          <ul className="flex gap-6 font-light uppercase ">
            <li className="tracking-widest hover:text-blue-500 duration-150">
              Home
            </li>
            <li className="tracking-widest hover:text-blue-500 duration-150">
              Movies
            </li>
            <li className="tracking-widest hover:text-blue-500 duration-150">
              Tv Shows
            </li>
          </ul>
        </div>
        <div className="rounded-full bg-[#080f28] border border-blue-500 py-2 px-4 flex items-center">
          <input
            type="text"
            className="outline-none bg-transparent text-gray-400"
            placeholder="Ice Age, Shrek..."
          />
          <FaSearch className="text-blue-600" />
        </div>
      </div>
    </header>
  );
};
