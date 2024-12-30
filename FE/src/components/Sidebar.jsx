import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Import icon từ react-icons (ở ví dụ này mình dùng Font Awesome)
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [openSurveys, setOpenSurveys] = useState(false);
  const [openSeminars, setOpenSeminars] = useState(false);
  const [openFAQs, setOpenFAQs] = useState(false);
  const [openSupports, setOpenSupports] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const handleUserChanged = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };

    window.addEventListener("user-changed", handleUserChanged);

    return () => {
      window.removeEventListener("user-changed", handleUserChanged);
    };
  }, []);

  if (!user) {
    return null;
  }

  const { firstName, role } = user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("user-changed"));
    window.location.href = "/login";
  };

  return (
    <div className="bg-white font-medium w-64 h-screen p-4">
      <ul className="space-y-4">
        {role === 1 && (
          <>
            <li>
              <Link
                to="/admin"
                className="block text-lg text-blue-500 hover: my-2 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/user-requests"
                className="block text-lg text-blue-500 hover: py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
              >
                User Requests
              </Link>
            </li>
            <li>
              <button
                onClick={() => setOpenSurveys(!openSurveys)}
                className="block w-full text-left text-lg text-blue-500 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
              >
                Survey{" "}
                <span className="float-right">
                  {openSurveys ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {openSurveys && (
                <ul className=" space-y-2">
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      Create Survey
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      All Survey
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      On-going Surveys
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      Check Answers
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={() => setOpenSeminars(!openSeminars)}
                className="block w-full text-left text-lg text-blue-500 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
              >
                Seminar{" "}
                <span className="float-right">
                  {openSeminars ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {openSeminars && (
                <ul className=" space-y-2">
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      Create Competition
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      All Competitions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      On-Going Competitions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      Check Answers
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={() => setOpenFAQs(!openFAQs)}
                className="block w-full text-left text-lg text-blue-500 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
              >
                FAQs{" "}
                <span className="float-right">
                  {openFAQs ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {openFAQs && (
                <ul className=" space-y-2">
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      Create FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      All FAQs
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={() => setOpenSupports(!openSupports)}
                className="block w-full text-left text-lg text-blue-500 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
              >
                Supports{" "}
                <span className="float-right">
                  {openSupports ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              {openSupports && (
                <ul className=" space-y-2">
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      Create Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin"
                      className="block text-blue-400 py-2 px-6 hover:bg-gray-200"
                    >
                      All Support
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </>
        )}

        {role === 2 && (
          <>
            <li>
              <Link
                to="/student/surveys"
                className="block text-lg text-white hover:text-gray-300 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Surveys
              </Link>
            </li>
            <li>
              <Link
                to="/student/competitions"
                className="block text-lg text-white hover:text-gray-300 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Seminar
              </Link>
            </li>
            <li>
              <Link
                to="/student/competitions"
                className="block text-lg text-white hover:text-gray-300 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/student/competitions"
                className="block text-lg text-white hover:text-gray-300 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Supports
              </Link>
            </li>
          </>
        )}

        {role === 3 && (
          <>
            <li>
              <Link
                to="/student/surveys"
                className="block text-lg text-white hover:text-gray-300 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Surveys
              </Link>
            </li>
            <li>
              <Link
                to="/student/competitions"
                className="block text-lg text-white hover:text-gray-300 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Seminar
              </Link>
            </li>
            <li>
              <Link
                to="/student/competitions"
                className="block text-lg text-white hover:text-gray-300 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/student/competitions"
                className="block text-lg text-white hover:text-gray-300 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Supports
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className="mt-6 border-t border-gray-700 pt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
