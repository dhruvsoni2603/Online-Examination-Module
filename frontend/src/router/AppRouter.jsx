/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import your page components
import { AuthProvider } from "@/context/AuthContext";
import { getRole, getToken, hasToken } from "@/services/jwt";
import { StudentLogin } from "@/pages/student/StudentLogin";
import { AdminLogin } from "@/pages/admin/AdminLogin";
import { ExamPage } from "@/pages/student/Exampage";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { NotFound } from "@/pages/NotFound";
import StudentLayout from "@/layouts/StudentLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Private Route wrapper to check authentication
const PrivateRoute = ({ children }) => {
  const token = getToken(); // Check if JWT token exists
  return token ? children : <Navigate to="/login" replace />;
};

// App Router Component
const AppRouter = () => {

  const token = hasToken();
  const role = getRole();

  console.log(token, role);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login Routes */}
          <Route
            path="/login/student"
            element={token && role === "STUDENT" ? <Navigate to="/student/exam" replace /> : <StudentLogin />}
          />
          <Route
            path="/login/admin"
            element={token && role === "ADMIN" ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />}
          />

          {/* Student Routes */}
          <Route
            path="/student/*"
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
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login/student" replace />} />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
