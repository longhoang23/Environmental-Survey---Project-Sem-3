import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [openMenus, setOpenMenus] = useState({}); // State quản lý menu mở
  const navigate = useNavigate();

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
    return null; // Không hiển thị nếu chưa đăng nhập
  }

  const { firstName, role } = user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("user-changed"));
    window.location.href = "/login";
  };

  const toggleMenu = (menuName) => {
    setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  const menus = {
    1: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "User Requests", path: "/admin/user-requests" },
      {
        name: "Survey",
        subMenus: [
          { name: "Create Survey", path: "/add-survey" },
          { name: "Survey Question", path: "/questions" },
          { name: "Survey Option", path: "/options" },
          { name: "All Surveys", path: "/surveys" },
        ],
      },
      {
        name: "Seminar",
        subMenus: [
          { name: "Create Seminar", path: "/add-seminar" },
          { name: "All Seminars", path: "/seminar-list" },
        ],
      },
      { name: "Participations", path: "/participation-list" },
      { name: "Response", path: "/response-list" },
      {
        name: "Competition",
        subMenus: [
          { name: "Create Competition", path: "/add-competition" },
          { name: "All Competitions", path: "/competition-list" },
        ],
      },
      {
        name: "FAQs",
        subMenus: [
          { name: "Create FAQ", path: "/admin/add-faq" },
          { name: "All FAQs", path: "/faqs" },
        ],
      },
      {
        name: "Supports",
        subMenus: [
          { name: "Create Support", path: "/add-support" },
          { name: "All Supports", path: "/support-list" },
        ],
      },
    ],
    2: [
      {
        name: "Survey",
        subMenus: [
          { name: "All Surveys", path: "/survey-list" },
          { name: "Survey Question", path: "/questions" },
          { name: "Survey Option", path: "/options" },
        ],
      },
      { name: "Seminars", path: "/seminar-list" },
      { name: "Participations", path: "/participation-list" },
      { name: "Response", path: "/response-list" },
      { name: "Competitions", path: "/competition-list" },
      { name: "Staffs", path: "/staff/staff-list" },
      { name: "Students", path: "/staff/student-list" },
      { name: "FAQs", path: "/faqs" },
      { name: "Supports", path: "/support-list" },
    ],
    3: [
      {
        name: "Survey",
        subMenus: [
          { name: "All Surveys", path: "/survey-list" },
          { name: "Survey Question", path: "/questions" },
          { name: "Survey Option", path: "/options" },
        ],
      },
      { name: "Seminars", path: "/seminar-list" },
      { name: "Participations", path: "/participation-list" },
      { name: "Response", path: "/response-list" },
      { name: "Competitions", path: "/competition-list" },
      { name: "FAQs", path: "/faqs" },
      { name: "Supports", path: "/support-list" },
    ],
  };

  const renderMenu = (menuList) =>
    menuList.map((menu) =>
      menu.subMenus ? (
        <li key={menu.name}>
          <button
            onClick={() => toggleMenu(menu.name)}
            className="block w-full text-left text-lg text-blue-500 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
          >
            {menu.name}
            <span className="float-right">
              {openMenus[menu.name] ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          {openMenus[menu.name] && (
            <ul className="ml-4 space-y-2">
              {menu.subMenus.map((subMenu) => (
                <li key={subMenu.name}>
                  <Link
                    to={subMenu.path}
                    className="block text-blue-400 py-2 px-4 hover:bg-gray-200"
                  >
                    {subMenu.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ) : (
        <li key={menu.name}>
          <Link
            to={menu.path}
            className="block text-lg text-blue-500 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
          >
            {menu.name}
          </Link>
        </li>
      )
    );

  return (
    <div className="bg-white font-medium w-64 h-screen p-4">
      <ul className="space-y-4">{renderMenu(menus[role] || [])}</ul>
      <div className="mt-6 border-t border-gray-300 pt-6">
        <button
          onClick={() => navigate("/profile")}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition duration-300 mb-4"
        >
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
