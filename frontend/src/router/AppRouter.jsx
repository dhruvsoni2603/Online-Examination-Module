/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import your page components
import { getRole, getToken } from "@/services/jwt";
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
import { LoginForm } from "@/components/Login";
import { SingleResultPage } from "@/pages/admin/SingleResultPage";

// Private Route wrapper to check authentication and role
const PrivateRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  }

  return children;
};

// App Router Component
const AppRouter = () => {
  const token = getToken();
  const role = getRole();

  // console.log(token, role);

  return (
    <Router>
      <Routes>
        {/* Login Routes with verification that user is not already logged in */}
        <Route
          path="/login"
          element={
            token && role === "student" ? (
              <Navigate to="/student/exam" />
            ) : token && role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <LoginForm />
            )
          }
        />

        {/* Student Routes */}
        <Route
          path="/student/"
          element={
            <PrivateRoute allowedRoles={["student"]}>
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
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="exams" element={<ExamsPage />} />
          <Route path="create-exam" element={<AddExamPage />} />
          <Route path="edit-exam" element={<AddExamPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="add-student" element={<AddStudentPage />} />
          <Route path="edit-student" element={<AddStudentPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="add-question" element={<AddQuestionPage />} />
          <Route path="edit-question" element={<AddQuestionPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="results/:id" element={<SingleResultPage />} />
        </Route>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/*" element={<NotFound />} />
        <Route path="/student/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;