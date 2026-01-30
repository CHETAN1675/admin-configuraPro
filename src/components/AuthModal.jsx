import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser, signupUser } from "../features/auth/authSlice";

export default function AuthModal({ show, onHide }) {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((s) => s.auth);

  const [isSignup, setIsSignup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Auto-close on successful auth
  useEffect(() => {
    if (token && show) {
      onHide();
    }
  }, [token, show, onHide]);

  if (!show) return null;

  const submit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signupUser({ ...form, isAdmin }));
    } else {
      dispatch(loginUser(form));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onHide}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-slate-900 p-6 shadow-xl border border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            {isSignup ? "Create account" : "Welcome back"}
          </h2>

          <button
            onClick={onHide}
            className="text-slate-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full rounded-lg bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full rounded-lg bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {isSignup && (
            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500"
              />
              Register as Admin
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Please wait..."
              : isSignup
              ? "Create account"
              : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-slate-400">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition"
          >
            {isSignup ? "Login" : "Create one"}
          </button>
        </div>
      </div>
    </div>
  );
}
