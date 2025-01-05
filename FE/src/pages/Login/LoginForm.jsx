import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
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
      const response = await axios.post(`${apiUrl}/User/Login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      if (!token || !user) {
        setError("Phản hồi từ server không hợp lệ!");
        setLoading(false);
        return;
      }

      // Lưu token và thông tin người dùng vào localStorage
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
          type={showPassword ? "text" : "password"} // Hiển thị mật khẩu dựa trên trạng thái
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
              onChange={() => setShowPassword(!showPassword)} // Đổi trạng thái hiển thị mật khẩu
              className="mr-2"
            />
            Hiển thị mật khẩu
          </label>
        </div>
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
