import { useAuthContext } from "./useAuthContext"
import axios from "axios";

export const useLogout = () => {
    const { user, dispatch } = useAuthContext();
    const logout = () => {
        axios.patch(`/api/users/${user._id}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${user.token}`
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
}