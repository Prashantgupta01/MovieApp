
import { useEffect } from "react"
import { fetchDataFromApi } from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from "./store/homeSlice"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import NavHeader from "./components/header/NavHeader"
import Footer from './components/footer/Footer'

import Home from "./pages/home/Home"
import SearchResult from "./pages/searchResult/SearchResult"
import Explore from './pages/explore/Explore'
import Details from './pages/details/Details'
import PageNotFound from './pages/404/PageNotFound'


function App() {
  const dispatch = useDispatch()
  const url = useSelector((state) => state.home.url)
  // console.log(url)
  useEffect(() => {
    fetchApiConfig()
  }, [])


  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
          
        }
        dispatch(getApiConfiguration(url))
        // console.log(url)
      })
      
  }

  return (
    <>
      <BrowserRouter>
        <NavHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App
