import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ManagementPage from "../../pages/ManagementPage/ManagementPage";
import { setupTokenInterceptor } from "../api/http";

function TokenLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/");
    }

    setReady(true);
  }, []);

  if (!ready) return null;

  return <>{children}</>;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <TokenLoader>
        <InnerRouter />
      </TokenLoader>
    </BrowserRouter>
  );
}

function InnerRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    setupTokenInterceptor(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path="http://localhost:5174/" />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <ManagementPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
