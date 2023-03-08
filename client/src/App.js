import {
  LandingPage,
  ProtectedRoute,
  AdminProfile,
  Dashboard,
  DriversDashboard,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AddNewDriver,
  AdminDriverTaskManager,
  DriversList,
  DriverTaskManager,
  ErrorPage,
  LoadingSpinner,
} from "./components";
import { useUserStore } from "./store/user-store";
import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { checkAuth, userData, logoutUser } = useUserStore();

  useEffect(() => {
    const adminStatusSetter = async () => {
      if (userData?.user) {
        setLoading(true);
        const status = await checkAuth();

        if (status === undefined) {
          logoutUser();
        }
        setUserStatus(status);
        setLoading(false);
      }
    };
    adminStatusSetter();
  }, [userData]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute
                userStatus={userStatus && userStatus}
                allowedRole={200}
              />
            }
          >
            <Route path="/" element={<Dashboard />}>
              <Route index element={<DriversList />} />
              <Route path="/driver/:id" element={<AdminDriverTaskManager />} />
              <Route path="/addNewDriver" element={<AddNewDriver />} />
              <Route path="/profile" element={<AdminProfile />} />
            </Route>
          </Route>

          <Route
            element={
              <ProtectedRoute
                userStatus={userStatus && userStatus}
                allowedRole={201}
              />
            }
          >
            <Route path="driver" element={<DriversDashboard />}>
              <Route index element={<DriverTaskManager />} />
            </Route>
          </Route>

          <Route
            path="landing"
            element={<LandingPage userStatus={userStatus} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer
          position="top-center"
          rtl={true}
          style={{ fontSize: "2rem" }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
