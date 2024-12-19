import React, { useState } from "react";
import { Layout } from "antd";
import Main from "./Main";
import ResponsiveAppBar from "./utils/ResponsiveAppBar";
import { TOKEN_KEY } from "../constants";
import "../styles/App.css";

const { Header, Footer, Content } = Layout;

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
      <Layout>
        <Header style={{ padding: 0, backgroundColor: "white" }}>
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
