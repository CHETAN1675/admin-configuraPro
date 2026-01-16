import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import AuthModal from "../components/AuthModal";

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
          </>
        ) : (
          <Route path="*" element={null} />
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
