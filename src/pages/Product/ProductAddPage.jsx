import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";

const categories = [
  "전체",
  "보스턴백",
  "토트백",
  "웨이스트백",
  "숄더백",
  "크로스백",
  "에코,캔버스백",
  "백팩",
];

const ProductAddPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    minPrice: 1000,
    maxPrice: 1000,
    category: categories[0],
    bidUnit: 1000,
    deadline: "",
    image: "", // base64
    chatLink: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setForm((prev) => ({ ...prev, image: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => setForm((prev) => ({ ...prev, image: "" }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const min = parseInt(form.minPrice);
    const max = parseInt(form.maxPrice);
    const bidUnit = parseInt(form.bidUnit);

    if (isNaN(min) || isNaN(max) || isNaN(bidUnit)) {
      alert("입찰 금액이나 단위는 숫자여야 합니다.");
      return;
    }

    if (max <= min) {
      alert("최대금액은 최소금액보다 커야 합니다.");
      return;
    }

    try {
      const payload = {
        ...form,
        minPrice: parseInt(form.minPrice),
        maxPrice: parseInt(form.maxPrice),
        bidUnit: parseInt(form.bidUnit),
        deadline: new Date(form.deadline).toISOString(),
      };

      const res = await axiosInstance.post(
        "http://localhost:8080/api/product",
        payload
      );

      if (res.data.success) {
        alert("상품이 성공적으로 등록되었습니다.");
        navigate("/main");
      } else {
        alert("등록 실패: " + res.data.errorMsg);
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      <Title>상품 등록하기</Title>

      {/* 이미지 업로드 (1장 제한) */}
      <ImageBox htmlFor="image">
        {form.image ? (
          <>
            <img src={`data:image/*;base64,${form.image}`} alt="preview" />
            <RemoveBtn type="button" onClick={removeImage}>
              ×
            </RemoveBtn>
          </>
        ) : (
          <span style={{ fontSize: "2rem", color: "#888" }}>📷</span>
        )}
      </ImageBox>
      <HiddenFileInput
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <Form onSubmit={handleSubmit}>
        <Row>
          <label>제목</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="글 제목"
            required
          />
        </Row>

        <Row>
          <label>마감일시</label>
          <input
            type="datetime-local"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            required
          />
        </Row>

        <Row>
          <label>입찰단위</label>
          <input
            type="number"
            name="bidUnit"
            value={form.bidUnit}
            onChange={handleChange}
            step="10"
            placeholder="1,000원"
            required
          />
        </Row>

        <Row>
          <label>최소금액</label>
          <input
            type="number"
            name="minPrice"
            value={form.minPrice}
            onChange={handleChange}
            step="10"
            placeholder="1,000원"
            required
          />
        </Row>
        <Row>
          <label>최대금액</label>
          <input
            type="number"
            name="maxPrice"
            value={form.maxPrice}
            onChange={handleChange}
            step="10"
            placeholder="예: 10,000원"
            required
          />
        </Row>
        <Row>
          <label>채팅링크</label>
          <input
            type="url"
            name="chatLink"
            value={form.chatLink}
            onChange={handleChange}
            placeholder="오픈채팅 URL"
          />
        </Row>

        <Row>
          <label>카테고리</label>
          <select name="category" value={form.category} onChange={handleChange}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Row>

        <Row style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <label style={{ marginBottom: "6px" }}>자세한 설명</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="상품 상세 설명을 등록해주세요"
            required
          />
        </Row>

        <SubmitBtn type="submit">상품 등록하기</SubmitBtn>
      </Form>
    </PageWrapper>
  );
};

export default ProductAddPage;

const PageWrapper = styled.div`
  padding: 20px 16px;
  background: #fff;
  min-height: 100vh;
  font-family: "Noto Sans KR", sans-serif;
  color: #333;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #666;
`;

const ImageBox = styled.label`
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border: none;
  background: #000;
  color: #fff;
  border-radius: 50%;
  font-size: 0.7rem;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;

  label {
    width: 80px;
    color: #666;
  }

  input,
  select,
  textarea {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 0.9rem;
    color: #999;
    padding: 4px 0;
    border-bottom: 1px solid #ddd;
  }

  textarea {
    width: 95%;
    resize: vertical;
    min-height: 90px;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 8px;
    margin-top: 6px;
    margin: auto;
    resize: none;
  }
`;

const SubmitBtn = styled.button`
  margin-top: 40px;
  width: 100%;
  padding: 14px 0;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background: #ff6969;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
