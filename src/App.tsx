import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";
import RegisterPage from "./components/auth/RegisterPage";
import Dashboard from "./components/home/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-gray-200 min-h-screen">
        <Routes>
          {/* <Route path="/form" element={<RegisterPage />} /> */}
          {/* <Route path='/' element={<Auth/>} /> */}
          {/* <AuthRoute path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form" element={<RegisterPage />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
