import React, { useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AdminMessages from "./Pages/AdminMessages";
import { AuthStore } from "./Store/authStore";

const App = () => {
  // ✅ Use individual selectors (this is the correct way)
  const authUser = AuthStore((state) => state.authUser);
  const token = AuthStore((state) => state.token);
  const checkAuth = AuthStore((state) => state.checkAuth);
  const isCheckingAuth = AuthStore((state) => state.isCheckingAuth);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // User is authenticated if they have BOTH authUser AND token
  const isAuthenticated = !!(authUser && token);

  // Memoize the redirect logic to prevent infinite loops
  useEffect(() => {
    if (!isCheckingAuth) {
      console.log("🔐 App.jsx Auth Check Complete:", {
        isAuthenticated,
        currentPath: location.pathname,
        authUser: authUser ? authUser : "null",
        token: token ? "exists" : "null",
      });

      // If authenticated and on login page, redirect to home
      if (isAuthenticated && location.pathname === "/login") {
        console.log("✅ Authenticated user on /login, redirecting to /");
        navigate("/", { replace: true });
      }

      // If not authenticated and on protected route, redirect to login
      if (!isAuthenticated && (location.pathname === "/" || location.pathname === "/messages")) {
        console.log("❌ Unauthenticated user on protected route, redirecting to /login");
        navigate("/login", { replace: true });
      }
    }
  }, [isCheckingAuth, isAuthenticated, location.pathname, navigate]);

  // Show loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <svg
          className="w-10 h-10 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Home - Protected Route */}
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />

        {/* Login - Redirect to home if already authenticated */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
        />

        {/* Catch all - redirect to login or home based on auth status */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </div>
  );
};

export default App;