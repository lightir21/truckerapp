import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";

const DriversDashboard = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default DriversDashboard;
