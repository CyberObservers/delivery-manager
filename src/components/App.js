import React, { useState } from "react";
import Main from "./Main";
import ResponsiveAppBar from "./utils/ResponsiveAppBar";
import { TOKEN_KEY } from "../constants";
import "../styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(TOKEN_KEY) ? true : false
  );

  const loggedIn = (token, role) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <ResponsiveAppBar isLoggedIn={isLoggedIn} handleLogout={logout} />
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
    </div>
  );
}

export default App;
