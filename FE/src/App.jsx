import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
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
import UserRequests from "./pages/Admin/UserRequests";
import UserDetail from "./pages/Admin/UserDetail";
import Dashboard from "./pages/Dashboard/Dashboard";

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

import FaqList from "./pages/Faq/FaqList";
import AddFaq from "./pages/Faq/AddFaq";
import UpdateFaq from "./pages/Faq/UpdateFaq";

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
import AddParticipation from "./pages/Participation/AddParticipation";
import ParticipationDetail from "./pages/Participation/ParticipationDetail";
import ParticipationList from "./pages/Participation/ParticipationList";
import UpdateParticipation from "./pages/Participation/UpdateParticipation";

import ResponseList from "./pages/Response/ResponseList";
import ResponseDetail from "./pages/Response/ResponseDetail";
import AddResponse from "./pages/Response/AddResponse";
import UpdateResponse from "./pages/Response/UpdateResponse";

import SupportList from "./pages/Support/SupportList";
import SupportDetail from "./pages/Support/SupportDetail";
import AddSupport from "./pages/Support/AddSupport";
import UpdateSupport from "./pages/Support/UpdateSupport";

import { useEffect, useState } from "react";
import SectionList from "./pages/Section/SectionList";
import AddSection from "./pages/Section/AddSection";
import UpdateSection from "./pages/Section/UpdateSection";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />

          <div className="flex flex-row flex-1">
            <div className="w-64">
              <Sidebar />
            </div>
            <div className="flex-1 ">
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/classes" element={<KlassList />} />
                <Route path="/add-class" element={<AddKlass />} />
                <Route
                  path="/update-class/:klassId"
                  element={<UpdateKlass />}
                />
                <Route path="/admin/sections" element={<SectionList />} />
                <Route path="/admin/add-section" element={<AddSection />} />
                <Route
                  path="/admin/update-section/:sectionId"
                  element={<UpdateSection />}
                />

                <Route path="/sections" element={<SectionList />} />
                <Route path="/add-section" element={<AddSection />} />
                <Route
                  path="/update-section/:sectionId"
                  element={<UpdateSection />}
                />

                <Route path="/admin/user-requests" element={<UserRequests />} />
                <Route path="/admin/user-detail/:id" element={<UserDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/admin/admin-list" element={<AdminList />} />
                <Route
                  path="/admin/admin-detail/:id"
                  element={<AdminDetail />}
                />
                <Route path="/admin/add-admin" element={<AddAdmin />} />
                <Route
                  path="/admin/update-admin/:id"
                  element={<UpdateAdmin />}
                />
                <Route path="/admin/detail/:id" element={<AdminDetail />} />
                {/* Survey */}
                <Route path="/surveys" element={<SurveyList />} />
                <Route path="/add-survey" element={<AddSurvey />} />
                <Route path="/update-survey/:id" element={<UpdateSurvey />} />
                <Route path="/survey-detail/:id" element={<SurveyDetail />} />
                {/* SurveyQuestion */}
                <Route path="/admin/questions" element={<QuestionList />} />

                <Route path="/admin/add-question" element={<AddQuestion />} />
                <Route
                  path="/admin/update-question/:id"
                  element={<UpdateQuestion />}
                />
                <Route
                  path="/admin/question-detail/:id"
                  element={<SurveyQuestionDetail />}
                />

                <Route path="/questions" element={<QuestionList />} />
                <Route path="/add-question" element={<AddQuestion />} />
                <Route
                  path="/update-question/:id"
                  element={<UpdateQuestion />}
                />
                <Route
                  path="/question-detail/:id"
                  element={<SurveyQuestionDetail />}
                />

                {/* SurveyOption */}
                <Route path="/admin/options" element={<OptionList />} />
                <Route path="/admin/add-option" element={<AddOption />} />
                <Route
                  path="/admin/update-option/:id"
                  element={<UpdateOption />}
                />
                <Route
                  path="/admin/option-detail/:id"
                  element={<SurveyOptionDetail />}
                />

                <Route path="/options" element={<OptionList />} />
                <Route path="/add-option" element={<AddOption />} />
                <Route path="/update-option/:id" element={<UpdateOption />} />
                <Route
                  path="/option-detail/:id"
                  element={<SurveyOptionDetail />}
                />

                {/* Faq */}
                <Route path="/faqs" element={<FaqList />} />
                <Route path="/admin/add-faq" element={<AddFaq />} />
                <Route path="/admin/update-faq/:id" element={<UpdateFaq />} />

                <Route path="/staff-list" element={<StaffList />} />
                <Route path="/staff-detail/:id" element={<StaffDetail />} />
                <Route path="/admin/add-staff" element={<AddStaff />} />
                <Route
                  path="/admin/update-staff/:id"
                  element={<UpdateStaff />}
                />

                {/* Student */}
                <Route path="/student-list" element={<StudentList />} />
                <Route path="/student-detail/:id" element={<StudentDetail />} />
                <Route path="/admin/add-student" element={<AddStudent />} />
                <Route
                  path="/admin/update-student/:id"
                  element={<UpdateStudent />}
                />

                <Route path="/seminar-list" element={<SeminarList />} />
                <Route path="/seminar-detail/:id" element={<SeminarDetail />} />
                <Route path="/add-seminar" element={<AddSeminar />} />
                <Route path="/update-seminar/:id" element={<UpdateSeminar />} />

                <Route path="/competition-list" element={<CompetitionList />} />
                <Route
                  path="/competition-detail/:id"
                  element={<CompetitionDetail />}
                />
                <Route path="/add-competition" element={<AddCompetition />} />
                <Route
                  path="/update-competition/:id"
                  element={<UpdateCompetition />}
                />

                <Route
                  path="/participation-list"
                  element={<ParticipationList />}
                />
                <Route
                  path="/participation-detail/:id"
                  element={<ParticipationDetail />}
                />
                <Route
                  path="/add-participation"
                  element={<AddParticipation />}
                />
                <Route
                  path="/update-participation/:id"
                  element={<UpdateParticipation />}
                />

                {/* Response Routes */}
                <Route path="/response-list" element={<ResponseList />} />
                <Route
                  path="/response-detail/:id"
                  element={<ResponseDetail />}
                />
                <Route path="/add-response" element={<AddResponse />} />
                <Route
                  path="/update-response/:id"
                  element={<UpdateResponse />}
                />

                {/* Support Routes */}
                <Route path="/support-list" element={<SupportList />} />
                <Route path="/support-detail/:id" element={<SupportDetail />} />
                <Route path="/add-support" element={<AddSupport />} />
                <Route path="/update-support/:id" element={<UpdateSupport />} />

                <Route path="/seminar-list" element={<SeminarList />} />
                <Route path="/seminar-detail/:id" element={<SeminarDetail />} />
                <Route path="/add-seminar" element={<AddSeminar />} />
                <Route path="/update-seminar/:id" element={<UpdateSeminar />} />

                <Route path="/competition-list" element={<CompetitionList />} />
                <Route
                  path="/competition-detail/:id"
                  element={<CompetitionDetail />}
                />
                <Route path="/add-competition" element={<AddCompetition />} />
                <Route
                  path="/update-competition/:id"
                  element={<UpdateCompetition />}
                />

                {/*/Student */}

                <Route path="/student/seminar-list" element={<SeminarList />} />
                <Route
                  path="/student/competition-list"
                  element={<CompetitionList />}
                />
                <Route
                  path="/student/participation-list"
                  element={<ParticipationList />}
                />
                <Route path="/survey-list" element={<SurveyList />} />

                {/*/Staff */}
                <Route path="/staff/seminar-list" element={<SeminarList />} />
                <Route
                  path="/staff/competition-list"
                  element={<CompetitionList />}
                />
                <Route
                  path="/staff/participation-list"
                  element={<ParticipationList />}
                />
                <Route path="/staff/student-list" element={<StudentList />} />
                <Route path="/staff/staff-list" element={<StaffList />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
