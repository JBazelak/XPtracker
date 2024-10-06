
import HomePage from "./pages/HomePage";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";
import Desktop from './pages/Desktop';
import {
    BrowserRouter, Routes, Route, Navigate
} from "react-router-dom";
import "./index.css"

import { useAuthContext } from "./hooks/useAuthContext";


const App = () => {
    const { user } = useAuthContext();

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/desktop"/> : <Login />}
                    />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="desktop"/> : <Register />}
                    />
                    <Route
                        path="/desktop"
                        element={user ? <Desktop/> : <Navigate to="/login" />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;