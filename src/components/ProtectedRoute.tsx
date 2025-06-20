import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

type Props = {
  children: React.ReactNode;
  allowedRoles?: ('admin' | 'user')[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
