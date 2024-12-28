import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import KlassList from "./pages/Klass/KlassList";
import AddKlass from "./pages/Klass/AddKlass";
import UpdateKlass from "./pages/Klass/UpdateKlass";
import RegisterPage from "./pages/Register/RegisterPage";
import AdminList from "./pages/Admin/AdminList";
import AdminDetail from "./pages/Admin/AdminDetail";
import AddAdmin from "./pages/Admin/AddAdmin";
import UpdateAdmin from "./pages/Admin/UpdateAdmin";
import SurveyList from "./pages/Survey/SurveyList";
import AddSurvey from "./pages/Survey/AddSurvey";
import UpdateSurvey from "./pages/Survey/UpdateSurvey";
import SurveyQList from "./pages/SurveyOption/SurveyQuestionList";


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
          <Route path="/admin/admin-list" element={<AdminList />} />
          <Route path="/admin/add-admin" element={<AddAdmin />} />
          <Route path="/admin/update-admin/:id" element={<UpdateAdmin />} />
          <Route path="/admin/detail/:id" element={<AdminDetail />} />

          <Route path="/admin/surveys" element={<SurveyList />} />
          <Route path="/admin/add-survey" element={<AddSurvey />} />
          <Route path="/admin/update-survey/:id" element={<UpdateSurvey />} />

          <Route path="/admin/questions" element={<SurveyQList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
