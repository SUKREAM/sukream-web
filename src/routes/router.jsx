import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MainPage from "../pages/MainPage";
import OnBoardingPage from "../pages/OnBoardingPage";

// User 관련 import

// Product 관련 import
import ProductListPage from "../pages/Product/ProductListPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import ProductAddPage from "../pages/Product/ProductAddPage";

// Review 관련 import
import ReviewPage from "../pages/Review/ReviewPage";
import ReviewWritePage from "../pages/Review/ReviewWritePage";
import SellerReviewPage from "../pages/Review/SellerReviewPage";

// MyPage 관련 Import
import MyPage from "../pages/MyPage/MyPage";

// Bidder 관련 import
import AwardManagementPage from "../pages/Bidder/AwardManagementPage";
import BuyHistoryPage from "../pages/MyPage/BuyHistoryPage";
import SellHistoryPage from "../pages/MyPage/SellHistoryPage";

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

      // 리뷰 관련 라우트
      { path: "reviews", element: <ReviewPage /> },           // 리뷰 조회
      { path: "reviews/write/:productId", element: <ReviewWritePage /> }, // 리뷰 작성회 페이지
      //특정 판매자 리뷰 조회 라우트
      { path: "/sellers/:userId/reviews", element: <SellerReviewPage />},
      { path: "products/add", element: <ProductAddPage /> },

      //마이페이지 관련 라우트
      { path: "mypage", element: <MyPage /> },
      { path: "mypage/buy", element: <BuyHistoryPage /> },
      { path: "mypage/sell", element: <SellHistoryPage /> },
      
       // 경매 관련 라우트
      { path: "award-management", element: <AwardManagementPage /> },
    ],
  },
]);

export default router;
