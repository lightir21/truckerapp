import { Dashboard, LandingPage, ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  AddNewDriver,
  AdminDriverTaskManager,
  DriversList,
} from "./components";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DriversList />} />
            <Route path="/driver/:id" element={<AdminDriverTaskManager />} />
            <Route path="/addNewDriver" element={<AddNewDriver />} />
          </Route>
          <Route path="landing" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
