import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";
const Login = () => {
    const [loginInputValue, setLoginInputValue] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) { navigate('/desktop') }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(loginInputValue, password);
    }

    return (
        <>
            <div className="background"></div>
            <div className="form-wrapper">
                <form className="login" onSubmit={handleSubmit}>
                    <h3>Witaj ponownie!</h3>
                    <Link to='/' className="back-arrow">&larr;</Link>
                    <hr style={{ width: "100%", marginBottom: "3rem" }} />
                    {error && <div className="error-msg">{error}</div>}
                    <input
                        type="text"
                        placeholder="Login"
                        onChange={(e) => setLoginInputValue(e.target.value)}
                        value={loginInputValue} />
                    <input
                        type="password"
                        placeholder="Hasło"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} />
                    <hr style={{ width: "100%", marginTop: "2rem", marginBottom: "3rem" }} />
                    <button disabled={isLoading}>Zaloguj się!</button>
                </form>
            </div>
        </>


    )
}

export default Login;