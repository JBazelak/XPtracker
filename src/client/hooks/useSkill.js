import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSkill = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user, dispatch } = useAuthContext();

    const manageSkill = async (skillName, method) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios({
                method,
                url: `/api/users/${user._id}/skills/${skillName}`,
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            const {updatedUser} = response.data
            updatedUser.accessToken = user.accessToken

            localStorage.setItem('user', JSON.stringify({ ...updatedUser }));
            dispatch({ type: 'LOGIN', payload: { ...updatedUser } });
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            setError(e.response ? e.response.data.error : `Błąd ${method === 'POST' ? 'dodawania' : 'usuwania'} umiejętności`);
        }
    };

    const addSkill = (skillName) => manageSkill(skillName, 'POST');
    const deleteSkill = (skillName) => manageSkill(skillName, 'DELETE');

    return { addSkill, deleteSkill, isLoading, error };
};
