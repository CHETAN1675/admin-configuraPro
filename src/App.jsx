import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoute";
import { restoreAdmin } from "./features/auth/authSlice";
import Footer from "./components/layout/Footer";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      dispatch(restoreAdmin(JSON.parse(saved)));
    }
  }, [dispatch]);

  return(
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <AppRoutes />
      </div>
      <Footer />
    </div>
)
}
