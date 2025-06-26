import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import RoleRedirect from "./route/RoleRedirect";

const ManagerPanel = () => <div>Yönetici Paneli</div>;
const EmployeePanel = () => <div>Çalışan Paneli</div>;
const HomePage = () => (
  <div>Ana Sayfa (Giriş yapınca buraya yönlendirilir)</div>
);
const NotFound = () => <div>404 - Sayfa Bulunamadı</div>;

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <RoleRedirect />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager"
            element={
              <PrivateRoute allowedRoles={["ROLE_MANAGER"]}>
                <ManagerPanel />
              </PrivateRoute>
            }
          />

          <Route
            path="/employee"
            element={
              <PrivateRoute allowedRoles={["ROLE_EMPLOYEE"]}>
                <EmployeePanel />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
