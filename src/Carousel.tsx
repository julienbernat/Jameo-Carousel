import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.css";

const getCarouselProps = () => ({
  showArrows: true,
  infiniteLoop: true,
  showThumbs: true,
  useKeyboardArrows: true,
  autoPlay: true,
  swipeable: true,
  dynamicHeight: false,
  emulateTouch: true,
  autoFocus: true,
  showIndicators: false,
  showStatus: false,
  interval: 2000,
  transitionTime: 500,
  selectedItem: 5,
});

const loadImages = (index: number, nbOfImages: number) => {
  const images = [];
  for (let i = index; i < index + nbOfImages; i++) {
    images.push(createDogImage(i));
  }
  return images;
};

const createDogImage = (index: number) => {
  const height = Math.floor(Math.random() * 100) + 400;
  const randomDogImage = `https://place.dog/${1000}/${height}`;
  return <img src={randomDogImage} alt={`Dog ${index}`} />;
};

const ResponsiveCarousel = () => {
  const [images, setImages] = useState(loadImages(0, 10));
  const [selectedIndex, setSelectedIndex] = useState(5);

  const onChange = (index: number) => {
    setSelectedIndex(index);
    if (index > images.length - 2) {
      setImages([...images, ...loadImages(index + 1, 5)]);
    }
  };

  return (
    <div>
      <Carousel
        {...getCarouselProps()}
        onChange={onChange}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              className="button"
              style={{ left: 16 }}
              onClick={onClickHandler}
              aria-label="Previous Image"
            >
              Précédent
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              className="button"
              style={{ right: 16 }}
              onClick={onClickHandler}
              aria-label="Next Image"
            >
              Suivant
            </button>
          )
        }
        aria-label="Dog Image Carousel"
      >
        {images.map((image, index) => {
          return (
            <div key={index} aria-hidden={index !== selectedIndex}>
              {image}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ResponsiveCarousel;
