import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
import Order from "./Order";
import Profile from "./Profile";
import Register from "./Register";

function Main(props) {
    const { isLoggedIn, handleLoggedIn } = props;
};

export default Main;
