import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Test from "./pages/Test";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}
