import { useContext } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import Authentication from "../store/auth-context";

const RequireAuth = (props) => {
  const navigate = useNavigate();
  const { auth } = useContext(Authentication);
  const location = useLocation();
  // console.log(auth, "auth  call hua hai");
  if (auth.name == undefined || !auth.name) {
    // console.log("is not auth ");
    // navigate("/login");
    return <Navigate to="/login" replace />;
  }
  return props.children;
  //   return (
  //     <>{auth.user ? <>{props.children}</> : <Navigate to="/login" replace />}</>
  //   );
};

export default RequireAuth;
