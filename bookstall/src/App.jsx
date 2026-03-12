import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import './App.css';
import AdminRoutes from './modules/admin/AdminRoutes';
import CustomerRoutes from './modules/customer/CustomerRoutes';
import StaffRoutes from './modules/staff/StaffRoutes';
import Login from './pages/Login';
import Register from './pages/Register';

// ProtectedRoute wrapper
const ProtectedRoute = ({ role, allowedRoles, children }) => {
  if (!role) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  // Use a function to initialize state so it only runs once
  const [role, setRole] = useState(() => localStorage.getItem("role"));

  const handleLogout = () => {
    localStorage.clear(); // Clears everything to be safe
    setRole(null);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setRole} />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role={role} allowedRoles={["admin"]}>
            <AdminRoutes onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff/*"
        element={
          <ProtectedRoute role={role} allowedRoles={["staff"]}>
            <StaffRoutes onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/*"
        element={
          <ProtectedRoute role={role} allowedRoles={["customer"]}>
            <CustomerRoutes onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* Simplified Redirect Logic */}
      <Route
        path="/"
        element={
          role === "admin" ? <Navigate to="/admin" replace /> :
          role === "staff" ? <Navigate to="/staff" replace /> :
          role === "customer" ? <Navigate to="/customer" replace /> :
          <Navigate to="/login" replace />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;