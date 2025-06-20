import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BidderList.css";

export const BidderList = ({ productId, token }) => {
    const [bidders, setBidders] = useState([]);
    const [awardedBidderId, setAwardedBidderId] = useState(null);

    // 입찰자 목록 불러오기
    const fetchBidders = async () => {
        try {
            const res = await axios.get(`/api/products/${productId}/bidders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data && res.data.success) {
                setBidders(res.data.data);
                // 만약 낙찰자가 있으면 ID 저장
                const awarded = res.data.data.find(b => b.awardedAt !== null);
                if (awarded) setAwardedBidderId(awarded.bidderId);
                else setAwardedBidderId(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 컴포넌트가 처음 렌더링될 때 및 productId/token 변경 시 입찰자 목록 불러오기
    useEffect(() => {
        if (productId && token) {
            fetchBidders();
        }
    }, [productId, token]);

    // 낙찰하기 API 호출
    const handleAward = async (bidderId) => {
        try {
            const res = await axios.post(
                `/api/products/${productId}/bidders/award/${bidderId}`,
                null,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(res.data.errorMsg || "낙찰 완료!");
            setAwardedBidderId(bidderId);
            fetchBidders();
        } catch (error) {
            alert("낙찰에 실패했습니다.");
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
