import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ReviewList from "./components/ReviewList";

const Container = styled.div`
  max-width: 350px;
  margin: 20px auto;
  padding: 16px 12px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 16px;
`;

const StatsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  font-size: 1.4rem;
  font-weight: 700;
  color: #ff4d4f;
  margin-bottom: 24px;
`;

const StatItem = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #555;
`;

const SellerReviewPage = () => {
  const { userId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchSellerReviews() {
      try {
        const res = await fetch(`http://localhost:8080/reviews/users/${userId}/reviews`, {
          headers: {
            Accept: "application/hal+json",
          },
        });
        if (!res.ok) throw new Error("리뷰 조회 실패");
        const data = await res.json();
        setReviews(data.reviews);
        setAvgRating(data.averageRating);
        setReviewCount(data.reviewCount);
        setUserName(data.userName || "판매자");
      } catch (err) {
        console.error(err);
      }
    }

    fetchSellerReviews();
  }, [userId]);

  return (
    <Container>
      <Title>{userName}님의 리뷰</Title>
      <StatsWrapper>
        <StatItem>평균 평점: <span style={{ color: "#ff4d4f" }}>{avgRating.toFixed(1)} / 5</span></StatItem>
        <StatItem>거래내역: <span style={{ color: "#ff4d4f" }}>{reviewCount}개</span></StatItem>
      </StatsWrapper>
      <ReviewList reviews={reviews} />
    </Container>
  );
};

export default SellerReviewPage;
