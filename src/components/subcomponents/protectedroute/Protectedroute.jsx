import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Navbar } from "./navbar";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedRoute;