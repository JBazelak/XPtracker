import { useState } from "react"
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
const Register = () => {
    const [login, setLogin] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const {register, error, isLoading} = useRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(login, firstName, lastName, password, passwordCheck)
    }

    return (
        <form className="register" onSubmit={handleSubmit}>
            <h3>Dołącz do nas!</h3>
            <Link to='/' className="back-arrow">&larr;</Link>
            <hr style={{ width: "100%", marginBottom: "3rem" }} />
            {error && <div className="error-msg">{error}</div>}
            <input
                type="text"
                placeholder="Login"
                onChange={(e) => setLogin(e.target.value)}
                value={login} />
            <input
                type="text"
                placeholder="Imię"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName} />
            <input
                type="text"
                placeholder="Nazwisko"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName} />
            <input
                type="password"
                placeholder="Hasło"
                onChange={(e) => setPassword(e.target.value)}
                value={password} />
            <input
                type="password"
                placeholder="Powtórz hasło"
                onChange={(e) => setPasswordCheck(e.target.value)}
                value={passwordCheck} />
            <hr style={{ width: "100%", marginTop: "2rem", marginBottom: "3rem" }} />
            <button disabled={isLoading}>Zarejestruj się!</button>
        </form>
    )
}

export default Register;