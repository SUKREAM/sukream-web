import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 16px;
  max-width: 340px;
  margin: 0 auto;
`;

const DetailItem = styled.div`
  width: 90%;
  margin-bottom: 12px;
  padding: 12px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/${id}`)
      .then((response) => {
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          console.error("상품 조회 실패:", response.data.errorMsg);
        }
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
      });
  }, [id]);

  return (
    <PageWrapper>
      <Main>
        <h2>상품 상세</h2>
        {product ? (
          <>
            <DetailItem>
              <strong>ID:</strong> {product.id}
            </DetailItem>
            <DetailItem>
              <strong>판매자 ID:</strong> {product.sellerId}
            </DetailItem>
            <DetailItem>
              <strong>제목:</strong> {product.title}
            </DetailItem>
            <DetailItem>
              <strong>설명:</strong> {product.description}
            </DetailItem>
            <DetailItem>
              <strong>최소 입찰가:</strong> {product.minPrice.toLocaleString()}
              원
            </DetailItem>
            <DetailItem>
              <strong>최대 입찰가:</strong> {product.maxPrice.toLocaleString()}
              원
            </DetailItem>
            <DetailItem>
              <strong>카테고리:</strong> {product.category}
            </DetailItem>
            <DetailItem>
              <strong>입찰 단위:</strong> {product.bidUnit.toLocaleString()}원
            </DetailItem>
            <DetailItem>
              <strong>등록일:</strong>{" "}
              {new Date(product.createdAt).toLocaleString()}
            </DetailItem>
            <DetailItem>
              <strong>수정일:</strong>{" "}
              {new Date(product.updatedAt).toLocaleString()}
            </DetailItem>
            <DetailItem>
              <strong>마감일:</strong>{" "}
              {new Date(product.deadline).toLocaleString()}
            </DetailItem>
            <DetailItem>
              <strong>상태:</strong> {product.status}
            </DetailItem>
            <DetailItem>
              <strong>경매번호:</strong> {product.auctionNum}
            </DetailItem>
            <DetailItem>
              <strong>입찰 수:</strong> {product.bidCount}
            </DetailItem>
            <DetailItem>
              <strong>채팅 링크:</strong>{" "}
              <a href={product.chatLink}>{product.chatLink}</a>
            </DetailItem>
            <DetailItem>
              <strong>이미지:</strong>
              <br />
              {product.image ? (
                <img
                  src={`data:image/png;base64,${product.image}`}
                  alt={product.title}
                  style={{ maxWidth: "100%", borderRadius: "6px" }}
                />
              ) : (
                <span>이미지가 없습니다.</span>
              )}
            </DetailItem>
          </>
        ) : (
          <p>상품 정보를 불러오는 중입니다...</p>
        )}
      </Main>
    </PageWrapper>
  );
};

export default ProductDetailPage;
