import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (Component, redirectTo) => {
  return (props) => {
    const { isLoggedIn } = props;
    return isLoggedIn ? <Component {...props} /> : <Navigate to={redirectTo} />;
  };
};

const navAuth = (Component, redirectTo) => {
  return (props) => {
    const { isLoggedIn } = props;
    return isLoggedIn ? <Navigate to={redirectTo} /> : <Component {...props} />;
  };
};

export { withAuth, navAuth };
