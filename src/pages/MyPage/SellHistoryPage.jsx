import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
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
  padding: 2px 8px;             // 패딩 줄이기
  border-radius: 12px;         // 둥글게는 유지
  color: white;
  font-weight: 600;            // 굵기 살짝 줄임
  font-size: 0.75rem;          // 텍스트 크기 줄이기
  background-color: ${({ status }) =>
    status === "AWARDED" ? "#28a745" :
      status === "OPEN" ? "#1976d2" :
        "#9e9e9e"};
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
  flex-wrap: nowrap;
  gap: 8px;
`;

const ButtonBase = styled.button`
  padding: 6px 10px;           // 버튼을 작게
  min-width: auto;             // 너비 자동 조절
  max-width: 130px;            // 너무 넓어지지 않게 제한
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.8rem;           // 글씨도 약간 줄임
  cursor: pointer;
  color: white;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  text-align: center;
  flex-shrink: 0;              // 줄어들지 않게 고정
`;



const ActionButton = styled(ButtonBase)`
  background-color: #F76059;

  &:hover {
    background-color: #e05049;
  }
`;

const LinkButton = styled(ButtonBase).attrs({ as: Link })`
  background-color: #F76059;
  text-decoration: none;

  &:hover {
    background-color: #e05049;
  }
`;



const groupItemsByDate = (items) => {
  return items.reduce((groups, item) => {
    const dateKey = item.createdAt ? item.createdAt.slice(0, 10) : "Unknown";
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

const getStatusText = (status) => {
  switch (status) {
    case "AWARDED":
      return "거래완료";
    case "OPEN":
      return "판매중";
    case "CLOSED":
      return "판매중지";
    default:
      return "알 수 없음";
  }
};

const SellHistoryPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    axios
      .get("http://localhost:8080/api/mypage/sales", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.error("판매내역 조회 실패:", err);
        setItems([]);
      });
  }, []);

  const groupedItems = groupItemsByDate(items);
  const sortedDates = Object.keys(groupedItems).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <PageWrapper>
      <h2>나의 판매 내역</h2>
      {sortedDates.map((date) => (
        <DateGroup key={date}>
          <DateTitle>{date}</DateTitle>
          {groupedItems[date].map((item) => (
            <ItemCard
              key={item.productId}
              onClick={() => {
                if (item.status === "OPEN") {
                  navigate(`/award-management/${item.productId}`);
                }
              }}
              style={{ cursor: item.status === "OPEN" ? "pointer" : "default" }}
            >
              <ItemImage
                src={
                  item.productImage
                    ? `data:image/png;base64,${item.productImage}`
                    : "/default.png"
                }
                alt={item.productName}
                onClick={(e) => {
                  e.stopPropagation(); // 카드 클릭 중첩 방지
                  if (item.status === "OPEN") {
                    navigate(`/award-management/${item.productId}`);
                  }
                }}
                style={{ cursor: item.status === "OPEN" ? "pointer" : "default" }}
              />
              <InfoSection>
                <StatusRow>
                  <StatusBadge status={item.status}>
                    {getStatusText(item.status)}
                  </StatusBadge>
                  <DaysAgo>{calculateDaysAgo(date)}일전</DaysAgo>
                </StatusRow>
                <ProductName>{item.productName}</ProductName>
                <ButtonGroup>
                  {item.status === "OPEN" && (
                    <ActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/award-management/${item.productId}`);
                      }}
                    >
                      입찰 요청 보기
                    </ActionButton>
                  )}
                  {item.status === "AWARDED" && (
                    <ActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/reviews?productId=${item.productId}`);
                      }}
                    >
                      받은 후기 보기
                    </ActionButton>
                  )}
                  <LinkButton
                    to={`/products/seller/${item.productId}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    상품 판매 관리
                  </LinkButton>
                </ButtonGroup>
              </InfoSection>
            </ItemCard>
          ))}

        </DateGroup>
      ))}
    </PageWrapper>
  );
};

export default SellHistoryPage;