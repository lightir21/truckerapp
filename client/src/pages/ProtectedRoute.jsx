import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user-store";

const ProtectedRoute = ({ userStatus, allowedRole }) => {
  const { userData } = useUserStore();

  const navigate = useNavigate();
  useEffect(() => {
    !userData?.user && navigate("/landing");
  }, [userData, navigate]);

  return userStatus === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to="/landing" replace />
  );
};

export default ProtectedRoute;
