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
                setBidders(res.data);
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
            {bidders.length === 0 && <div>입찰자가 없습니다.</div>}
            {bidders.map(bidder => (
   <div key={bidder.bidderId} className={`overlap-${bidder.bidderId}`}>
                <div className="rectangle" />
                <div className="text-wrapper-4">{bidder.nickname}</div>
                <div className="price">{bidder.price.toLocaleString()}원</div>
                <div className="submitted-ago">{bidder.submittedAgo}</div>
                <div className="div-wrapper">
                  <div className="overlap-group-2">
                    <button className="award-button">낙찰하기</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="rectangle-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};
