import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";

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

const SellerProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageInputRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
    axiosInstance
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
            status: statusMap[p.status] ?? "진행 중",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSave = () => {
    const deadlineDate = new Date(formData.deadline);
    const createdAtDate = new Date(product.createdAt);

    if (deadlineDate <= createdAtDate) {
      alert("마감 기한은 등록일보다 이후여야 합니다.");
      return;
    }

    const updatedData = {
      ...formData,
      status: reverseStatusMap[formData.status],
      deadline: new Date(formData.deadline).toISOString(),
    };

    if (formData.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedData.image = reader.result.split(",")[1];
        patchProduct(updatedData);
      };
      reader.readAsDataURL(formData.image);
    } else {
      updatedData.image = product.image;
      patchProduct(updatedData);
    }
  };

  const patchProduct = (data) => {
    console.log("전송 데이터:", data);
    axiosInstance
      .patch(`http://localhost:8080/api/product/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          alert("수정되었습니다.");
          navigate(-1);
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
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axiosInstance
        .delete(`http://localhost:8080/api/product/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert("삭제되었습니다.");
            navigate(-1);
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
        <Subtitle>
          등록일자 {new Date(product.createdAt).toLocaleDateString()}
        </Subtitle>
        <Seller>판매자 {product.sellerName}</Seller>
        <TitleInput
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <ImageWrapper onClick={handleImageClick} style={{ cursor: "pointer" }}>
          {imagePreview ? (
            <img src={imagePreview} alt="미리보기" />
          ) : product.image ? (
            <img
              src={`data:image/png;base64,${product.image}`}
              alt={product.title}
            />
          ) : (
            "이미지가 없습니다."
          )}
          <OverlayText className="overlay">
            수정하려면 여기를 클릭하세요
          </OverlayText>
        </ImageWrapper>

        <input
          ref={imageInputRef}
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <Textarea
          name="description"
          value={formData.description}
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
        <InfoRow>
          <strong>채팅 링크</strong>
          <Input
            name="chatLink"
            value={formData.chatLink}
            onChange={handleChange}
          />
        </InfoRow>
        <InfoRow>
          <strong>경매 상태</strong>
          <Select name="status" value={formData.status} onChange={handleChange}>
            <option value="진행 중">진행 중</option>
            <option value="종료 됨">종료 됨</option>
            <option value="낙찰 완료">낙찰 완료</option>
          </Select>
        </InfoRow>
        <InfoRow>
          <strong>카테고리</strong>
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
        </InfoRow>
        <InfoRow>
          <strong>최소 입찰가</strong>
          <Input
            name="minPrice"
            type="number"
            value={formData.minPrice}
            onChange={handleChange}
          />
        </InfoRow>
        <InfoRow>
          <strong>최대 입찰가</strong>
          <Input
            name="maxPrice"
            type="number"
            value={formData.maxPrice}
            onChange={handleChange}
          />
        </InfoRow>
        <InfoRow>
          <strong>입찰 단위</strong>
          <Input
            name="bidUnit"
            type="number"
            value={formData.bidUnit}
            onChange={handleChange}
          />
        </InfoRow>
        <InfoRow>
          <strong>마감 기한</strong>
          <Input
            name="deadline"
            type="datetime-local"
            value={formData.deadline}
            onChange={handleChange}
          />
        </InfoRow>

        <ButtonRow>
          <ActionButton onClick={handleSave}>상품 수정하기</ActionButton>
          <ActionButton onClick={handleDelete}>상품 삭제하기</ActionButton>
        </ButtonRow>
      </Main>
    </PageWrapper>
  );
};

export default SellerProductDetailPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
  color: #333;
`;

const Main = styled.div`
  flex: 1;
  padding: 20px 16px;
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
  margin-bottom: 15px;
`;

const Subtitle = styled.div`
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 10px;
  width: 90%;
  text-align: right;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 90%;
  height: 240px;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const OverlayText = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
`;

const Seller = styled.div`
  font-size: 0.9rem;
  color: #999;
  text-align: right;
  width: 90%;
`;

const Textarea = styled.textarea`
  width: 82%;
  min-height: 70px;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 40px;
  resize: none;
  border: 1px solid #ddd;
  padding: 10px 10px;
  border-radius: 7px;
`;

const Input = styled.input`
  width: 80%;
  font-size: 0.8rem;
  padding: 6px 10px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 7px;
  color: #666;
`;

const Select = styled.select`
  width: 40%;
  font-size: 0.8rem;
  padding: 6px 10px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  text-align: center;
`;

const InfoRow = styled.div`
  font-size: 0.9rem;
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  strong {
    width: 150px;
    font-weight: 600;
    color: #555;
    line-height: 30px;
  }
  span {
    text-align: right;
    color: #666;
  }

  input {
    text-align: right;
  }
`;

const ButtonRow = styled.div`
  margin-top: 34px;
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
