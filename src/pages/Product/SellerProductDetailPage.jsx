import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const statusMap = {
  open: "진행 중",
  closed: "종료 됨",
  awarded: "낙찰 완료",
};

const reverseStatusMap = {
  "진행 중": "open",
  "종료 됨": "closed",
  "낙찰 완료": "awarded",
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
  font-family: "Noto Sans KR", sans-serif;
  color: #333;
`;

const Main = styled.div`
  flex: 1;
  padding: 2px 16px;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleInput = styled.input`
  font-weight: 700;
  font-size: 1.4rem;
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 8px;
`;

const Subtitle = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 10px;
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

const Seller = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
  text-align: right;
`;

const Textarea = styled.textarea`
  width: 95%;
  min-height: 60px;
  font-size: 1rem;
  color: #666;
  margin-bottom: 16px;
  resize: none;
`;

const Input = styled.input`
  width: 90%;
  font-size: 1rem;
  padding: 6px 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 90%;
  font-size: 1rem;
  padding: 6px 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  strong {
    font-weight: 600;
    color: #555;
  }
  span {
    text-align: right;
  }
`;

const ButtonRow = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: #f76059;
  border: none;
  color: white;
  font-weight: 400;
  font-size: 0.95rem;
  border-radius: 5px;
  padding: 12px 0;
  width: 110px;
  cursor: pointer;
`;

const categories = [
  "전체",
  "패션",
  "보스턴백",
  "토트백",
  "웨이스트백",
  "숄더백",
  "크로스백",
  "에코,캔버스백",
];

const SellerProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    bidUnit: "",
    deadline: "",
    chatLink: "",
    status: "",
    image: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/${id}`)
      .then((res) => {
        if (res.data.success) {
          const p = res.data.data;
          setProduct(p);
          setFormData({
            title: p.title,
            description: p.description,
            minPrice: p.minPrice,
            maxPrice: p.maxPrice,
            category: p.category,
            bidUnit: p.bidUnit,
            deadline: p.deadline.slice(0, 16),
            chatLink: p.chatLink,
            status: statusMap[p.status],
            image: null,
          });
        } else {
          console.error("상품 조회 실패:", res.data.errorMsg);
        }
      })
      .catch((err) => {
        console.error("API 요청 중 오류 발생:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSave = () => {
    const token = localStorage.getItem("jwt");
    const updatedData = {
      ...formData,
      status: reverseStatusMap[formData.status],
    };

    const reader = new FileReader();
    if (formData.image) {
      reader.onloadend = () => {
        updatedData.image = reader.result.split(",")[1];
        patchProduct(updatedData, token);
      };
      reader.readAsDataURL(formData.image);
    } else {
      updatedData.image = product.image;
      patchProduct(updatedData, token);
    }
  };

  const patchProduct = (data, token) => {
    axios
      .patch(`http://localhost:8080/api/product/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          alert("수정되었습니다.");
          navigate("/products");
        } else {
          alert("수정 실패: " + res.data.errorMsg);
        }
      })
      .catch((err) => {
        console.error("수정 오류:", err);
        alert("오류가 발생했습니다.");
      });
  };

  const handleDelete = () => {
    const token = localStorage.getItem("accessToken");
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:8080/api/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.success) {
            alert("삭제되었습니다.");
            navigate("/products");
          } else {
            alert("삭제 실패: " + res.data.errorMsg);
          }
        })
        .catch((err) => {
          console.error("삭제 오류:", err);
          alert("오류가 발생했습니다.");
        });
    }
  };

  if (!product) {
    return (
      <p style={{ textAlign: "center", marginTop: 50 }}>
        상품 정보를 불러오는 중입니다...
      </p>
    );
  }

  return (
    <PageWrapper>
      <Main>
        <TitleInput
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <Subtitle>
          등록일자 {new Date(product.createdAt).toLocaleDateString()}
        </Subtitle>

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

        <Input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        <Seller>판매자 {product.sellerName}</Seller>

        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <Input
          name="chatLink"
          value={formData.chatLink}
          onChange={handleChange}
        />

        <InfoRow>
          <strong>경매 번호</strong>
          <span>{product.auctionNum}</span>
        </InfoRow>

        <InfoRow>
          <strong>입찰 수</strong>
          <span>{product.bidCount}</span>
        </InfoRow>

        <Select name="status" value={formData.status} onChange={handleChange}>
          <option value="진행 중">진행 중</option>
          <option value="종료 됨">종료 됨</option>
          <option value="낙찰 완료">낙찰 완료</option>
        </Select>
        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
        <Input
          name="minPrice"
          type="number"
          value={formData.minPrice}
          onChange={handleChange}
        />
        <Input
          name="maxPrice"
          type="number"
          value={formData.maxPrice}
          onChange={handleChange}
        />
        <Input
          name="bidUnit"
          type="number"
          value={formData.bidUnit}
          onChange={handleChange}
        />
        <Input
          name="deadline"
          type="datetime-local"
          value={formData.deadline}
          onChange={handleChange}
        />

        <ButtonRow>
          <ActionButton onClick={handleSave}>상품 수정하기</ActionButton>
          <ActionButton onClick={handleDelete}>상품 삭제하기</ActionButton>
          <ActionButton onClick={() => navigate(`/award-management`)}>
            입찰자 조회
          </ActionButton>
        </ButtonRow>
      </Main>
    </PageWrapper>
  );
};

export default SellerProductDetailPage;
