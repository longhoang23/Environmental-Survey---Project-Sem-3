import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold">
          <Link to="/" className="text-white">
            Environmental Survey
          </Link>
        </div>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
