import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routesConfig, {
  defaultRoutePath,
  notfoundRoutePath,
} from "./routesConfig";
import "../styles/Main.css";

function Main(props) {
  const { isLoggedIn, handleLoggedIn } = props;

  return (
    <div>
      <Routes>
        {routesConfig.map((route, index) => {
          const Component = route.component;
          let routeClass = route.needsBackground ? "main-background" : "";
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <div className={routeClass}>
                  <Component
                    isLoggedIn={isLoggedIn}
                    handleLoggedIn={handleLoggedIn}
                  />
                </div>
              }
            />
          );
        })}
        <Route path="/" element={<Navigate to={defaultRoutePath} />} />
        <Route path="*" element={<Navigate to={notfoundRoutePath} />} />
      </Routes>
    </div>
  );
}

export default Main;
