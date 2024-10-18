import React from "react";
import { useAuthContext } from '../hooks/useAuthContext';

const OverAll = () => {
    const { user } = useAuthContext();
    if(!user) {return <div>Ładowanie....</div>};
    return (
        <div>
            <h1>Profil użytkownika</h1>
            <p>Login: {user.login}</p>
            <p>Imię: {user.firstName}</p>
            <p>Nazwisko: {user.lastName}</p>
        </div>
    )
}

export default OverAll;