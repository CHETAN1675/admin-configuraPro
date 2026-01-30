import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  // Dark mode toggle
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-slate-800 text-white dark:bg-slate-700"
        : "text-slate-400 hover:text-white hover:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/20 bg-slate-900/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Admin" className="h-9 w-9 rounded-md" />
            <span className="text-lg font-semibold text-white tracking-tight">
              ConfiguraPro
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={linkClass}>
              Dashboard
            </NavLink>

            {token && (
              <>
                <NavLink to="/products" className={linkClass}>
                  Products
                </NavLink>
                <NavLink to="/orders" className={linkClass}>
                  Orders
                </NavLink>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDark(!dark)}
                  className="ml-2 rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700 transition"
                  title="Toggle theme"
                >
                  {dark ? (
                    // Sun icon
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414m0-11.314L7.05 7.05m11.314 11.314-1.414-1.414"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  ) : (
                    // Moon icon
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-slate-800 hover:text-red-300 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  open
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-3 space-y-1 dark:bg-slate-950">
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>
            Products
          </NavLink>
          <NavLink to="/orders" className={linkClass} onClick={() => setOpen(false)}>
            Orders
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-slate-800 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
