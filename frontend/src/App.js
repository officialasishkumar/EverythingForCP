import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import Home from "./Component/Home/Home";
import Cfvis from "./Component/Visualize/Cfvis";
import Ladder from "./Component/Ladder/Ladder";
import Compiler from "./Component/Compiler/Compiler";
import Footer from "./Component/Footer";

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <Router>
      <div className="w-full bg-blue-900">
        <div className="px-4 py-4 flex justify-between items-center">
          <h1 className="text-white font-bold text-2xl">EVERYTHING FOR CP</h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <ul className="flex text-white items-center">
              <li className="px-5">
                <Link className="hover:text-blue-900 hover:bg-white font-extrabold text-xl p-2" to="/">
                  HOME
                </Link>
              </li>
              <li className="px-5">
                <Link className="hover:text-blue-900 hover:bg-white font-extrabold text-xl p-2" to="/visualize">
                  VISUALIZEME
                </Link>
              </li>
              <li className="px-5">
                <Link className="hover:text-blue-900 hover:bg-white font-extrabold text-xl p-2" to="/ladder">
                  ELEVATOR
                </Link>
              </li>
              <li className="px-5">
                <Link className="hover:text-blue-900 hover:bg-white font-extrabold text-xl p-2" to="/compiler">
                  COMPILER
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Navigation Toggle */}
          <div onClick={handleMenuToggle} className="block md:hidden">
            {menuVisible ? (
              <AiOutlineClose size={30} className="text-white" />
            ) : (
              <AiOutlineMenu size={30} className="text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuVisible && (
        <div className="w-full bg-blue-900 text-white absolute top-[64px] left-0 flex flex-col items-center">
          <Link
            to="/"
            className="p-3 hover:text-blue-900 hover:bg-white w-full text-center"
            onClick={() => setMenuVisible(false)}
          >
            HOME
          </Link>
          <Link
            to="/visualize"
            className="p-3 hover:text-blue-900 hover:bg-white w-full text-center"
            onClick={() => setMenuVisible(false)}
          >
            VISUALIZEME
          </Link>
          <Link
            to="/ladder"
            className="p-3 hover:text-blue-900 hover:bg-white w-full text-center"
            onClick={() => setMenuVisible(false)}
          >
            ELEVATOR
          </Link>
          <Link
            to="/compiler"
            className="p-3 hover:text-blue-900 hover:bg-white w-full text-center"
            onClick={() => setMenuVisible(false)}
          >
            COMPILER
          </Link>
        </div>
      )}

      {/* Routes */}
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualize" element={<Cfvis />} />
          <Route path="/ladder" element={<Ladder />} />
          <Route path="/compiler" element={<Compiler />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}
