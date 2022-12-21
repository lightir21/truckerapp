import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/user-store";

const ProtectedRoute = ({ children }) => {
  const { userData } = useUserStore((state) => state);
  if (!userData.user) {
    return <Navigate to="./landing" />;
  }

  return children;
};

export default ProtectedRoute;
