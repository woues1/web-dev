import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { useContext } from "react";
import ThemeContext from '../context/ThemeContext';
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, clearUser, email, isLoading } = useContext(AuthContext); // Line 9

  // Comment out the hardcoded authentication check
  // const isAuthenticated = false; // Line 11

  // Add a logout option and a loading spinner if the authentication state is still loading
  if (isLoading) { // Line 20
    return <LoadingSpinner />; // Line 21
  }


  const handleClick = (e) => {
    clearUser();
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
        {isAuthenticated ? (
          <div>
            <Link to="/jobs/add-job">Add Job</Link>
            {email && <span>{email}</span>}
            <button onClick={handleClick}>Log out</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
      <button onClick={toggleTheme}>Toggle</button>
    </nav>
  );
};

export default Navbar;
