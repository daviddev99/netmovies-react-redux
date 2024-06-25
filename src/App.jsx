import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { useDispatch } from "react-redux";
import { fetchFromApi } from "./api";
import { useEffect } from "react";
import { getApiConfiguration } from "./store/homeSlice";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    apiConfiguration()
  },[])
  const apiConfiguration = () => {
    fetchFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profiler: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url))
    })
  }
  return (
    <main className="w-full  relative bg-[#080f28]">
        <Header />
        <Routes>
          <Route element={<Home />} index />
        </Routes>
    </main>
  );
}

export default App;
