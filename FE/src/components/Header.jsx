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

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold">
          <Link to="/" className="text-white">
            Environmental Survey
          </Link>
        </div>

        {/* Navigation / Right side */}
        <nav>
          <ul className="flex space-x-6">
            <li>
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
