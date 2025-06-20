import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import defaultImg from "../assets/images/bread.svg";

const SectionTitle = styled.h3`
  margin-top: 24px;
  font-size: 1.2rem;
  color: #555;
  text-align: center;
`;

const ProductList = styled.div`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 12px;
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  height: 200px;
  margin-bottom: 30px;
`;

const ProductItem = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative; // 이거 추가

  &:nth-child(1) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  &:nth-child(2) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  &:nth-child(3) {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }
`;
const ProductLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 5px;
  padding: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  color: #222;
  text-decoration: none;
  width: 75%;
  height: 70px;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 8px;
`;

const ProductTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const EmojiBadge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  font-size: 2.5rem;
`;

const TopProducts = () => {
  const rankEmojis = ["🥇", "🥈", "🥉"];
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/product?sort=popular")
      .then(async (res) => {
        if (res.data.success) {
          const topThree = res.data.data.slice(0, 3);

          const detailedProducts = await Promise.all(
            topThree.map((product) =>
              axios
                .get(`http://localhost:8080/api/product/${product.id}`)
                .then((detailRes) => {
                  if (detailRes.data.success) {
                    return detailRes.data.data;
                  } else {
                    console.error("상세 조회 실패:", detailRes.data.errorMsg);
                    return null;
                  }
                })
                .catch((err) => {
                  console.error("상세 조회 오류:", err);
                  return null;
                })
            )
          );
          setTopProducts(detailedProducts.filter((p) => p));
        } else {
          console.error("인기 상품 조회 실패:", res.data.errorMsg);
        }
      })
      .catch((err) => {
        console.error("Top 상품 목록 조회 중 오류:", err);
      });
  }, []);

  if (topProducts.length === 0) return null;

  return (
    <>
      <SectionTitle>인기 상품 Top 3</SectionTitle>
      <ProductList>
        {topProducts.map((product, idx) => (
          <ProductItem key={product.id}>
            <EmojiBadge>{rankEmojis[idx]}</EmojiBadge>
            <ProductLink to={`/products/${product.id}`}>
              <ProductImage
                src={`data:image/png;base64,${product.image}`}
                alt={product.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImg;
                }}
              />
              <ProductTitle>{product.title}</ProductTitle>
            </ProductLink>
          </ProductItem>
        ))}
      </ProductList>
    </>
  );
};

export default TopProducts;
