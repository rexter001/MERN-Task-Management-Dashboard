// src/App.jsx - Root component; sets up routing and context providers
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Layout from './components/Layout';

// ProtectedRoute: redirects to login if the user is not authenticated
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600" />
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
};

// PublicRoute: redirects authenticated users away from login/register pages
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/dashboard" replace /> : children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route
      path="/login"
      element={<PublicRoute><Login /></PublicRoute>}
    />
    <Route
      path="/register"
      element={<PublicRoute><Register /></PublicRoute>}
    />
    <Route
      path="/dashboard"
      element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>}
    />
    <Route
      path="/tasks"
      element={<ProtectedRoute><Layout><Tasks /></Layout></ProtectedRoute>}
    />
    {/* Catch-all fallback */}
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
