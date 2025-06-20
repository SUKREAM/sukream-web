import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import TopProducts from "../../components/TopProducts";

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

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("전체");
  const [sort, setSort] = useState("basic");

  useEffect(() => {
    let url = `http://localhost:8080/api/product`;
    const params = [];
    if (category !== "전체") params.push(`category=${category}`);
    if (sort === "popular") params.push(`sort=popular`);
    if (params.length > 0) url += `?${params.join("&")}`;

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.data);
        } else {
          console.error("상품 조회 실패:", res.data.errorMsg);
        }
      })
      .catch((err) => {
        console.error("상품 조회 중 오류:", err);
      });
  }, [category, sort]);

  return (
    <PageWrapper>
      <Main>
        <CategoryBar>
          {categories.map((cat) => (
            <CategoryButton
              key={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoryBar>

        <TopProducts />

        <SortSelect value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="basic">등록순</option>
          <option value="popular">인기순</option>
        </SortSelect>

        <ProductList>
          {products.map((product) => (
            <ProductItem key={product.id}>
              <ProductLink to={`/products/${product.id}`}>
                <SellerName>{product.sellerName}</SellerName>
                <Title>{product.title}</Title>
                <TopRightDate>
                  {new Date(product.createdAt).toLocaleString()}
                </TopRightDate>
                <BottomRow>
                  <BidCountText>입찰 수: {product.bidCount}회</BidCountText>
                </BottomRow>
              </ProductLink>
            </ProductItem>
          ))}
        </ProductList>
      </Main>
    </PageWrapper>
  );
};

export default ProductListPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 16px;
  max-width: 350px;
  margin: 0 auto;
`;

const CategoryBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3.3px;
  margin-bottom: 16px;
  max-width: 380px;
`;

const CategoryButton = styled.button`
  text-align: left;
  font-size: 11px;
  width: 85px;
  height: 30px;
  padding: 6px 10px;
  border: 1px solid #aaa;
  background: ${({ active }) => (active ? "#007bff" : "white")};
  color: ${({ active }) => (active ? "white" : "#333")};
  cursor: pointer;
`;

const SortSelect = styled.select`
  margin-left: auto;
  padding: 4px;
  border-radius: 4px;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  margin-top: 12px;
`;

const ProductLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: #fff;
  border-radius: 6px;
  color: #222;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  position: relative;
`;

const SellerName = styled.p`
  font-size: 11px;
  margin: 0;
  color: #888;
`;

const Title = styled.h4`
  font-size: 14px;
  margin: 5px 0 0 0; /* 상단 여백 1px */
  font-weight: bold;
  color: #222;
`;

const TopRightDate = styled.span`
  position: absolute;
  top: 15px;
  right: 12px;
  font-size: 10px;
  color: #aaa;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BidCountText = styled.span`
  font-size: 10px;
  color: #666;
`;
