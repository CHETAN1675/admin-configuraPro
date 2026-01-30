import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import AdminNavbar from "../components/AdminNavbar";
import AuthModal from "../components/AuthModal";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";

// Optional Layout wrapper for pages
function Layout({ children }) {
  return <div className="flex-1 px-4 md:px-6 lg:px-8 py-6">{children}</div>;
}

export default function AppRoutes() {
  const token = useSelector((s) => s.auth.token);
  const [showAuth, setShowAuth] = useState(!token);

  if (!token) {
    // Show AuthModal for non-logged-in users
    return <AuthModal show={showAuth} onHide={() => setShowAuth(false)} />;
  }

  return (
    <>
      {/* Navbar always visible for logged-in admin */}
      <AdminNavbar />

      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/orders"
          element={
            <Layout>
              <Orders />
            </Layout>
          }
        />

        {/* Fallback for any unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
