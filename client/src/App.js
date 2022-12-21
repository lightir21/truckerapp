import { Dashboard, LandingPage, ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
  AddNewDriver,
  AdminDriverTaskManager,
  DriversList,
} from "./components";

function App() {
  //testing purposes
  const [login, setLogin] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute login={login}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DriversList />} />
            <Route path="/driver/:id" element={<AdminDriverTaskManager />} />
            <Route path="/addNewDriver" element={<AddNewDriver />} />
          </Route>
          <Route path="landing" element={<LandingPage setLogin={setLogin} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
