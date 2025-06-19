import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MainPage from "../pages/MainPage";
import MyPage from "../pages/MyPage/MyPage";
import ProductListPage from "../pages/Product/ProductListPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import ReviewPage from "../pages/Review/ReviewPage";
import ReviewWritePage from "../pages/Review/ReviewWritePage";
import BuyHistoryPage from "../pages/MyPage/BuyHistoryPage";
import SellHistoryPage from "../pages/MyPage/SellHistoryPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "search", element: <MainPage /> },

      { path: "mypage", element: <MyPage /> },
      { path: "mypage/buy",element: <BuyHistoryPage />},
      { path: "mypage/sell",element: <SellHistoryPage />},
      // 리뷰 관련 라우트
      { path: "reviews", element: <ReviewPage /> },           // 리뷰 조회
      { path: "reviews/write/:productId", element: <ReviewWritePage /> }, // 리뷰 작성회 페이지
      
    ],
  },
]);

export default router;
