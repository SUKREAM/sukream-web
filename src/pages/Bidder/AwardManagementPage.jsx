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
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqaXdvb0BnbWFpbC5jb20iLCJuYW1lIjoi7KeA7JqwIiwiaWF0IjoxNzUwNDAyNDQ5LCJleHAiOjE3NTA0MDYwNDl9.FUezmdu4s7W_WHJoHMcOF0eFKFEN5eFa1L5fep0_wqg";
  const productId = 144; // 실제 조회할 상품 ID로 대체

  return (
    <PageWrapper>
      <AuctionImage />
      <AuctionStatusBox productId={productId} token={token} />
      <BidderList productId={productId} token={token} />
    </PageWrapper>
  );
};

export default AwardManagementPage;