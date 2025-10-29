// frontend/src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useCart } from "./context/useCart";
import ProductsPage from "./pages/Products.jsx";
import CartPage from "./pages/Cart.jsx";
import { FiMenu, FiX } from "react-icons/fi";
import "./index.css";

const Header = () => {
  const { itemCount, total } = useCart();
  const totalDisplay = (total || 0).toFixed(2);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-base sm:text-xl font-bold tracking-wide hover:text-yellow-400 transition-colors"
        >
          E-Commerce
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden focus:outline-none text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Nav */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col absolute sm:static top-full left-0 w-full sm:w-auto bg-gray-800 sm:bg-transparent sm:flex sm:flex-row items-center sm:space-x-6 space-y-3 sm:space-y-0 p-3 sm:p-0 border-t sm:border-none`}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm sm:text-base hover:text-yellow-400 transition-colors w-full sm:w-auto text-center py-1 sm:py-0"
          >
            Shop
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base py-2 px-3 sm:px-4 rounded-md relative transition-colors w-full sm:w-auto text-center"
          >
            Cart ({itemCount}) – ${totalDisplay}
          </Link>
        </nav>
      </div>
    </header>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-3 sm:p-4 md:p-6 min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="*"
            element={
              <h2 className="text-center text-red-600 mt-16 sm:mt-20 text-base sm:text-lg md:text-xl font-semibold">
                404: Page Not Found, my good sir!
              </h2>
            }
          />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-white text-center py-3 sm:py-4 text-xs sm:text-sm md:text-base">
        <p>
          &copy; {new Date().getFullYear()} Vibe Commerce Mock. Built with React
          & Node.
        </p>
      </footer>
    </Router>
  );
};

export default App;
