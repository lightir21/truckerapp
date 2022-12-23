import "./dashboard.scss";

import { Navbar } from "../../components";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user-store";
import { useEffect } from "react";
import axios from "axios";

// axios
const authFetch = axios.create({
  baseURL: "/api/v1",
});

const Dashboard = () => {
  const { userData } = useUserStore((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = userData.token;

      const {
        data: { isTrue },
      } = await authFetch.post("/auth/checkAuth", { token });

      if (isTrue) {
        navigate("/");
      } else {
        navigate("/driver");
      }
    };
    checkAuth();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
