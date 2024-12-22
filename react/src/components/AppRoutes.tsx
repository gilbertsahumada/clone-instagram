import React from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "../pages/Feed";
import Create from "../pages/Create";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/create" element={<Create />} />
      <Route path="/create/single-image" element={<NewPost />} />
    </Routes>
  );
};

export default AppRoutes;
