import styled from "styled-components";
import React, { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 1.1rem;
  color: #333;
`;

const Input = styled.input`
  padding: 12px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 12px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-height: 120px;
  resize: vertical;
`;

const Select = styled.select`
  padding: 12px 14px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  font-weight: 800;
  font-size: 1.2rem;
  padding: 14px 0;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d9363e;
  }
`;

const ReviewForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    rating: 5,
    qualityAssesment: "EXCELLENT",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="rating">평점</Label>
      <Select id="rating" name="rating" value={form.rating} onChange={handleChange}>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}점
          </option>
        ))}
      </Select>

      <Label htmlFor="qualityAssesment">품질 평가</Label>
      <Select
        id="qualityAssesment"
        name="qualityAssesment"
        value={form.qualityAssesment}
        onChange={handleChange}
      >
        <option value="EXCELLENT">우수</option>
        <option value="AVERAGE">보통</option>
        <option value="POOR">나쁨</option>
      </Select>

      <Label htmlFor="content">리뷰 내용</Label>
      <TextArea
        id="content"
        name="content"
        value={form.content}
        onChange={handleChange}
        required
      />

      <SubmitButton type="submit">리뷰 제출</SubmitButton>
    </Form>
  );
};

export default ReviewForm;
