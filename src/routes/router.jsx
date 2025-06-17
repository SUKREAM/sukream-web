import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import MainPage from "../pages/MainPage";
import ProductListPage from "../pages/Product/ProductListPage";
import ProductDetailPage from "../pages/Product/ProductDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailPage /> },
      { path: "mypage", element: <MainPage /> },
      { path: "search", element: <MainPage /> },
    ],
  },
]);

export default router;
