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

            const { updatedUser, token } = response.data;
            updatedUser.token = token;
            console.log(updatedUser)
            localStorage.setItem('user', JSON.stringify({ ...updatedUser }));
            dispatch({ type: 'LOGIN', payload: { ...updatedUser } });
        } catch (e) {
            setError(e.response?.data?.error || "Wystąpił nieoczekiwany błąd");
        } finally {
            setIsLoading(false);
        }
    };

    return [ addTraining, isLoading, error ];
};
