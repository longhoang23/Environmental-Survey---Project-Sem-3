import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_PUBLIC_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
      setLoading(false);
      return;
    }

    try {
      // Gửi yêu cầu đăng nhập tới API
      const response = await axios.post(`${apiUrl}/User/Login`, {
        username,
        password,
      });

      console.log(response.data);

      debugger;
      const { token, user } = response.data;
      console.log(user);

      debugger;
      console.log(token);

      // Lưu token và thông tin người dùng vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("user-changed"));
      debugger;
      const role = user.role;

      if (role == "1") {
        navigate("/admin");
      } else if (role == "2") {
        navigate("/staff");
      } else if (role == "3") {
        navigate("/student");
      } else {
        setError("Không tìm thấy vai trò người dùng!");
      }

      alert("Đăng nhập thành công!");
    } catch (err) {
      debugger;
      setError("Incorrect User name or Password!");
      console.error("Lỗi đăng nhập:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (loggedInUser) => {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    window.dispatchEvent(new Event("user-changed"));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div>
        <label htmlFor="userName" className="block text-sm font-medium">
          User Name
        </label>
        <input
          type="text"
          id="userName"
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
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mt-2"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-md mt-4"
        disabled={loading}
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      <div className="text-center text-sm mt-2">
        <p>
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-blue-500">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
