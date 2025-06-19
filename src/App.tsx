import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import Chat from './pages/Chat';
import AdminDashboard from './pages/AdminDashboard';
import AdminFlow from './pages/AdminFlow';
import AdminLayout from './layouts/AdminLayout';

function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* User */}
      <Route path="/chat" element={<Chat />} />

      {/* Admin (with layout) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="flow" element={<AdminFlow />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<div>404 - Page not found</div>} />
    </Routes>
  );
}

export default App;
