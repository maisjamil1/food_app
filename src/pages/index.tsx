import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Details from "./Details";
import Cuisine from "@/pages/Cuisine.tsx";
import { FC } from "react";
const Pages: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:recipeId" element={<Details />} />
      <Route path="/cuisine/:cuisineName" element={<Cuisine />} />
    </Routes>
  );
};

export default Pages;
