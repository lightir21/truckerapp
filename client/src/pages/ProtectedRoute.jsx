import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, login }) => {
  if (!login) {
    return <Navigate to="./landing" />;
  }

  return children;
};

export default ProtectedRoute;
