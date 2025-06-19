import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReviewList from "./components/ReviewList";

const Container = styled.div`
  max-width: 480px;
  margin: 40px auto;
  padding: 24px 16px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
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

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
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
            "Authorization": `Bearer ${token}`,  // 이 부분 확인 필요
          },
        });
        if (!response.ok) throw new Error("리뷰 조회 실패");

        const data = await response.json();
        setReviews(data.reviews);
        setAvgRating(data.averageRating);
        setUserName(data.userName || "사용자");
      } catch (error) {
        console.error(error);
      }
    }

    fetchReviews();
  }, []);

  return (
    <Container>
      <Title>{userName}님의 리뷰</Title>
      {reviews.length > 0 ? (
        <>
          <AvgRating>평균 평점: {avgRating.toFixed(1)} / 5</AvgRating>
          <ReviewList reviews={reviews} />
        </>
      ) : (
        <EmptyMessage>리뷰가 없습니다.</EmptyMessage>
      )}
    </Container>
  );
};

export default ReviewPage;
