import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginService, getUserByToken } from "../../services/services";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Step 1: Login user
      const response = await loginService(email, password);
      const token = response.data.token;

      // Step 2: Store token only
      localStorage.setItem("token", token);

      // Step 3: Wait for 2 seconds (simulate loading/checking role)
      setTimeout(async () => {
        try {
          // Step 4: Verify token with backend
          const res = await getUserByToken(token);
          const fetchedUser = res.data.user;

          console.log("Fetched user:", fetchedUser);

          // Step 5: Navigate based on role
          if (fetchedUser.urole === "admin") {
            navigate("/adminDashbord");
          } else {
            navigate("/userDashbord");
          }
        } catch (err) {
          console.error("Error fetching user by token:", err);
          setError("Failed to verify user role ❌");
        } finally {
          setLoading(false);
        }
      }, 2000); // 2 second delay
    } catch (err) {
      setError(err.response?.data?.message || "Login failed ❌");
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    // ✅ Clear token (logout)
    localStorage.removeItem("token");
    // ✅ Navigate to home
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Checking role..." : "Login"}
          </button>

          {/* ✅ Go Home Button (logs out + navigates home) */}
          <button
            type="button"
            className="home-btn"
            onClick={handleGoHome}
          >
            🏠 Go Home
          </button>

          <p>
            <Link to="/registerUser">SignUp</Link>
          </p>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
