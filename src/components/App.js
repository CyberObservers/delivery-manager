import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Main from "./Main";
import ResponsiveAppBar from "./utils/ResponsiveAppBar";
import { TOKEN_KEY } from "../constants";
import "../styles/App.css";

const { Header, Footer, Content } = Layout;

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&language=en`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  
    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
      <Layout>
        <Header style={{ padding: 0, backgroundColor: "inherit" }}>
          <ResponsiveAppBar isLoggedIn={isLoggedIn} handleLogout={logout} />
        </Header>
        <Content>
          <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
          Delivery App Created by Delivery Team
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
