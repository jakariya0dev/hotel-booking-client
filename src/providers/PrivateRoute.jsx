import { use } from "react";
import { Navigate, useLocation } from "react-router";
import LoaderBar from "./../components/common/LoaderBar.jsx";
import { AuthContext } from "./AuthProvider.jsx";

export default function PrivateRoute({ children }) {
  const { user, isLoading } = use(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <LoaderBar />;
  }

  return user ? children : <Navigate state={location.pathname} to="/login" />;
}
