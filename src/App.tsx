import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import BandejaScreen from "./BandejaScreen";
import { useAuthStore } from "./store/authStore";

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginScreen />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <BandejaScreen /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
