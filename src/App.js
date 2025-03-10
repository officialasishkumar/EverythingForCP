import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

// Import the pages from your existing project
import Home from "./Component/Home/Home";
import Cfvis from "./Component/Visualize/Cfvis";
import Ladder from "./Component/Ladder/Ladder";
import Compiler from "./Component/Compiler/Compiler";
import AlgovizApp from "./algoviz/AlgovizApp";
// import Footer from "./Component/Footer";

const NavLink = ({ to, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      <Link to={to} className="text-white font-extrabold text-xl p-2 relative">
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-md"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.4, transition: { duration: 0.3 } }}
          style={{ zIndex: 0 }}
        />
      </Link>
    </motion.div>
  );
};


export default function App() {
  return (
    <Router>
      <header className="w-full bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="px-4 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="text-white font-bold text-2xl hover:opacity-80">
              EVERYTHING FOR CP
            </Link>
          </motion.div>

          {/* Desktop Navigation using Radix NavigationMenu */}
          <NavigationMenu.Root className="hidden md:block">
            <NavigationMenu.List className="flex space-x-5">
              <NavigationMenu.Item>
                <NavLink to="/visualize">VISUALIZEME</NavLink>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavLink to="/ladder">ELEVATOR</NavLink>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavLink to="/compiler">COMPILER</NavLink>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavLink to="/algoviz">ALGOVIZ</NavLink>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>

          {/* Mobile Navigation using Radix Dialog */}
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <motion.div
                className="md:hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AiOutlineMenu size={30} className="text-white" />
              </motion.div>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50"
              />
              <Dialog.Content
                as={motion.div}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="fixed inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 flex flex-col items-center p-6"
              >
                <div className="self-end">
                  <Dialog.Close asChild>
                    <button className="text-white">
                      <AiOutlineClose size={30} />
                    </button>
                  </Dialog.Close>
                </div>
                <nav className="mt-8 w-full flex flex-col space-y-2">
                  <Dialog.Close asChild>
                    <Link
                      to="/visualize"
                      className="p-3 text-center text-white font-extrabold text-xl hover:text-blue-900 hover:bg-white"
                    >
                      VISUALIZEME
                    </Link>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Link
                      to="/ladder"
                      className="p-3 text-center text-white font-extrabold text-xl hover:text-blue-900 hover:bg-white"
                    >
                      ELEVATOR
                    </Link>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Link
                      to="/compiler"
                      className="p-3 text-center text-white font-extrabold text-xl hover:text-blue-900 hover:bg-white"
                    >
                      COMPILER
                    </Link>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Link
                      to="/algoviz"
                      className="p-3 text-center text-white font-extrabold text-xl hover:text-blue-900 hover:bg-white"
                    >
                      ALGOVIZ
                    </Link>
                  </Dialog.Close>
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualize" element={<Cfvis />} />
          <Route path="/ladder" element={<Ladder />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/algoviz/*" element={<AlgovizApp />} />
        </Routes>
      </main>

      {/* <Footer /> */}
    </Router>
  );
}