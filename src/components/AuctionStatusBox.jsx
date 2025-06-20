import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AuctionStatusBox.css";

export const AuctionStatusBox = ({ productId, token }) => {
    const [productInfo, setProductInfo] = useState({
        title: "",
        timeRemaining: "",
        highestBid: 0
    });

    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                const response = await axios.get(`/api/products/${productId}/bidders/info`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const { title, timeRemaining, highestBid } = response.data.data; // 여기 수정
                setProductInfo({ title, timeRemaining, highestBid });
            } catch (error) {
                console.error("상품 정보를 불러오는 데 실패했습니다:", error);
            }
        };

        if (productId && token) {
            fetchProductInfo();
        }
    }, [productId, token]);

    return (
        <>
            <div className="auction-title-box">
                <p className="auction-title">
                    <span className="product-title">경매 상품&nbsp;&nbsp;</span>
                    <span className="product-name">{productInfo.title}</span>
                </p>
            </div>

            <div className="auction-status-box">
                <div className="auction-status-content">
                    <div className="status-card">
                        <div className="status-title">남은 시간</div>
                        <div className="status-value time">{productInfo.timeRemaining}</div>
                    </div>
                    <div className="status-card">
                        <div className="status-title">최고 입찰가</div>
                        <div className="status-value">₩{productInfo.highestBid.toLocaleString()}</div>
                    </div>
                </div>
                <p className="status-caption">
                    남은 시간이 지나면 최고 입찰자에게 자동 낙찰됩니다.
                </p>
            </div>
        </>
    );
};
