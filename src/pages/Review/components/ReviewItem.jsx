import React from "react";
import styled from "styled-components";

const ItemWrapper = styled.div`
  padding: 16px 12px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const ProductName = styled.h3`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 6px;
  color: #333;
`;

const Rating = styled.span`
  background: #ff4d4f;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  margin-right: 12px;
`;

const Quality = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: #666;
`;

const Content = styled.p`
  margin-top: 8px;
  font-size: 1rem;
  color: #444;
  line-height: 1.3;
`;

// 품질평가 한글 변환 함수 (선택사항)
const qualityMap = {
  EXCELLENT: "훌륭해요",
  AVERAGE: "보통이에요",
  POOR: "생각보다 별로예요",
};

const ReviewItem = ({ review }) => {
  return (
    <ItemWrapper>
      <ProductName>{review.productName || `상품ID: ${review.productId}`}</ProductName>
      <div>
        <Rating>{review.rating}점</Rating>
        <Quality>{qualityMap[review.qualityAssesment]}</Quality>
      </div>
      <Content>{review.content}</Content>
    </ItemWrapper>
  );
};

export default ReviewItem;
