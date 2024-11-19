import { useAuthContext } from "./useAuthContext"
import axios from "axios";

export const useLogout = () => {

    const { dispatch } = useAuthContext();

    const logout = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = user?.accessToken;
        axios.patch(`/api/users/${user._id}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(() => {
                localStorage.removeItem('user');
                dispatch({ type: 'LOGOUT' });
            })
            .catch(e => {
                console.log(e.response.data.error);
            })
    }
    return { logout };
};
