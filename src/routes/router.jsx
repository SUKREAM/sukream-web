import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MainPage from "../pages/MainPage";
import MyPage from "../pages/User/MyPage";
import ProductListPage from "../pages/Product/ProductListPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import AwardManagementPage from "../pages/Bidder/AwardManagementPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "mypage", element: <MyPage /> },
      { path: "search", element: <MainPage /> },
      { path: "award-management", element: <AwardManagementPage />}
    ],
  },
]);

export default router;
