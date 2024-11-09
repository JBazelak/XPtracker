import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useTrainings = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const { dispatch } = useAuthContext();

    const addTraining = async (trainingData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `/api/users/${user._id}/training/`,
                trainingData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            console.log("Training added:", response.data);

            const { updatedUser, token } = response.data;
            updatedUser.token = token;
            console.log(updatedUser);
            localStorage.setItem('user', JSON.stringify({ ...updatedUser }));
            dispatch({ type: 'LOGIN', payload: { ...updatedUser } });
        } catch (e) {
            setError(e.response?.data?.error || "Wystąpił nieoczekiwany błąd");
        } finally {
            setIsLoading(false);
        }
    };

    const removeTraining = async (trainingId) => {
        setIsLoading(true);
        setError(null);

        try {
            await axios.delete(
                `/api/users/${user._id}/training/${trainingId}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            const updatedTrainings = user.trainings.filter((training) => training._id !== trainingId);
            const updatedUser = { ...user, trainings: updatedTrainings };

            localStorage.setItem('user', JSON.stringify(updatedUser));
            dispatch({ type: 'LOGIN', payload: updatedUser });
        } catch (e) {
            setError(e.response?.data?.error || "Wystąpił nieoczekiwany błąd");
        } finally {
            setIsLoading(false);
        }
    };

    const updateTrainingsStatus = async (trainingId, selectedSkill) => {
        setIsLoading(true);  
        setError(null);     

        try {

            const response = await axios.patch(
                `/api/users/${user._id}/training/${trainingId}`,
                { selectedSkill },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            const {updatedUser, token} = response.data;
            updatedUser.token = token;
            localStorage.setItem('user', JSON.stringify({...updatedUser}));
            dispatch({ type: 'LOGIN', payload: {...updatedUser} });


        } catch (error) {
            setError("Wystąpił błąd podczas aktualizacji treningu.");
            console.error("Błąd aktualizacji treningu:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return { addTraining, removeTraining, updateTrainingsStatus, isLoading, error };
};
