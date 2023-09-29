import React from "react";

import { Route, Router, Routes } from "react-router-dom";
import Home from "./page/Home";
import Success from "./page/Success";
import Cancel from "./page/Cancel";




function App() {
  
  return (
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      </Routes>
  )
}
export default App;