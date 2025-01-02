/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import your page components
import { getToken } from "@/services/jwt";
import { StudentLogin } from "@/pages/student/StudentLogin";
import { AdminLogin } from "@/pages/admin/AdminLogin";
import { ExamPage } from "@/pages/student/Exampage";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { NotFound } from "@/pages/NotFound";
import StudentLayout from "@/layouts/StudentLayout";
import AdminLayout from "@/layouts/AdminLayout";
import { ExamsPage } from "@/pages/admin/ExamsPage";
import { StudentsPage } from "@/pages/admin/StudentsPage";
import { QuestionsPage } from "@/pages/admin/QuestionsPage";
import { ResultsPage } from "@/pages/admin/ResultsPage";
import { AddQuestionPage } from "@/pages/admin/AddQuestionPage";
import { AddStudentPage } from "@/pages/admin/AddStudentPage";
import { AddExamPage } from "@/pages/admin/AddExamPage";

// Private Route wrapper to check authentication
const PrivateRoute = ({ children }) => {
  const token = getToken();
  const role = token ? token.role : null;

  return token ? (
    children
  ) : role === "admin" ? (
    <Navigate to="/login/admin" replace />
  ) : (
    <Navigate to="/login/student" replace />
  );
};

// App Router Component
const AppRouter = () => {
  const token = getToken();
  const role = token ? token.role : null;

  // console.log(token, role);

  return (
    <Router>
      <Routes>
        {/* Login Routes with verification that user is not already logged in */}
        <Route
          path="/login/student"
          element={
            token && role === "admin" ? (
              <Navigate to="/student/exam" replace />
            ) : (
              <StudentLogin />
            )
          }
        />
        <Route
          path="/login/admin"
          element={
            token ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/"
          element={
            <PrivateRoute>
              <StudentLayout />
            </PrivateRoute>
          }
        >
          <Route path="exam" element={<ExamPage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin/"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="exams" element={<ExamsPage />} />
          <Route path="add-exam" element={<AddExamPage />} />
          <Route path="edit-exam" element={<AddExamPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="add-student" element={<AddStudentPage />} />
          <Route path="edit-student" element={<AddStudentPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="add-question" element={<AddQuestionPage />} />
          <Route path="edit-question" element={<AddQuestionPage />} />
          <Route path="results" element={<ResultsPage />} />
        </Route>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login/student" replace />} />

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
