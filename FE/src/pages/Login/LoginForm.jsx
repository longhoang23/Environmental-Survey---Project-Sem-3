import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_PUBLIC_URL; // Base URL từ môi trường

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

      const { token, user } = response.data; // Lấy token và user từ phản hồi API

      if (!token || !user) {
        setError("Phản hồi từ server không hợp lệ!");
        setLoading(false);
        return;
      }

      // Lưu token và thông tin người dùng vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Phát sự kiện "user-changed" để Sidebar lắng nghe
      handleLoginSuccess(user);

      // Điều hướng theo vai trò của người dùng
      switch (user.role) {
        case 1: // Admin
          navigate("/dashboard");
          break;
        case 2: // Staff
          navigate("/staff");
          break;
        case 3: // Student
          navigate("/student");
          break;
        default:
          setError("Không tìm thấy vai trò người dùng!");
      }

      alert("Đăng nhập thành công!");
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
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
      <h2 className="text-2xl font-bold text-center">Đăng Nhập</h2>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div>
        <label htmlFor="username" className="block text-sm font-medium">
          Tên đăng nhập
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
          Mật khẩu
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
