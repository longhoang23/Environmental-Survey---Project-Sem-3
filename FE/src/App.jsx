import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import KlassList from "./pages/KlassList";
import AddKlass from "./components/Klass/AddKlass";
import UpdateKlass from "./components/Klass/UpdateKlass";

import "./App.css";

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
