import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PageWrapper = styled.div`
  padding: 20px;
  min-height: 100vh;
`;

const DateGroup = styled.div`
  margin-bottom: 32px;
`;

const DateTitle = styled.h3`
  margin-bottom: 16px;
  color: #444;
  font-weight: 700;
  border-bottom: 2px solid #ccc;
  padding-bottom: 6px;
`;

const ItemCard = styled.div`
  background: white;
  margin-bottom: 12px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 20px;
  flex-shrink: 0;
  background: #eee;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 16px;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  background-color: ${({ status }) =>
    status === "낙찰완료" ? "#28a745" : "#f39c12"};
`;

const DaysAgo = styled.span`
  color: #666;
  font-size: 0.85rem;
`;

const ProductName = styled.p`
  font-weight: 600;
  margin-bottom: 6px;
  color: #222;
`;

const ButtonGroup = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ActionButton = styled.button`
  background-color: #1976d2;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0f4a8c;
  }
`;

const DisabledButton = styled.div`
  background-color: #bbb;
  padding: 10px 14px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  display: inline-block;
`;

const groupItemsByDate = (items) => {
  return items.reduce((groups, item) => {
    const dateKey = item.orderDate?.slice(0, 10) || "Unknown";
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(item);
    return groups;
  }, {});
};

const calculateDaysAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

const BuyHistoryPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.warn("토큰 없음");
      return;
    }

    axios
      .get("http://localhost:8080/api/mypage/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const mappedItems = res.data.map((item) => ({
          id: item.orderId,
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage
            ? `data:image/png;base64,${item.productImage}`
            : null,
          orderDate: item.orderDate,
          status: item.status,
          reviewWritten: item.reviewWritten,
        }));
        setItems(mappedItems);
      })
      .catch((err) => {
        console.error("구매내역 조회 실패:", err);
        setItems([]);
      });
  }, []);

  const groupedItems = groupItemsByDate(items);
  const sortedDates = Object.keys(groupedItems).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <PageWrapper>
      <h2>나의 주문 내역</h2>
      {sortedDates.map((date) => (
        <DateGroup key={date}>
          <DateTitle>{date}</DateTitle>
          {groupedItems[date].map((item) => (
            <ItemCard key={item.id}>
              <ItemImage
                src={item.productImage || "/default.png"}
                alt={item.productName}
              />
              <InfoSection>
                <StatusRow>
                  <StatusBadge status={item.status}>{item.status}</StatusBadge>
                  <DaysAgo>{calculateDaysAgo(item.orderDate)}일 전</DaysAgo>
                </StatusRow>
                <ProductName>{item.productName}</ProductName>
                <p>
                  {item.status === "낙찰완료" ? "낙찰일자" : "입찰일자"}:{" "}
                  {item.orderDate.slice(0, 10)}
                </p>
                <ButtonGroup>
                  <ActionButton
                    onClick={() =>
                      navigate(`/products/${item.productId}`)
                    }
                  >
                    상세보기
                  </ActionButton>
                  {item.status === "낙찰완료" &&
                    (item.reviewWritten ? (
                      <DisabledButton>리뷰 작성 완료</DisabledButton>
                    ) : (
                      <ActionButton
                        onClick={() =>
                          navigate(`/reviews/write/${item.id}`, {
                            state: item,
                          })
                        }
                      >
                        리뷰 작성
                      </ActionButton>
                    ))}
                </ButtonGroup>
              </InfoSection>
            </ItemCard>
          ))}
        </DateGroup>
      ))}
    </PageWrapper>
  );
};

export default BuyHistoryPage;
