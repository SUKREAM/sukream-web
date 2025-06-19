import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 32px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1rem;
  color: #444;
`;

const Input = styled.input`
  padding: 12px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.5px solid #ccc;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.4);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.5px solid #ccc;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.4);
  }
`;

const Select = styled.select`
  padding: 12px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.5px solid #ccc;
  background-color: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.4);
  }
`;

const Button = styled.button`
  margin-top: 16px;
  padding: 14px 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(90deg, #007bff 0%, #0056b3 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4);
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #0056b3 0%, #003f7f 100%);
  }
`;

const FileInput = styled.input`
  cursor: pointer;
`;

const categories = ["패션", "전자기기", "도서", "기타"];

const ProductAddPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    minPrice: "",
    maxPrice: "",
    category: categories[0],
    bidUnit: "",
    deadline: "",
    image: "",
    chatLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        minPrice: parseInt(form.minPrice),
        maxPrice: parseInt(form.maxPrice),
        bidUnit: parseInt(form.bidUnit),
        deadline: new Date(form.deadline).toISOString(),
      };

      // 임시- 나중에 로그인 할 때 토큰 저장하는 거로 수정~~
      localStorage.setItem(
        "accessToken",
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb2plb25nQGdtYWlsLmNvbSIsIm5hbWUiOiLshozsoJUiLCJpYXQiOjE3NTAzMTQ3NTMsImV4cCI6MTc1MDMxODM1M30.c5-NoVGr-5IW_IEQ7aMoR6gGszjAynOVAVR9LwmCKaI"
      );
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        "http://localhost:8080/api/product",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("상품이 성공적으로 등록되었습니다.");
        // 폼 초기화 또는 페이지 이동 등 처리
      } else {
        alert("등록 실패: " + res.data.errorMsg);
      }
    } catch (error) {
      console.error(error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <PageWrapper>
      <Title>상품 등록</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="상품 제목"
          required
        />

        <Label htmlFor="description">설명</Label>
        <TextArea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="상품 설명"
          required
        />

        <Label htmlFor="minPrice">최소 입찰가</Label>
        <Input
          id="minPrice"
          name="minPrice"
          type="number"
          value={form.minPrice}
          onChange={handleChange}
          required
        />

        <Label htmlFor="maxPrice">최대 입찰가</Label>
        <Input
          id="maxPrice"
          name="maxPrice"
          type="number"
          value={form.maxPrice}
          onChange={handleChange}
          required
        />

        <Label htmlFor="category">카테고리</Label>
        <Select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>

        <Label htmlFor="bidUnit">입찰 단위</Label>
        <Input
          id="bidUnit"
          name="bidUnit"
          type="number"
          value={form.bidUnit}
          onChange={handleChange}
          required
        />

        <Label htmlFor="deadline">마감일</Label>
        <Input
          id="deadline"
          name="deadline"
          type="datetime-local"
          value={form.deadline}
          onChange={handleChange}
          required
        />

        <Label htmlFor="image">상품 이미지</Label>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <Label htmlFor="chatLink">오픈채팅 링크</Label>
        <Input
          id="chatLink"
          name="chatLink"
          type="url"
          value={form.chatLink}
          onChange={handleChange}
          placeholder="오픈채팅 링크 URL"
        />

        <Button type="submit">상품 등록</Button>
      </Form>
    </PageWrapper>
  );
};

export default ProductAddPage;
