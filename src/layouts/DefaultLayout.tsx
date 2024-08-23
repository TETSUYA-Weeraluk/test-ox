import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderDefault from "../components/Header/HeaderDefault";
import { useAuth } from "../auth/AuthProvider";

const DefaultLayout: React.FC = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <HeaderDefault />
      </header>
      <main className="w-full flex-grow max-w-7xl mx-auto p-4">
        <Outlet />
      </main>
      <footer>Default Footer</footer>
    </div>
  );
};

export default DefaultLayout;
