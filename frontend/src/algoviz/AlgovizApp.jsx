import HomePage from "./Components/HomePage";
import './Styles/home-page.css';
import './Styles/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tree from "./Algorithms/Tree/Tree";
import Array from "./Algorithms/Array/Array";
import Stack from "./Algorithms/Stack/Stack";
import LinkedList from "./Algorithms/LinkedList/LinkedList";
import Animation from "./Algorithms/LinkedList/Animation";
import Matrix from "./Algorithms/Matrix/Matrix";
import WorkInProgress from "./Components/WorkInProgress";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/array/*" element={<Array />} />
        <Route path="/stack" element={<Stack />} />
        <Route path="/linked-list" element={<LinkedList />} />
        <Route path="/linked-list/animation" element={<Animation />} />
        <Route path="/matrix" element={<Matrix />} />
        <Route path="*" element={<WorkInProgress />}></Route>
      </Routes>
  );
}

export default App;
