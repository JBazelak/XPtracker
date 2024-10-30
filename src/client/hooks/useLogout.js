import { useAuthContext } from "./useAuthContext"
import axios from "axios";

export const useLogout = () => {
    const {user, dispatch} = useAuthContext();

    const logout = () => {
        axios.patch(`/api/users/${user._id}/logout`);
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
    }

    return {logout};
}