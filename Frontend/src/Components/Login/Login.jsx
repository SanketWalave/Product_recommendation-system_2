import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginService, getUserByToken } from "../../services/services";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginService(email, password);

      const token = response.data.token;
      // const loginUser = response.data.user; // ✅ renamed to avoid shadowing

      localStorage.setItem("token", token);
      // localStorage.setItem("user", JSON.stringify(loginUser));

      // Fetch full user by token
      getUserByToken(token)
        .then((res) => {
          const fetchedUser = res.data.user;
          console.log("User details:", fetchedUser);

          setUser(fetchedUser);
          localStorage.setItem("user", JSON.stringify(fetchedUser));

          // ✅ Navigate after we know the role
          if (fetchedUser.urole === "admin") {
            navigate("/adminDashbord");
          } else {
            navigate("/userDashbord");
          }
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setError("Failed to fetch user details");
        });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <p>{user?.urole}</p>
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
            {loading ? "Logging in..." : "Login"}
          </button>
          <br />
          <p>
            <Link to="/signUpUser">SignUp</Link>
          </p>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
