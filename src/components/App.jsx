import { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Loader from "./Loader";
import fetchApi from "../service/Fetchapi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PhotoFinder } from "./App.styled";

export const App = () => {
  const [search, setSearch] = useState('');
  const [picture, setPicture] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);

  const handleSubmit = (query) => {
    setSearch(query);
    setLoader(true);
    setPage(1);
    setPicture([])
  };

  const handleBtnClick = () => {
    setPage(page + 1)
  };

  const selectElImagesArr = (arr) => {
    return arr.map(({ id, webformatURL, largeImageURL, tags }) => { return ({ id, webformatURL, largeImageURL, tags }) })
  };

  useEffect(() => {

    if (!search) {
      return
    }

    fetchApi(search, page).then(({ totalHits, hits }) => {

      setPicture(picture => { return [...picture, ...selectElImagesArr(hits)] });

        if (totalHits === 0) {
          toast('Nothing found for your request')
          return
        }

        if ( page < Math.ceil(totalHits / 12)) {
          setBtnLoad(true)
        }

        else setBtnLoad(false)
       
      }
      
      ).catch(error => console.log(`Oops! Something went wrong! ${error}`)).finally(() => setLoader(false))

  }, [search, page])

 
  return (<PhotoFinder>
    <Searchbar onSubmit={handleSubmit} />
    <ImageGallery picture={picture} />
    {btnLoad && <Button handleBtnClick={handleBtnClick} />}
    {loader && <Loader />}
    <ToastContainer />
  </PhotoFinder>
    
  );
}


