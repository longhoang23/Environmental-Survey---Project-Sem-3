import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_PUBLIC_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("Please enter your full username and password!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/User/Login`, {
        username,
        password,
      });

      console.log(response);

      const { token, user } = response.data;

      if (!token || !user) {
        setError("Invalid server response!");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      handleLoginSuccess(user);

      switch (user.role) {
        case 1: // Admin
          navigate("/dashboard");
          break;
        case 2: // Staff
          navigate("/survey-list");
          break;
        case 3: // Student
          navigate("/survey-list");
          break;
        default:
          setError("Không tìm thấy vai trò người dùng!");
      }

      alert("Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      setError("Incorrect username or password!");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (loggedInUser) => {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    window.dispatchEvent(new Event("user-changed"));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div>
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
          required
        />
        <div className="mt-2">
          <label className="text-sm text-gray-600 flex items-center">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            Show password
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-md mt-4"
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <div className="text-center text-sm mt-2">
        <p>
          No account yet?{" "}
          <a href="/register" className="text-blue-500">
            Register now
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
