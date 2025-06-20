import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BidderList.css";

export const BidderList = ({ productId, token }) => {
    const [bidders, setBidders] = useState([]);

    useEffect(() => {
        const fetchBidders = async () => {
            try {
                const res = await axios.get(`/api/products/${productId}/bidders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data && res.data.success) {
                    setBidders(res.data.data);
                    console.log("입찰자 목록:", res.data.data);
                } else {
                    console.warn("API 요청 실패:", res.data.errorMsg);
                }
            } catch (error) {
                console.error("입찰자 목록 불러오기 실패:", error);
            }
        };

        fetchBidders();
    }, [productId, token]);


    const handleAward = async (bidderId) => {
        try {
            const res = await axios.post(`/api/bidders/${bidderId}/award`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert(res.data.errorMsg || "낙찰 완료!");
        } catch (error) {
            console.error("낙찰 실패:", error);
            alert("낙찰에 실패했습니다.");
        }
    };

    return (
        <div className="box">
            <div className="group">
                <div className="overlap-wrapper">
                    <div className="overlap">
                        <div className="text-wrapper">입찰자 목록</div>
                        {bidders.map(bidder => (
                            <div key={bidder.bidderId} className="bidder-card">
                                <div className="nickname">{bidder.nickname}</div>
                                <div className="price">{bidder.price.toLocaleString()}원</div>
                                <div className="submitted-ago">{bidder.submittedAgo}</div>
                                <button
                                    className="award-button"
                                    onClick={() => handleAward(bidder.bidderId)}
                                >
                                    낙찰하기
                                </button>
                            </div>
                        ))}

                        <div className="rectangle-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};
