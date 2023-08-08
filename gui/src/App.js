import React from "react";
import {SearchContainer, ArtistContainer} from "./container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SearchContainer/>} />
        <Route path="/artist/:artist" element={<ArtistContainer/>} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;