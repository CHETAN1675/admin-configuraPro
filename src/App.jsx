import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoute";
import { restoreAdmin } from "./features/auth/authSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      dispatch(restoreAdmin(JSON.parse(saved)));
    }
  }, [dispatch]);

  return <AppRoutes />;
}
