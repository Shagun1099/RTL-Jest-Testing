import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setUser(data);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <span className="user">{user.name}</span>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={!username || !password} onClick={handleClick}>
        {loading ? "please wait..." : "Login"}
      </button>
      <span
        style={{ visibility: error ? "visible" : "hidden" }}
        className="error"
        data-testid="error"
      >
        Something went wrong!
      </span>
    </div>
  );
};

export default Login;
