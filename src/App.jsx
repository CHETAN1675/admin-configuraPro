import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoute.jsx";
import { restoreAdmin } from "./features/auth/authSlice";
import Footer from "./components/layout/Footer";
import useDarkMode from "./hooks/useDarkMode";

export default function App() {
  const dispatch = useDispatch();
  const [dark] = useDarkMode(); 

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      dispatch(restoreAdmin(JSON.parse(saved)));
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <AppRoutes /> {/* Navbar will now be part of layout in AppRoutes */}
      <Footer />
    </div>
  );
}
