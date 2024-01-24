import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { About } from "./Routes/About";
import { ErrorReport } from "./Routes/ErrorReport";
import { SuccessReports } from "./Routes/SuccessReports";
import { Sent } from "./Routes/Sent";
import { EditPage } from "./Routes/EditPage";
import { Composer } from "./Routes/Composer";
import { Login } from "./Routes/Login";
import Logout from "./Routes/Logout";

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem("loged_in") === null &&
      window.location.pathname !== "/"
    ) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/about/:title" element={<About />} />
      <Route path="/errorreport" element={<ErrorReport />} />
      <Route path="/successreports" element={<SuccessReports />} />
      <Route path="/sent" element={<Sent />} />
      <Route path="/editpage/:title" element={<EditPage />} />
      <Route path="/composer" element={<Composer />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

function Home() {
  return (
    <>
      <Login />
    </>
  );
}
