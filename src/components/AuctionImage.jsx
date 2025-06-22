import React from "react";
import "../styles/AuctionImage.css";
import defaultImg from "../assets/images/bread.svg";

export const AuctionImage = ({ image }) => {
  if (!image) return null;

  return (
    <div className="auction-image-wrapper">
      <div className="single-image-container">
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt="경매 상품 이미지"
          className="single-auction-image"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultImg;
          }}
        />
      </div>
    </div>
  );
};
