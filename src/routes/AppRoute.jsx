import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import AdminNavbar from "../components/AdminNavbar";
import AuthModal from "../components/AuthModal";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";


export default function AppRoutes() {
  const token = useSelector((s) => s.auth.token);
  const [showAuth, setShowAuth] = useState(!token);

  return (
    <>
      {token && <AdminNavbar />}

      <Routes>
        {token ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            

            {/* fallback for logged-in admin */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            {/* block all routes when not logged in */}
            <Route path="*" element={null} />
          </>
        )}
      </Routes>

      {!token && (
        <AuthModal
          show={showAuth}
          onHide={() => setShowAuth(false)}
        />
      )}
    </>
  );
}
