import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../images/logo.png"
import Alert from "../components/alert/Alert";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("user")){
            navigate("/");
        }
    },[])

    const submitLogin = async () => {
        if (checkInputs()) {
            const res = await fetch("http://127.0.0.1:3001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            const data = await res.json();
            if (data.success) {
                sessionStorage.setItem("user", JSON.stringify(data.user));
                setTimeout(() => navigate("/"), 50);
            } else setErrorMessage(data);
        }
    }

    const checkInputs = () => {
        setErrorMessage(null);
        if (username.length < 3) {
            setErrorMessage("Username must be at lest 3 charatcter long!");
            return false;
        }
        if (password.length < 3) {
            setErrorMessage("Password must be at lest 3 charatcter long!");
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="menubg"></div>
            {errorMessage && <Alert key={errorMessage} type="error" message={errorMessage} />}
            <div className="container">
                <div className="login">
                    <img src={logo} alt=""></img>
                    <p>Please sign in!</p>
                    <form className="loginForm" onSubmit={(e) => { e.preventDefault(); submitLogin(); }}>
                        <div className="userInput">
                            <label>Username:
                                <input type="text" onChange={(e) => setUsername(e.target.value)} />
                            </label>
                        </div>
                        <div className="userInput">
                            <label>Password:
                                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                            </label>
                        </div>
                        <button type="submit" className="btn">Sign in</button>
                        <Link to="/register">Don't have an account? Click here to register!</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;