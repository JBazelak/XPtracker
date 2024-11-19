import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();


    const login = async (login, password) => {

        setIsLoading(true);
        setError(false);

        await axios.post('/api/users/login', {
            login: login,
            password: password
        })
            .then(response => {
                const { user, accessToken } = response.data;
                localStorage.setItem('user', JSON.stringify({
                    ...user,
                    accessToken
                }));
                dispatch({ type: "LOGIN", payload: { ...user, accessToken } })
                setIsLoading(false);
            })
            .catch(e => {
                setIsLoading(false);
                setError(e.response.data.error);
            })

    };

    return { login, error, isLoading };

};
