import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  padding: 20px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  background: white;
  margin-bottom: 12px;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #ffe6e6;
  }
`;

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <h2>마이페이지</h2>
      <MenuList>
        <MenuItem onClick={() => navigate("/mypage/buy")}>구매 내역 확인</MenuItem>
        <MenuItem onClick={() => navigate("/mypage/sell")}>판매 내역 확인</MenuItem>
        <MenuItem onClick={() => navigate("/reviews")}>내 후기 리뷰 보기</MenuItem>
        <MenuItem onClick={() => alert("로그아웃 처리할 예정")}>로그아웃</MenuItem>
      </MenuList>
    </PageWrapper>
  );
};

export default MyPage;
