import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bidPrice, setBidPrice] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  // 남은 시간 계산 로직
  const calculateTimeLeft = (deadline, status) => {
    if (status === "낙찰 완료" || status === "마감 됨") {
      return "0시간 0분 0초";
    }
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;

    if (diff <= 0) return "종료되었습니다.";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${hours}시간 ${minutes}분 ${seconds}초`;
  };

  useEffect(() => {
    let timer;
    if (product?.deadline) {
      setTimeLeft(calculateTimeLeft(product.deadline, product.status));
      timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(product.deadline, product.status));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [product]);

  useEffect(() => {
    axiosInstance
      .get(`http://localhost:8080/api/product/${id}`)
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.data);
          setBidPrice(res.data.data.currentHighestPrice);
        } else {
          console.error("상품 조회 실패:", res.data.errorMsg);
        }
      })
      .catch((err) => {
        console.error("요청 중 오류 발생:", err);
      });
  }, [id]);

  const handleBidChange = (amount) => {
    const minBid = product.currentHighestPrice + product.bidUnit;
    const newBid = parseInt(bidPrice || 0) + amount;

    if (newBid >= minBid) {
      setBidPrice(newBid);
    }
  };

  if (!product) {
    return (
      <p style={{ textAlign: "center", marginTop: 50 }}>
        상품 정보를 불러오는 중입니다...
      </p>
    );
  }

  // 입찰하기
  const handleBidSubmit = () => {
    const token = localStorage.getItem("jwt");

    // 임시. 일단은 "익명"으로 저장되게
    // 백에서 유저 로그인 한 name받아와서 넣는 거로 수정하셈
    const nickname = "익명";

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    const data = {
      price: bidPrice,
      nickname: nickname,
    };

    axiosInstance
      .post(`http://localhost:8080/api/products/${id}/bidders`, data)
      .then((res) => {
        if (res.data.success) {
          alert("입찰이 완료되었습니다.");

          setProduct((prev) => ({
            ...prev,
            currentHighestPrice: bidPrice,
            bidCount: prev.bidCount + 1,
          }));
        } else {
          alert("입찰 실패: " + res.data.errorMsg);
        }
      })
      .catch((err) => {
        console.error("입찰 오류:", err);
        alert("입찰 중 오류가 발생했습니다.");
      });
  };

  return (
    <PageWrapper>
      <Main>
        <TitleRow>
          <Title>{product.title}</Title>
          <Subtitle>
            등록일자 {new Date(product.createdAt).toLocaleDateString()}
          </Subtitle>
        </TitleRow>

        <ImageWrapper>
          {product.image ? (
            <img
              src={`data:image/png;base64,${product.image}`}
              alt={product.title}
            />
          ) : (
            "이미지가 없습니다."
          )}
        </ImageWrapper>

        <PriceWrapper>
          <span className="label">현재 최고가</span>
          <span className="price">
            {product.currentHighestPrice.toLocaleString()}원
          </span>
        </PriceWrapper>

        <Seller>판매자 {product.sellerName}</Seller>

        <Description>{product.description}</Description>

        <OpenLink>오픈채팅방 링크: {product.chatLink} </OpenLink>

        <InfoRow>
          <strong>남은 시간</strong>
          <span>{timeLeft}</span>
        </InfoRow>

        <InfoRow>
          <strong>마감 일시</strong>
          <span>{new Date(product.deadline).toLocaleString()}</span>
        </InfoRow>

        <InfoRow>
          <strong>경매 상태</strong>
          <span>{product.status}</span>
        </InfoRow>

        <InfoRow>
          <strong>경매 번호</strong>
          <span>{product.auctionNum}</span>
        </InfoRow>

        <InfoRow>
          <strong>입찰 단위</strong>
          <span>{product.bidUnit.toLocaleString()}원</span>
        </InfoRow>

        <InfoRow>
          <strong>입찰 수</strong>
          <span>{product.bidCount}</span>
        </InfoRow>

        <BidInputContainer>
          <button
            className="arrow"
            onClick={() => handleBidChange(-product.bidUnit)}
          >
            -
          </button>
          <input type="number" value={bidPrice} readOnly />
          <button
            className="arrow"
            onClick={() => handleBidChange(product.bidUnit)}
          >
            +
          </button>
          <button className="submit" onClick={() => handleBidSubmit()}>
            입찰하기
          </button>
        </BidInputContainer>

        <Link
          to={`/sellers/${product.sellerId}/reviews`}
          style={{ width: "100%", textDecoration: "none" }}
        >
          <SecondaryButton>판매자 후기 보기</SecondaryButton>
        </Link>
      </Main>
    </PageWrapper>
  );
};

export default ProductDetailPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
  font-family: "Noto Sans KR", sans-serif;
  color: #333;
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  margin: 0 auto;
`;
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.4rem;
`;

const Subtitle = styled.div`
  font-size: 0.8rem;
  color: #999;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 260px;
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  padding: 10px 0;

  span.label {
    color: #666;
    font-size: 0.85rem;
    margin-right: 6px;
  }

  span.price {
    font-weight: 700;
    font-size: 1.5rem;
    color: #ee4d2d;
  }
`;

const Seller = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
  padding-bottom: 8px;
  text-align: right;
`;

const Description = styled.div`
  font-size: 1rem;
  line-height: 1.4;
  color: #777;
  margin-bottom: 24px;
  white-space: pre-wrap;
  text-align: center;

  height: 70px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  display: flex;
  align-items: center;
  overflow-y: auto;
`;

const OpenLink = styled.div`
  width: 90%;
  border-radius: 18px;
  border: 1px solid #ddd;
  padding: 5px 16px;
  font-size: 0.8rem;
  margin: auto;
  margin-bottom: 30px;
  color: #9a9a9a;
  background-color: #f8f8f8;
  word-break: break-all;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;

  strong {
    font-weight: 600;
    color: #555;
    width: 100px;
    font-size: 0.9rem;
  }

  span {
    color: #777;
    font-size: 0.9rem;
    text-align: right;
  }
`;

const BidInputContainer = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  button.arrow {
    width: 36px;
    height: 36px;
    font-size: 1.2rem;
    font-weight: bold;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 6px;

    &:hover {
      background-color: #f2f2f2;
    }
  }

  input {
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 140px;
    padding: 8px 10px;
    font-size: 1rem;
    text-align: right;
  }

  button.submit {
    background-color: #f76059;
    border: none;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    border-radius: 5px;
    padding: 10px 20px;
    margin-left: 12px;
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
      background-color: #e93b32;
    }
  }
`;

const SecondaryButton = styled.button`
  background-color: #eee;
  border: none;
  color: #666;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 5px;
  padding: 15px 0;
  margin-top: 16px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;
