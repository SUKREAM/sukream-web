import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MainPage from "../pages/MainPage";
import OnBoardingPage from "../pages/OnBoardingPage";

// 유저 관련 페이지
import MyPage from "../pages/User/MyPage";

// 상품 관련 페이지
import ProductListPage from "../pages/Product/ProductListPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import ProductAddPage from "../pages/Product/ProductAddPage";

// 경매 관련 페이지

// 리뷰 관련 페이지

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnBoardingPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "main", element: <MainPage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "products/add", element: <ProductAddPage /> },
      { path: "mypage", element: <MyPage /> },
    ],
  },
]);

export default router;
