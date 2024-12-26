import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import KlassList from "./pages/Klass/KlassList";
import AddKlass from "./pages/Klass/AddKlass";
import UpdateKlass from "./pages/Klass/UpdateKlass";
import RegisterPage from "./pages/Register/RegisterPage";


function App() {
  return (
    <>
      <Router>
        <Header />
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
