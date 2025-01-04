import { Link } from "react-router-dom";

const Dashboard = () => {
  const menuItems = [
    { name: "Admin", path: "/admin/admin-list" },
    { name: "Staff", path: "/admin/staff-list" },
    { name: "Student", path: "/admin/student-list" },
    { name: "Class", path: "/admin/classes" },
    { name: "Section", path: "/section" },
    { name: "Seminar", path: "/seminar-list" },
    { name: "Competition", path: "/competition-list" },
    { name: "Participation", path: "/participation" },
    { name: "Survey", path: "/admin/surveys" },
    { name: "FAQ", path: "/faq" },
    { name: "Support", path: "/support" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              className="bg-gray-100 text-gray-800 font-semibold py-8 px-6 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200 hover:border-gray-400 transition-all text-center border border-gray-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
