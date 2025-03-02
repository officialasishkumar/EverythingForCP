import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import "./Styles/home-page.css";
import "./Styles/App.css";
import Tree from "./Algorithms/Tree/Tree";
import LinearSearch from "./Algorithms/Array/LinearSearch";
import BinarySearch from "./Algorithms/Array/BinarySearch";
import TwoPointers from "./Algorithms/Array/TwoPointers";
import Stack from "./Algorithms/Stack/Stack";
import LinkedList from "./Algorithms/LinkedList/LinkedList";
import Matrix from "./Algorithms/Matrix/Matrix";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tree" element={<Tree />} />
      {/* Direct routes to array algorithms */}
      <Route path="/linear-search" element={<LinearSearch />} />
      <Route path="/binary-search" element={<BinarySearch />} />
      <Route path="/two-pointers" element={<TwoPointers />} />
      <Route path="/stack" element={<Stack />} />
      <Route path="/linked-list" element={<LinkedList />} />
      <Route path="/matrix" element={<Matrix />} />
    </Routes>
  );
}

export default App;
