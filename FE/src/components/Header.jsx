import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy user lúc khởi tạo
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // Lắng nghe sự kiện tùy chỉnh "user-changed"
    const handleUserChanged = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("user-changed", handleUserChanged);

    return () => {
      window.removeEventListener("user-changed", handleUserChanged);
    };
  }, []);

  // Nếu chưa đăng nhập, hiển thị Login và Register
  if (!user) {
    return (
      <header className="bg-blue-600 text-white shadow-md">
        <div className="mx-auto px-4 flex items-center justify-between">
          <div className="text-xl font-semibold">
            <Link to="/" className="text-white">
              <img src={logo} alt="logo" className="w-44 h-auto" />
            </Link>
          </div>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/login" className="hover:text-gray-300 text-xl">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-300 text-xl">
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

  // Nếu đã đăng nhập, hiển thị "Hello, username (role)"
  const { firstName, role } = user; // Lấy firstName và role từ đối tượng user

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="mx-auto px-4 flex items-center justify-between">
        <div className="text-xl font-semibold">
          <Link to="/" className="text-white">
            <img src={logo} alt="logo" className="w-44 h-auto" />
          </Link>
        </div>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <span className="text-xl">
                Hello, {firstName} (
                {role === 1 ? "Admin" : role === 2 ? "Staff" : "Student"})
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
