import { LandingPage, AdminProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AddNewDriver,
  AdminDriverTaskManager,
  DriversList,
} from "./components";
import AdminToggle from "./components/AdminToggle";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AdminProtectedRoute>
                <AdminToggle />
              </AdminProtectedRoute>
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
