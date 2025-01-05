import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../components/Login";
import MainLayout from "../components/MainLayout";

function RoutesIndex() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default RoutesIndex;
