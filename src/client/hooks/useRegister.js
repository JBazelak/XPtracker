import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const register = async (login, firstName, lastName, password, passwordCheck) => {
        setIsLoading(true);
        setError(null);

        await axios.post("/api/users/register", {
            login: login,
            firstName: firstName,
            lastName: lastName,
            password: password,
            passwordCheck: passwordCheck
        })
            .then(response => {
                const { user, accessToken } = response.data;

                localStorage.setItem('user', JSON.stringify({
                    ...user,
                    accessToken
                }));
                dispatch({ type: 'LOGIN', payload: { ...user, accessToken } });
                setIsLoading(false);
            })
            .catch(e => {
                setIsLoading(false);
                setError(e.response.data.error);
            });
    };
    return { register, isLoading, error };
};
