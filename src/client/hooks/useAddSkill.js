import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";


export const useAddSkill = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const { dispatch } = useAuthContext();

    const addSkill = async (skillName) => {
        setIsLoading(true);
        setError(null);

        await axios.post(`/api/users/${user._id}/skills/${skillName}`, {},
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })

            .then((response) => {
                console.log("Skill added:", response.data);
                const { updatedUser, token } = response.data;
                console.log("Nuser ", updatedUser)
                localStorage.setItem('user', JSON.stringify({...updatedUser, token }));
                dispatch({ type: 'LOGIN', payload: { ...updatedUser, token} });
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                setError(e.response.data.error);
            })
    };

    return { addSkill, isLoading, error };
};
