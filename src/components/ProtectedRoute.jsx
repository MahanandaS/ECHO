import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Redirects unauthenticated users to the login page
 * Use this to wrap routes that require authentication
 */
export default function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
