import React from "react";
import "../styles/AuctionStatusBox.css";

export const AuctionStatusBox = () => {
  return (
    <div className="auction-status-box">
      <div className="auction-status-content">
        <div className="status-card">
          <div className="status-title">남은 시간</div>
          <div className="status-value time">2일 00:05:34</div>
        </div>
        <div className="status-card">
          <div className="status-title">최고 입찰가</div>
          <div className="status-value">₩1,100,000</div>
        </div>
      </div>
      <p className="status-caption">
        남은 시간이 지나면 최고 입찰자에게 자동 낙찰됩니다.
      </p>
    </div>
  );
};
