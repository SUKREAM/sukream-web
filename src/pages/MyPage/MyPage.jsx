import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const PageWrapper = styled.div`
  min-height: 100vh;  
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
      <MenuItem onClick={() => navigate("/products/add")}>상품 등록하기</MenuItem>
        <MenuItem onClick={() => navigate("/mypage/buy")}>구매 내역 확인</MenuItem>
        <MenuItem onClick={() => navigate("/mypage/sell")}>판매 내역 확인</MenuItem>
        <MenuItem onClick={() => navigate("/reviews")}>받은 후기 보기</MenuItem>
        <MenuItem onClick={() => navigate("/mypage/update")}>회원정보 수정</MenuItem>
      </MenuList>
    </PageWrapper>
  );
};

export default MyPage;
