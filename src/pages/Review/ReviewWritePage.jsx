import React, { useState } from "react";
import styled from "styled-components";
import ReviewForm from "./components/ReviewForm";
import {useParams} from "react-router-dom";

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
  margin-bottom: 20px;
`;

const SuccessMessage = styled.p`
  font-size: 1.3rem;
  color: #28a745;
  font-weight: 700;
  text-align: center;
  margin-top: 40px;
`;

const ReviewWritePage = () => {
  const { productId } = useParams(); // URL에서 productId 추출

  const [submitted, setSubmitted] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async (data) => {
    try {
      // productId는 실제 서비스에 맞게 수정 필요 (여기서는 임의 숫자라고 가정)
      const payload = {
        productId: Number(productId), // productName 대신 productId로 수정
        rating: Number(data.rating),
        qualityAssesment: data.qualityAssesment,
        content: data.content,
      };

      const response = await fetch("http://localhost:8080/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/hal+json",
          "Authorization": `Bearer ${token}`,  // 이 부분 확인 필요
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "리뷰 등록 실패");
      }

      setSubmitted(true);
    } catch (error) {
      alert(error.message);
    }
  };


  return (
    <Container>
      <Title>리뷰 작성</Title>
      {!submitted ? (
        <ReviewForm onSubmit={handleSubmit} />
      ) : (
        <SuccessMessage>리뷰가 성공적으로 등록되었습니다!</SuccessMessage>
      )}
    </Container>
  );
};

export default ReviewWritePage;
