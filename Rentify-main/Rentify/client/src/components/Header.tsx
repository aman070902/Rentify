import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  user: { username: string; email: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ username: string; email: string } | null>>;
}

const Header: React.FC<HeaderProps> = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem("user");

    // Update user state and redirect to login
    setUser(null);
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <ul style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/chat">Chat</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/uploads">Uploads</Link></li>
              <li
                style={{ marginLeft: "auto", cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
