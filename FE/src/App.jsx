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
//Survey
import SurveyList from "./pages/Survey/SurveyList";
import AddSurvey from "./pages/Survey/AddSurvey";
import UpdateSurvey from "./pages/Survey/UpdateSurvey";
import SurveyDetail from "./pages/Survey/SurveyDetail";

import QuestionList from "./pages/SurveyQuestion/SurveyQuestionList";
import AddQuestion from "./pages/SurveyQuestion/AddQuestion";
import UpdateQuestion from "./pages/SurveyQuestion/UpdateQuestion";
import SurveyQuestionDetail from "./pages/SurveyQuestion/SurveyQuestionDetail";

import OptionList from "./pages/SurveyOption/SurveyOptionList";
import AddOption from "./pages/SurveyOption/AddSurveyOption";
import UpdateOption from "./pages/SurveyOption/UpdateSurveyOption";
import SurveyOptionDetail from "./pages/SurveyOption/SurveyOptionDetail";


import StudentList from "./pages/Student/StudentList";
import AddStudent from "./pages/Student/AddStudent";
import StudentDetail from "./pages/Student/StudentDetail";
import UpdateStudent from "./pages/Student/UpdateStudent";
import StaffList from "./pages/Staff/StaffList";
import AddStaff from "./pages/Staff/AddStaff";
import UpdateStaff from "./pages/Staff/UpdateStaff";
import StaffDetail from "./pages/Staff/StaffDetail";
import SeminarList from "./pages/Seminar/SeminarList";
import AddSeminar from "./pages/Seminar/AddSeminar";
import UpdateSeminar from "./pages/Seminar/UpdateSeminar";
import SeminarDetail from "./pages/Seminar/SeminarDetail";
import CompetitionList from "./pages/Competition/CompetitionList";
import CompetitionDetail from "./pages/Competition/CompetitionDetail";
import AddCompetition from "./pages/Competition/AddCompetition";
import UpdateCompetition from "./pages/Competition/UpdateCompetition";




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
          <Route path="/admin/update-class/:klassId" element={<UpdateKlass />}
          />
          <Route path="/admin/admin-list" element={<AdminList />} />
          <Route path="/admin/admin-detail/:id" element={<AdminDetail />} />
          <Route path="/admin/add-admin" element={<AddAdmin />} />
          <Route path="/admin/update-admin/:id" element={<UpdateAdmin />} />
          <Route path="/admin/detail/:id" element={<AdminDetail />} />

          <Route path="/admin/surveys" element={<SurveyList />} />
          <Route path="/admin/add-survey" element={<AddSurvey />} />
          <Route path="/admin/update-survey/:id" element={<UpdateSurvey />} />
          <Route path="/admin/survey-detail/:id" element={<SurveyDetail />} />

          <Route path="/admin/questions" element={<QuestionList />} />
          <Route path="/admin/add-question" element={<AddQuestion />} />
          <Route path="/admin/update-question/:id" element={<UpdateQuestion />} />
          <Route path="/admin/question-detail/:id" element={<SurveyQuestionDetail />} />


          <Route path="/admin/options" element={<OptionList />} />
          <Route path="/admin/add-option" element={<AddOption />} />
          <Route path="/admin/update-option/:id" element={<UpdateOption />} />
          <Route path="/admin/option-detail/:id" element={<SurveyOptionDetail />} />

          <Route path="/admin/staff-list" element={<StaffList />} />
          <Route path="/admin/staff-detail/:id" element={<StaffDetail />} />
          <Route path="/admin/add-staff" element={<AddStaff />} />
          <Route path="/admin/update-staff/:id" element={<UpdateStaff />} />


          <Route path="/admin/student-list" element={<StudentList />} />
          <Route path="/admin/student-detail/:id" element={<StudentDetail />} />
          <Route path="/admin/add-student" element={<AddStudent />} />
          <Route path="/admin/update-student/:id" element={<UpdateStudent />} />

          <Route path="seminar-list" element={<SeminarList />} />
          <Route path="seminar-detail/:id" element={<SeminarDetail />} />
          <Route path="/add-seminar" element={<AddSeminar />} />
          <Route path="/update-seminar/:id" element={<UpdateSeminar />} />

          <Route path="competition-list" element={<CompetitionList />} />
          <Route path="competition-detail/:id" element={<CompetitionDetail />} />
          <Route path="add-competition" element={<AddCompetition />} />
          <Route path="update-competition/:id" element={<UpdateCompetition />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;
