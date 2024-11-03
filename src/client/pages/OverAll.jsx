import React from "react";
import { useAuthContext } from '../hooks/useAuthContext';

const OverAll = () => {
    const { user } = useAuthContext();
    if (!user) { return <div>Ładowanie....</div>; }
    
    return (
        <div>
            <h1>Profil użytkownika</h1>
            <p>Login: {user.login}</p>
            <p>Imię: {user.firstName}</p>
            <p>Nazwisko: {user.lastName}</p>
            <div>
                <h2>Lista treningów</h2>
                {user.trainings.map((training, index) => (
                    <div key={training._id} className="training">
                        <h3>Trening {index + 1}</h3>
                        <p>Wybrana umiejętność: {training.selectedSkill}</p>
                        <p>Całkowite doświadczenie: {training.totalExp}</p>
                        <h4>Cele:</h4>
                        {training.goals && training.goals.length > 0 ? ( // Sprawdzamy istnienie `training.goals`
                            <ul>
                                {training.goals.map((goal, i) => (
                                    <div key={goal._id}>
                                        <li>{goal.goalName}</li>
                                        <li>
                                            {goal.isAchived ? 'Cel osiągnięty' : 'Cel nieosiągnięty'}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <p>Brak celów do wyświetlenia.</p>
                        )}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OverAll;
