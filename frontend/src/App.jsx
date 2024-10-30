import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

import LoadingSpinner from "./components/LoadingSpiner";
import { useAuthStore } from "./store/authStore";
import Homepage from "./pages/Homepage";
import NewStudy from "./pages/NewStudy";
import AboutMe from "./pages/AboutMe";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-me"
          element={
            <ProtectedRoute>
              <AboutMe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-study"
          element={
            <ProtectedRoute>
              <NewStudy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
    </>
  );
}

export default App;
