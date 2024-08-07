import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { useDispatch } from "react-redux";
import { fetchFromApi } from "./api";
import { useEffect } from "react";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { Details } from "./pages/Details";
import { Explore } from "./pages/Explore";
import { Search } from "./pages/Search";
import {NotFound} from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    apiConfiguration();
    genresCall();
  }, []);
  const apiConfiguration = () => {
    fetchFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profiler: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = [];

    endpoints.forEach((url) => {
      promises.push(fetchFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    allGenres = [...data[0].genres, ...data[1].genres];
    dispatch(getGenres(allGenres));
  };
  return (
    <main className="w-full  relative bg-[#080f28]">
      <Header />
      <Routes>
        <Route element={<Home />} index />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
