import {  Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Edit from "./Pages/Edit";
function App() {
  return (
    <Routes>
      <Route path="/" >
        <Route index element={<Home />} />
        <Route path="/:id" element={<Edit />} />
      </Route>
    </Routes>
  );
}

export default App;
