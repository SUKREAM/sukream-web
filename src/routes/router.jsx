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
import AwardManagementPage from "../pages/Bidder/AwardManagementPage";


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
      { path: "search", element: <MainPage /> },

      { path: "mypage", element: <MyPage /> },
      { path: "mypage/buy",element: <BuyHistoryPage />},
      { path: "mypage/sell",element: <SellHistoryPage />},
      // 리뷰 관련 라우트
      { path: "reviews", element: <ReviewPage /> },           // 리뷰 조회
      { path: "reviews/write/:productId", element: <ReviewWritePage /> }, // 리뷰 작성
      { path: "award-management", element: <AwardManagementPage />}

      { path: "products/add", element: <ProductAddPage /> },
      { path: "mypage", element: <MyPage /> },
    ],
  },
]);

export default router;
