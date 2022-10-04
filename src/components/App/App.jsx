import React, { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import fetchData from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Global } from '@emotion/react';
import { GlobalStyles } from './GlobalStyles.styled';

const App = () => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
   useEffect(() => {
    if (!value) {
      return;
    }
    const fetchImgs = async () => {
      try {
        setIsLoading(true);
        const photos = await fetchData(value, page);
        photos.hits.length === 0
          ? toast(`No results found`)
          : setImages(images => [...images, ...photos.hits]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
     };

     fetchImgs();
  }, [value, page]);


    const addValue = ({ inputValue }) => {
    if (inputValue !== value) {
      setValue(inputValue);
      setImages([]);
      setPage(1);
    } else {
      setValue(inputValue);
    }
  };

    return (
      <div>
        <Global styles={GlobalStyles} />
        <Searchbar onSubmit={addValue} />
        {isLoading && images.length === 0 ? (
          <Loader/>
        ) : (
           <ImageGallery items={images} />
        )}
        {images.length % 12 === 0 && images.length !== 0 ? (
          <Button onClick={() => setPage(() => page +1)} />
        ) : (
            ''
        )}
        <ToastContainer autoClose={5000} />
      </div>
    );
};

export default App;