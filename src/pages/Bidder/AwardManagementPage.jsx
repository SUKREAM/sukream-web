import React from "react";
import styled from "styled-components";
import { BidderList } from "../../components/BidderList";
import { AuctionStatusBox } from "../../components/AuctionStatusBox";

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
    return (
        <PageWrapper>
            <Section>
                <AuctionStatusBox />
            </Section>

            {/* 입찰가 리스트 */}
            <Section>
                <BidderList />
            </Section>
        </PageWrapper>
    );
};

export default AwardManagementPage;