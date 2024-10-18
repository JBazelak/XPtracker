
import HomePage from "./pages/HomePage";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from './pages/Dashborad';
import FirstConfig from './pages/FirstConfig'
import CreateTraining from './pages/CreateTraining';
import { useAuthContext } from "./hooks/useAuthContext";
import OverAll from "./components/OverAll";
import Settings from "./components/Settings";
import SkillManager from "./components/SkillManager";


import {
    BrowserRouter, Routes, Route, Navigate
} from "react-router-dom";
import "./index.css"
import TrainingCreator from "./components/TrainingCreator";



const App = () => {
    const { user } = useAuthContext();

    return (<>
        <div className="App"></div>
        <div className="contet">
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
                    </Route>
                    <Route
                        path="first-config"
                        element={<FirstConfig />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    </>

    )
}

export default App;