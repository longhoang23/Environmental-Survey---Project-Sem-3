<<<<<<< HEAD
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
=======
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();

  // Local states to track login status and user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check token/user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const userString = localStorage.getItem("user");
      if (userString) {
        setCurrentUser(JSON.parse(userString));
      }
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/login"); // redirect to login (or wherever you want)
  };
>>>>>>> 9ca9659f86fe45e62509f2bac77721e5adf0d058

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="mx-auto px-4 flex items-center justify-between">
        <div className="text-xl font-semibold">
          <Link to="/" className="text-white">
            <img src={logo} alt="logo" className="w-44 h-auto" />
          </Link>
        </div>

        {/* Navigation / Right side */}
        <nav>
          <ul className="flex space-x-6">
            <li>
<<<<<<< HEAD
              <span className="text-xl">
                Hello, {firstName} (
                {role === 1 ? "Admin" : role === 2 ? "Staff" : "Student"})
              </span>
            </li>
=======
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>

            {/* If not logged in, show Register & Login */}
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/register" className="hover:text-gray-300">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-gray-300">
                    Login
                  </Link>
                </li>
              </>
            )}

            {/* If logged in, show user info & Logout */}
            {isLoggedIn && currentUser && (
              <>
                {/* Example display: "Hello, <username>!" */}
                <li className="text-sm text-yellow-300">
                  Hello, {currentUser.username}!
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-gray-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
>>>>>>> 9ca9659f86fe45e62509f2bac77721e5adf0d058
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
