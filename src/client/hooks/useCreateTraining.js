import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useCreateTraining = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext(); // Zakładamy, że masz dostęp do zalogowanego użytkownika

    const createTraining = async (time, goals, skillId) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/trainings", {
                time,
                goals,
                skill: skillId,
                user: user._id, // Dodaj ID użytkownika
            });

            setIsLoading(false);
            return response.data; // Możesz zwrócić dane treningu, jeśli chcesz
        } catch (e) {
            setIsLoading(false);
            setError(e.response.data.error);
        }
    };

    return { createTraining, isLoading, error };
};
