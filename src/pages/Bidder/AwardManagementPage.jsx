import React from "react";
import styled from "styled-components";
import { BidderList } from "../../components/BidderList";
import { AuctionStatusBox } from "../../components/AuctionStatusBox";
import { AuctionImage } from "../../components/AuctionImage";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const InfoBox = styled.div`
  background: #f4f4f4;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
`;

const Value = styled.div`
  font-size: 18px;
  color: #333;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
`;

const AwardManagementPage = () => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqaXdvb0BnbWFpbC5jb20iLCJuYW1lIjoi7KeA7JqwIiwiaWF0IjoxNzUwMzk4NjY5LCJleHAiOjE3NTA0MDIyNjl9.Ns9wJj-1MbHFM7KKA0znz_dBJOmfIxvxOu95zkqA1ow";
  const productId = 144; // 실제 조회할 상품 ID로 대체

  return (
    <PageWrapper>
      <AuctionImage />
      <AuctionStatusBox />
      <BidderList productId={productId} token={token} />
    </PageWrapper>
  );
};

export default AwardManagementPage;