import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useDeleteSkill = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const { dispatch } = useAuthContext();

    const deleteSkill = async (skillName) => {
        setIsLoading(true);
        setError(null);

        await axios.delete(`/api/users/${user._id}/skills/${skillName}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            .then((response) => {
                const { updatedUser, token } = response.data;
                localStorage.setItem('user', JSON.stringify({ ...updatedUser, token }));
                dispatch({ type: 'LOGIN', payload: { ...updatedUser, token } });
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.response ? e.response.data.error : 'Błąd usuwania umiejętności');
            });
    };

    return { deleteSkill, isLoading, error };
};
