import React from "react";
import { Outlet } from "react-router-dom";
import HeaderDefault from "../components/Header/HeaderDefault";

const DefaultLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <header>
      <HeaderDefault />
    </header>
    <main className="w-full flex-grow max-w-7xl mx-auto">
      <Outlet />
    </main>
    <footer>Default Footer</footer>
  </div>
);

export default DefaultLayout;
