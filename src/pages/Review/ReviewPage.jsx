import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReviewList from "./components/ReviewList";

const PageWrapper = styled.div`
  min-height: 100vh;
  padding-bottom: 50px; 
`;

const Container = styled.div`
  max-width: 350px;
  margin: 20px auto;
  padding: 16px 12px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #222;
  text-align: center;
  margin-bottom: 16px;
`;

const AvgRating = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  color: #ff4d4f;
  text-align: center;
  margin-bottom: 24px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #888;
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
  color: #555;
  font-weight: 600;
  font-size: 1.2rem;
`;



const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("accessToken");


    async function fetchReviews() {
      try {
        if (!token) throw new Error("로그인이 필요합니다.");
        const response = await fetch("http://localhost:8080/reviews/me/received", {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/hal+json",
            "Authorization": `Bearer ${token}`, 
          },
        });
        if (!response.ok) throw new Error("리뷰 조회 실패");

        const data = await response.json();
        setReviews(data.reviews);
        setAvgRating(data.averageRating);
        setReviewCount(data.reviewCount); 
        setUserName(data.userName || "사용자");
      } catch (error) {
        console.error(error);
      }
    }

    fetchReviews();
  }, []);

  return (
    <PageWrapper>
    <Container>
      <Title>{userName}님의 리뷰</Title>
      {reviews.length > 0 ? (
       <>
        <StatsWrapper>
           <StatItem>평균 평점: <span style={{color: "#ff4d4f"}}>{avgRating.toFixed(1)} / 5</span></StatItem>
          <StatItem>거래내역: <span style={{color: "#ff4d4f"}}>{reviewCount}개</span></StatItem>
        </StatsWrapper>
        <ReviewList reviews={reviews} />
     </>
      ) : (
        <EmptyMessage>리뷰가 없습니다.</EmptyMessage>
      )}
    </Container>
    </PageWrapper>
  );
};

export default ReviewPage;
