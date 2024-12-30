import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import KlassList from "./pages/Klass/KlassList";
import AddKlass from "./pages/Klass/AddKlass";
import UpdateKlass from "./pages/Klass/UpdateKlass";
import Admin from "./pages/Admin/Admin";
import AdminList from "./pages/Admin/AdminList";
import AdminDetail from "./pages/Admin/AdminDetail";
import AddAdmin from "./pages/Admin/AddAdmin";
import UpdateAdmin from "./pages/Admin/UpdateAdmin";
import UserRequests from "./pages/Admin/UserRequests";

import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex flex-row flex-1">
          {user && (
            <div className="w-64">
              <Sidebar />
            </div>
          )}
          <div className="flex-1 ">
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/admin/classes" element={<KlassList />} />
              <Route path="/admin/add-class" element={<AddKlass />} />
              <Route
                path="/admin/update-class/:klassId"
                element={<UpdateKlass />}
              />

              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/admin-list" element={<AdminList />} />
              <Route path="/admin/add-admin" element={<AddAdmin />} />
              <Route path="/admin/update-admin/:id" element={<UpdateAdmin />} />
              <Route path="/admin/detail/:id" element={<AdminDetail />} />

              <Route path="/admin/user-requests" element={<UserRequests />} />
              {/* <Route path="/admin/user-detail/:id" element={<UserDetail />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
