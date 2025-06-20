import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import Chat from './pages/Chat';
import AdminDashboard from './pages/AdminDashboard';
import AdminFlow from './pages/AdminFlow';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected user route */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <Chat />
          </ProtectedRoute>
        }
      />

      {/* Protected admin layout and nested routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="flow" element={<AdminFlow />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<div>404 - Page not found</div>} />
    </Routes>
  );
}

export default App;
