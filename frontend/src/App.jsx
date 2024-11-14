import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

import LoadingSpinner from "./components/LoadingSpiner";
import { useAuthStore } from "./store/authStore";

import SingleStudyPage from "./pages/SingleStudyPage";
import EditStudyPage from "./pages/EditStudyPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyStudies from "./pages/MyStudies";
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
        <Route path="/" element={<Homepage />} />

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

        <Route
          path="/new-study"
          element={
            <ProtectedRoute>
              <NewStudy />
            </ProtectedRoute>
          }
        />

        <Route path="/study/:id" element={<SingleStudyPage />} />

        <Route
          path="/study/edit/:id"
          element={
            <ProtectedRoute>
              <EditStudyPage />
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
          path="/my-studies"
          element={
            <ProtectedRoute>
              <MyStudies />
            </ProtectedRoute>
          }
        />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
