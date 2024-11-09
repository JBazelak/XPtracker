import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import useGoals from '../hooks/useGoals';
import Dialog from './Dialog';

const Training = ({ selectedSkill, goals = [], index, onDelete, onCompleate, trainingId }) => {
    const { completedGoals, handleGoalToggle, progress } = useGoals(goals, trainingId);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentGoalId, setCurrentGoalId] = useState(null);

    const openDialog = (goalId) => {
        setCurrentGoalId(goalId);
        setIsDialogOpen(true);
    };

    const confirmGoalCompletion = () => {
        handleGoalToggle(currentGoalId);
        setIsDialogOpen(false);
        setCurrentGoalId(null);
    };

    const cancelGoalCompletion = () => {
        setIsDialogOpen(false);
        setCurrentGoalId(null);
    };

    return (
        <div className="training-box">
            <h2>Trening {index + 1}</h2>
            <p>Rozwijana umiejętność: {selectedSkill}</p>
            <h2>Cele:</h2>
            <ul>
                {completedGoals.map((goal) => (
                    <li key={goal._id}>
                        <input 
                            type="checkbox" 
                            checked={goal.isAchived} 
                            onChange={() => openDialog(goal._id)} 
                        />
                        {goal.goalName}
                    </li>
                ))}
            </ul>
            <ProgressBar percentage={progress} />
            <button onClick={onDelete}>Usuń</button>
            <button disabled={progress !== 100} onClick={onCompleate}>Zakończ</button>

            <Dialog 
                isOpen={isDialogOpen}
                message="Czy na pewno chcesz zmienić status tego celu?"
                onConfirm={confirmGoalCompletion}
                onCancel={cancelGoalCompletion}
            />
        </div>
    );
};

export default Training;
