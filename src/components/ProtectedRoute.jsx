import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Redirects unauthenticated users to the login page
 * Use this to wrap routes that require authentication
 */
export default function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
