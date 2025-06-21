import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BidderList.css";

export const BidderList = ({ productId, token }) => {
    const [bidders, setBidders] = useState([]);
    const [awardedBidderId, setAwardedBidderId] = useState(null);

    // 입찰자 목록 불러오기
    const fetchBidders = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/products/${productId}/bidders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data && res.data.success) {
                setBidders(res.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (productId && token) {
            fetchBidders();
        }
    }, [productId, token]);

    // 낙찰하기 
    const handleAward = async (bidderId) => {
        try {
            const res = await axios.post(
                `http://localhost:8080/api/products/${productId}/bidders/award/${bidderId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert(res.data.message || "낙찰 완료!");
            setAwardedBidderId(bidderId);
            fetchBidders();
        } catch (error) {
            alert("낙찰에 실패했습니다.");
            console.error(error);
        }
    };

    return (
        <div className="box">
            <div className="group">
                <div className="overlap-wrapper">
                    <div className="overlap">
                        <div className="text-wrapper">입찰자 목록</div>
                        {bidders.map((bidder) => (
                            <div key={bidder.bidderId} className="bidder-card">
                                <div className="nickname">{bidder.nickname}</div>
                                <div className="price">{bidder.price.toLocaleString()}원</div>
                                <div className="submitted-ago">{bidder.submittedAgo}</div>
                                {awardedBidderId ? (
                                    <button
                                        disabled
                                        className={`award-button disabled ${awardedBidderId === bidder.bidderId ? "awarded" : "closed"
                                            }`}
                                    >
                                        {awardedBidderId === bidder.bidderId ? "낙찰완료" : "낙찰마감"}
                                    </button>
                                ) : (
                                    <button
                                        className="award-button"
                                        onClick={() => handleAward(bidder.bidderId)}
                                    >
                                        낙찰하기
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="rectangle-3" />
                    </div>
                </div>
            </div>
        </div>
    );
};
