import React, { useState } from "react"; 
import { useParams } from "react-router-dom"; 
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
  const { productId } = useParams();
  const token = localStorage.getItem("jwt");
  const [image, setImage] = useState(null);

  const handleProductInfoLoaded = (info) => {
    setImage(info.image);
  };

  if (!token || !productId) {
    return <p>잘못된 접근입니다.</p>;
  }

  return (
    <PageWrapper>
      <AuctionImage image={image} />
      <AuctionStatusBox
        productId={productId}
        token={token}
        onProductInfoLoaded={handleProductInfoLoaded}
      />
      <BidderList productId={productId} token={token} />
    </PageWrapper>
  );
};

export default AwardManagementPage;