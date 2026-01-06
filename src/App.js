import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddEditEmployee from "./pages/AddEditEmployee";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Add / Edit Employee */}
        <Route
          path="/employee"
          element={isLoggedIn ? <AddEditEmployee /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
