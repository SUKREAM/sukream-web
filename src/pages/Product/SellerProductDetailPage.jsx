import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
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

const Input = styled.input`
  width: 100%;
  margin-top: 4px;
  padding: 6px;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-top: 4px;
  padding: 6px;
`;

const Button = styled.button.attrs((props) => ({
  "data-danger": props.danger || undefined,
}))`
  margin-right: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: ${({ danger }) => (danger ? "#dc3545" : "#007bff")};
  color: white;
  cursor: pointer;
`;

const SellerProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minPrice: 0,
    maxPrice: 0,
    bidUnit: 0,
    chatLink: "",
    category: "",
    deadline: "",
    status: "open",
    image: "", // base64
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/product/${id}`)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;

          const statusMap = {
            "진행 중": "open",
            "마감 됨": "closed",
            "낙찰 완료": "awarded",
          };

          setProduct(data);
          setFormData({
            title: data.title,
            description: data.description,
            minPrice: data.minPrice,
            maxPrice: data.maxPrice,
            bidUnit: data.bidUnit,
            chatLink: data.chatLink,
            category: data.category,
            deadline: data.deadline,
            status: statusMap[data.status] || data.status, // 수정!!
            image: data.image || "", // base64 유지
          });
        } else {
          console.error("조회 실패:", res.data.errorMsg);
        }
      })
      .catch((err) => {
        console.error("조회 오류:", err);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setFormData((prev) => ({ ...prev, image: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const handleStatusChange = (e) => {
    setFormData((prev) => ({ ...prev, status: e.target.value }));
  };

  const toLocalDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().slice(0, 16);
  };

  const handleUpdate = async () => {
    localStorage.setItem(
      "accessToken",
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb2plb25nQGdtYWlsLmNvbSIsIm5hbWUiOiLshozsoJUiLCJpYXQiOjE3NTAzOTQxNTgsImV4cCI6MTc1MDM5Nzc1OH0.dObuTzbxLAITkc9rCk2E6gMgR706MvyC-11x52TQpLQ"
    );
    const token = localStorage.getItem("accessToken");

    try {
      const payload = {
        ...formData,
        minPrice: parseInt(formData.minPrice),
        maxPrice: parseInt(formData.maxPrice),
        bidUnit: parseInt(formData.bidUnit),
        deadline: new Date(formData.deadline).toISOString(),
      };

      console.log("📦 PATCH 전송 payload:", payload);

      const res = await axios.patch(
        `http://localhost:8080/api/product/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        alert("수정되었습니다.");
        setIsEditing(false);
        setProduct(res.data.data);
      } else {
        alert("수정 실패: " + res.data.errorMsg);
      }
    } catch (err) {
      console.error("수정 오류:", err);
      alert("오류가 발생했습니다.");
    }
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

  if (!product) return <Main>상품 정보를 불러오는 중입니다...</Main>;

  return (
    <PageWrapper>
      <Main>
        <h2>판매자 전용 상품 상세</h2>

        {isEditing ? (
          <>
            <DetailItem>
              <strong>제목:</strong>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>설명:</strong>
              <TextArea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>최소 입찰가:</strong>
              <Input
                name="minPrice"
                type="number"
                value={formData.minPrice}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>최대 입찰가:</strong>
              <Input
                name="maxPrice"
                type="number"
                value={formData.maxPrice}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>입찰 단위:</strong>
              <Input
                name="bidUnit"
                type="number"
                value={formData.bidUnit}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>카테고리:</strong>
              <Input
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>마감일:</strong>
              <Input
                name="deadline"
                type="datetime-local"
                value={toLocalDateTime(formData.deadline)}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>상태:</strong>
              <select value={formData.status} onChange={handleStatusChange}>
                <option value="open">open</option>
                <option value="closed">closed</option>
                <option value="awarded">awarded</option>
              </select>
            </DetailItem>
            <DetailItem>
              <strong>채팅 링크:</strong>
              <Input
                name="chatLink"
                value={formData.chatLink}
                onChange={handleInputChange}
              />
            </DetailItem>
            <DetailItem>
              <strong>이미지:</strong>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {formData.image && (
                <img
                  src={`data:image/png;base64,${formData.image}`}
                  alt="업로드 미리보기"
                  style={{ marginTop: "8px", maxWidth: "100%" }}
                />
              )}
            </DetailItem>

            <Button onClick={handleUpdate}>수정 완료</Button>
            <Button danger onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </>
        ) : (
          <>
            <DetailItem>
              <strong>제목:</strong> {product.title}
            </DetailItem>
            <DetailItem>
              <strong>설명:</strong> {product.description}
            </DetailItem>
            <DetailItem>
              <strong>최소 입찰가:</strong> {product.minPrice.toLocaleString()}{" "}
              원
            </DetailItem>
            <DetailItem>
              <strong>최대 입찰가:</strong> {product.maxPrice.toLocaleString()}{" "}
              원
            </DetailItem>
            <DetailItem>
              <strong>입찰 단위:</strong> {product.bidUnit.toLocaleString()} 원
            </DetailItem>
            <DetailItem>
              <strong>카테고리:</strong> {product.category}
            </DetailItem>
            <DetailItem>
              <strong>마감일:</strong>{" "}
              {new Date(product.deadline).toLocaleString()}
            </DetailItem>
            <DetailItem>
              <strong>상태:</strong> {product.status}
            </DetailItem>
            <DetailItem>
              <strong>채팅 링크:</strong>{" "}
              <a href={product.chatLink} target="_blank" rel="noreferrer">
                {product.chatLink}
              </a>
            </DetailItem>
            <DetailItem>
              <strong>이미지:</strong>
              <br />
              {product.image ? (
                <img
                  src={`data:image/png;base64,${product.image}`}
                  alt="상품 이미지"
                  style={{ maxWidth: "100%", borderRadius: "6px" }}
                />
              ) : (
                <span>이미지가 없습니다.</span>
              )}
            </DetailItem>

            <Button onClick={() => setIsEditing(true)}>수정</Button>
            <Button danger onClick={handleDelete}>
              삭제
            </Button>
          </>
        )}
      </Main>
    </PageWrapper>
  );
};

export default SellerProductDetailPage;
