import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PageWrapper = styled.div`
  padding: 16px;
`;

const ItemCard = styled.div`
  background: white;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 8px;
`;

const Status = styled.p`
  color: ${({ status }) => (status === "COMPLETED" ? "green" : "orange")};
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const SellHistoryPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); 

    axios
      .get("http://localhost:8080/api/mypage/sales", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // 응답 데이터가 배열이면 바로 set, 아니면 맞게 변환 필요
        setItems(res.data);
      })
      .catch((err) => {
        console.error("판매내역 조회 실패:", err);
        // 에러 시 빈 배열이나 알림 처리 가능
        setItems([]);
      });
  }, []);

  return (
    <PageWrapper>
      <h2>판매 내역</h2>
      {items.map((item) => (
        <ItemCard key={item.id}>
          <img
            src={`data:image/png;base64,${item.productImage}`}
            alt={item.productName}
            style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
          />
          <p>상품명: {item.productName}</p>
          <p>
            {item.status === "COMPLETED"
              ? `거래확정일: ${item.completedDate}`
              : `판매등록일: ${item.registrationDate}`}
          </p>
          <Status status={item.status}>
            상태: {item.status === "COMPLETED" ? "거래완료" : "판매중"}
          </Status>
          <ButtonGroup>
            {item.status === "IN_PROGRESS" && item.bidRequested && (
              <button onClick={() => navigate(`/mypage/sell/bids/${item.id}`)}>
                입찰요청보기
              </button>
            )}
            {item.status === "COMPLETED" && item.reviewReceived && (
              <button onClick={() => navigate(`/reviews?sellerId=${item.id}`)}>
                받은 후기 보기
              </button>
            )}
          </ButtonGroup>
        </ItemCard>
      ))}
    </PageWrapper>
  );
};

export default SellHistoryPage;
