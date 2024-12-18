import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = localStorage.getItem("userSession");

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default AuthGuard;
