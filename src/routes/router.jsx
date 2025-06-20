import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import OnBoardingPage from "../pages/OnBoardingPage";

// User 관련 import
import { SelfLoginPage } from "../pages/User/SelfLoginPage";
import { SignUpPage } from "../pages/User/SignUpPage";

// Product 관련 import
import ProductListPage from "../pages/Product/ProductListPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import ProductAddPage from "../pages/Product/ProductAddPage";
import SellerProductDetailPage from "../pages/Product/SellerProductDetailPage";

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
      { path: "main", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "products/add", element: <ProductAddPage /> },
      { path: "products/seller/:id", element: <SellerProductDetailPage /> },

      // User
      { path: "login", element: <SelfLoginPage /> },
      {path: "signup", element: <SignUpPage/>},

      // 리뷰 관련 라우트
      { path: "reviews", element: <ReviewPage /> }, // 리뷰 조회
      { path: "reviews/write/:productId", element: <ReviewWritePage /> }, // 리뷰 작성회 페이지
      //특정 판매자 리뷰 조회 라우트
      { path: "/sellers/:userId/reviews", element: <SellerReviewPage /> },

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
