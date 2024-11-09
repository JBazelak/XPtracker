
import HomePage from "./pages/HomePage";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from './pages/Dashborad';
import FirstConfig from './pages/FirstConfig'
import { useAuthContext } from "./hooks/useAuthContext";
import OverAll from "./pages/OverAll";
import Settings from "./pages/Settings";
import SkillManager from "./pages/SkillManager";
import TrainingManager from "./pages/TrainingManager";

import {
    BrowserRouter, Routes, Route, Navigate
} from "react-router-dom";
import "./index.css"
import TrainingCreator from "./pages/TrainingCreator";



const App = () => {
    const { user } = useAuthContext();

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/dashboard" /> : <Login />}
                    />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="dashboard" /> : <Register />}
                    />
                    <Route
                        path="/dashboard"
                        element={user ? <Dashboard /> : <Navigate to="/login" />}
                    >
                        <Route
                            path=""
                            element={<OverAll />}
                        />
                        <Route
                            path="create-training"
                            element={<TrainingCreator />}
                        />
                        <Route
                            path="settings"
                            element={<Settings />}
                        />
                        <Route
                            path="manage-skills"
                            element={<SkillManager />}
                        />
                        <Route
                            path="manage-trainings"
                            element={<TrainingManager />}
                        />
                    </Route>
                    <Route
                        path="first-config"
                        element={<FirstConfig />}
                    />
                </Routes>
            </BrowserRouter>
        </>

    )
}

export default App;