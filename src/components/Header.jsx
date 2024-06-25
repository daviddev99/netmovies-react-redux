import { FaSearch } from "react-icons/fa";

export const Header = () => {
  return (
    <header className="fixed z-10 w-full ">
      <div className="max-w-7xl h-20 flex w-full mx-auto items-center justify-between">
        <div className="flex gap-10 items-end text-white">
          <h1 className="text-3xl">NetMovies</h1>
          <ul className="flex gap-6">
            <li>Home</li>
            <li>Movies</li>
            <li>Genres</li>
            <li>Tv Shows</li>
          </ul>
        </div>
        <div className="rounded-full bg-[#080f28] border border-blue-500 py-2 px-4 flex items-center">
          <input type="text" className="outline-none bg-transparent text-gray-400" placeholder="Ice Age, Shrek..." />
          <FaSearch className="text-blue-600"/>
        </div>
      </div>
    </header>
  );
};
