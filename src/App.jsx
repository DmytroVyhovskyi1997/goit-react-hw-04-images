import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchImages } from 'Api/fetchImages';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    images: [],
    currentSearch: '',
    selectedImage: null,
    page: 1,
    error: '',
    isLoading: false,
    alt: null,

  };

  async componentDidUpdate(prevProps, prevState) {
    const { currentSearch, page } = this.state;

    if (prevState.currentSearch !== currentSearch || prevState.page !== page) {

      this.setState({ isLoading: true });
      try {
        const response = await fetchImages(currentSearch, page);

        if (response.hits.length === 0) {
          this.setState({ images: [] });
          Notiflix.Notify.failure(
            'No results were found for your search, please try something else.'
          );

          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
        }));

        console.log(page);
      
      } catch (error) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  btnReadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = (largeImageUrl, tags) => {
    this.setState({ selectedImage: largeImageUrl, alt: tags });
  };

  closeModal = (tags) => {
    this.setState({ selectedImage: null , alt: tags });
  };

  handleSubmit = (currentSearch, selectedImage) => {
    this.setState({ currentSearch, selectedImage });

    if (currentSearch !== selectedImage) {
      this.setState({ images: [], page: 1 });
    }
  };

  render() {
    const { selectedImage, isLoading, images,tags } = this.state;
    return (
      <>
        <Searchbar
          onSubmit={this.handleSubmit}
        />
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {selectedImage && (
          <Modal
            onClose={this.closeModal}
            selectedImage={selectedImage}
            alt={tags}
          />
        )}
        {isLoading && <Loader />}
        
         {images.length > 0 && isLoading === false && (
          <Button btnReadMore={this.btnReadMore} />
        )}
   
      </>
    );
  }
}
