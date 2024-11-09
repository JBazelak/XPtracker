import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const useGoals = (initialGoals, trainingId) => {
    const { user, dispatch } = useAuthContext();
    const [completedGoals, setCompletedGoals] = useState(
        initialGoals.map(goal => ({ ...goal, isAchived: goal.isAchived || false }))
    );
    const [progress, setProgress] = useState(0);

    const calculateProgress = useCallback(() => {
        const completedCount = completedGoals.filter(goal => goal.isAchived).length;
        return Math.round((completedCount / initialGoals.length) * 100);
    }, [completedGoals, initialGoals.length]);

    // Zaktualizowany efekt obliczania progresu
    useEffect(() => {
        setProgress(calculateProgress());
    }, [completedGoals, calculateProgress]);

    const updateGoalInState = useCallback((goalId, isAchived) => {
        setCompletedGoals(prevGoals =>
            prevGoals.map(g => g._id === goalId ? { ...g, isAchived } : g)
        );
    }, []);

    const updateProgressInDatabase = useCallback(async (goalId, isAchived) => {
        try {
            const newProgress = calculateProgress();
            const response = await axios.patch(
                `/api/users/${user._id}/training/${trainingId}/goals/${goalId}/`,
                { isAchived, progress: newProgress },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    },
                    timeout: 5000
                }
            );

            const { updatedUser, token } = response.data;
            localStorage.setItem('user', JSON.stringify({ ...updatedUser, token }));
            dispatch({ type: 'LOGIN', payload: { ...updatedUser, token } });
        } catch (error) {
            console.error("Błąd aktualizacji celu:", error);
            updateGoalInState(goalId, !isAchived); // Przywrócenie poprzedniego stanu przy błędzie
        }
    }, [user, trainingId, dispatch, calculateProgress, updateGoalInState]);

    const handleGoalToggle = useCallback(async (goalId) => {
        const goal = completedGoals.find(g => g._id === goalId);
        if (!goal) return;

        const newAchievedStatus = !goal.isAchived;
        updateGoalInState(goalId, newAchievedStatus);
        await updateProgressInDatabase(goalId, newAchievedStatus);
    }, [completedGoals, updateGoalInState, updateProgressInDatabase]);

    return {
        completedGoals,
        handleGoalToggle,
        progress
    };
};

export default useGoals;
