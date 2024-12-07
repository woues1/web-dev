
import { Navigate } from 'react-router-dom'; // Import Navigate
import useAuthContext from '../hooks/useAuthContext';

export default function Home() {
  const { user, logout } = useAuthContext(); // Access the auth context

  // If user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />; // Redirect to the login route
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={logout}>Logout</button> {/* Logout button */}
    </div>
  );
}