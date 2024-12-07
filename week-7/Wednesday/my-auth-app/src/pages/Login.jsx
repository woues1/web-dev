// pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import Navigate
import useAuthContext from "../hooks/useAuthContext"; // Import useAuthContext

export default function Login() {
  const [username, setUsername] = useState(""); // Local state for username
  const { user, login } = useAuthContext(); // Access the auth context
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username); 
    return navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
        placeholder="Username"
        required // Ensure input is not empty
      />
      <button type="submit">Login</button> {/* Submit button */}
    </form>
  );
}