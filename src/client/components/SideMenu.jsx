import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';


const SideMenu = () => {
    const {logout} = useLogout();
    const navigate = useNavigate();

    const handleClick = () => {
        logout();
        navigate('/');
      }
    

    return (
        <div className="sidebar">
            <Link to="/dashboard" className="sidebar-item">
                <span className="icon">🏠</span>
                <span className="text">Podsumowanie</span>
            </Link>
            <Link to="/dashboard/settings" className="sidebar-item">
                <span className="icon">⚙️</span>
                <span className="text">Ustawienia</span>
            </Link>
            <Link to="/dashboard/manage-skills" className="sidebar-item">
                <span className="icon">📚</span>
                <span className="text">Zarządzaj umiejętnościami</span>
            </Link>
            <Link to="/dashboard/create-training" className="sidebar-item">
                <span className="icon">📅</span>
                <span className="text">Zaplanuj trening</span>
            </Link>
            <Link to="/dashboard/manage-trainings" className="sidebar-item">
                <span className="icon">📅</span>
                <span className="text">Twoje treningi</span>
            </Link>
            <button onClick={handleClick} >Wyloguj</button>
        </div>
    );
};

export default SideMenu;
