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

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  border-radius: 8px;
  object-fit: cover;
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

const BuyHistoryPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("토큰 출력 테스트:ㅣ ", token);

    if (!token) {
      console.warn("토큰이 없습니다. 로그인 필요");
      return;
    }

    axios.get("http://localhost:8080/api/mypage/orders", {
      headers: {
        Authorization :  `Bearer ${token}`,
      },
    })
      .then((res) => {
        // 백엔드 데이터가 아래 형식임을 맞춰서 변환 (status 문자열 "낙찰완료", "낙찰대기" -> "COMPLETED", "IN_PROGRESS")
        const mappedItems = res.data.map(item => ({
          id: item.orderId,
          productName: item.productName,
          productImage: item.productImage,
          purchaseDate: item.orderDate.split("T")[0], // 날짜만 자름 (예: 2025-06-01)
          status: item.status === "낙찰완료" ? "COMPLETED" : "IN_PROGRESS",
          reviewWritten: false, // 리뷰 작성 여부는 API가 없으면 false로 두고, 나중에 연동 가능
        }));
        setItems(mappedItems);
      })
      .catch(err => {
        console.error("구매내역 조회 실패:", err);
      });
  }, []);
  

  return (
    <PageWrapper>
      <h2>구매 내역</h2>
      {items.map((item) => (
        <ItemCard key={item.id}>
          <Image src={item.productImage} alt={item.productName} />
          <p>상품명: {item.productName}</p>
          <p>구매일자: {item.purchaseDate}</p>
          <Status status={item.status}>
            상태: {item.status === "COMPLETED" ? "낙찰완료" : "거래중"}
          </Status>
          <ButtonGroup>
            <button onClick={() => navigate(`/products/${item.id}`)}>
              상세보기
            </button>
            {item.status === "COMPLETED" && !item.reviewWritten && (
              <button onClick={() => navigate(`/reviews/write/${item.id}`, { state: item })}>
                리뷰 작성
              </button>
            )}
          </ButtonGroup>
        </ItemCard>
      ))}
    </PageWrapper>
  );
};

export default BuyHistoryPage;
