import {
  LandingPage,
  ProtectedRoute,
  AdminProfile,
  Dashboard,
  DriversDashboard,
} from "./pages";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  AddNewDriver,
  AdminDriverTaskManager,
  DriversList,
  DriverTaskManager,
} from "./components";
import { useUserStore } from "./store/user-store";
import React, { useEffect } from "react";
import { useState } from "react";

function App() {
  const [userStatus, setUserStatus] = useState(null);
  const { checkAuth, userData } = useUserStore();

  useEffect(() => {
    const adminStatusSetter = async () => {
      if (userData?.user) {
        const status = await checkAuth();
        setUserStatus(status);
      }
    };
    adminStatusSetter();
  }, [userData]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute
                userStatus={userStatus ? userStatus : ""}
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
                userStatus={userStatus ? userStatus : ""}
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
