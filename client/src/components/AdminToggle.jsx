import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Dashboard, DriversDashboard } from "../pages";

// axios
const authFetch = axios.create({
  baseURL: "/api/v1",
});

const AdminToggle = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { status } = await authFetch.post("/auth/checkAuth");

        status && setAdmin(status === 200);
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, []);

  if (admin) {
    return <Dashboard />;
  } else {
    return <DriversDashboard />;
  }
};
export default AdminToggle;
