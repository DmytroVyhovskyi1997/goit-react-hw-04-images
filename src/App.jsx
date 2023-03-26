import { useState, useEffect } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import { fetchImages } from 'Api/fetchImages';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import  Modal  from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import Notiflix from 'notiflix';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentSearch, setCurrentSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [alt, setAlt] = useState(null);

  const handleSubmit = (searchQuery, selectedImage) => {
    setCurrentSearch(searchQuery);
    setSelectedImage(selectedImage);
    if (searchQuery !== selectedImage) {
      setImages([]);
      setPage(1);
    }
  };

  const btnReadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setAlt(null);
  };

  useEffect(() => {
    const fetchImagesData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchImages(currentSearch, page);
        if (response.hits.length === 0) {
          setImages([]);
          Notiflix.Notify.failure(
            'No results were found for your search, please try something else.'
          );
          return;
        }
        setImages(prevImages => [...prevImages, ...response.hits]);
        console.log(page);
      } catch (error) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (currentSearch !== '') {
      fetchImagesData();
    }
  }, [currentSearch, page]);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {selectedImage && (
        <Modal onClose={closeModal} selectedImage={selectedImage} alt={alt} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && isLoading === false && (
        <Button btnReadMore={btnReadMore} />
      )}
    </>
  );
};

export default App;
