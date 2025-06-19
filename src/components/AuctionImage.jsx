import React, { useState } from "react";
import "../styles/AuctionImage.css";
import img1 from "../assets/images/bag1.svg"
import img2 from "../assets/images/bag2.svg"
import img3 from "../assets/images/bag3.svg"

const images = [img1, img2, img3];

export const AuctionImage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="auction-image-wrapper">
      <div className="slider-container">
        <button className="arrow left" onClick={handlePrev}>
          ❮
        </button>

        <img
          src={images[currentIndex]}
          alt={`Auction ${currentIndex + 1}`}
          className="slider-image"
        />

        <button className="arrow right" onClick={handleNext}>
          ❯
        </button>
      </div>

      <div className="indicator-container">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`indicator-dot ${currentIndex === idx ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};
