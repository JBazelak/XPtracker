import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useAddTraining = () => {
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

            const { training, token } = response.data;
            const updatedUser = { 
                ...user, 
                training: [...(user.trainings || []), training] 
            };

            localStorage.setItem('user', JSON.stringify({ ...updatedUser, token }));
            dispatch({ type: 'LOGIN', payload: { ...updatedUser, token } });
        } catch (e) {
            setError(e.response?.data?.error || "Wystąpił nieoczekiwany błąd");
        } finally {
            setIsLoading(false);
        }
    };

    return [ addTraining, isLoading, error ];
};
