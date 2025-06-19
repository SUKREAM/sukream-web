import React from "react";
import styled from "styled-components";
import ReviewItem from "./ReviewItem";

const ListWrapper = styled.div`
  border-top: 1px solid #eee;
`;

const ReviewList = ({ reviews }) => {
  return (
    <ListWrapper>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ListWrapper>
  );
};

export default ReviewList;
