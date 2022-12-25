import "./dashboard.scss";

import { Navbar } from "../../components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
