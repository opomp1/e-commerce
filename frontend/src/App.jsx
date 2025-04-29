import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import AdminPage from "./Pages/AdminPage";
import LoadingSpinner from "./components/LoadingSpinner";
import CategoryPage from "./Pages/CategoryPage";
import CartPage from "./Pages/CartPage";
import PurchaseSuccessPage from "./Pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./Pages/PurchaseCancelPage";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative min-h-[100svh] bg-white text-black font-display">
      {/* Background gradient - make it grow with content */}
      {/* <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
      </div> */}

      {/* Foreground content */}
      <div className="relative z-10 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/secret-dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />
            }
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to="/" />}
          />
          <Route
            path="/purchase-success"
            element={user ? <PurchaseSuccessPage /> : <Navigate to="/" />}
          />
          <Route
            path="/purchase-cancel"
            element={user ? <PurchaseCancelPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
};

export default App;
