import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routesConfig, { defaultRoutePath } from "./routesConfig";

function Main(props) {
  const { isLoggedIn, handleLoggedIn } = props;

  return (
    <div>
      <Routes>
        {routesConfig.map((route, index) => {
          const Component = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Component
                  isLoggedIn={isLoggedIn}
                  handleLoggedIn={handleLoggedIn}
                />
              }
            />
          );
        })}
        <Route path="/" element={<Navigate to={defaultRoutePath} />} />
      </Routes>
    </div>
  );
}

export default Main;
