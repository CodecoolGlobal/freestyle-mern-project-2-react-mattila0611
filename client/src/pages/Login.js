import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setUser } from "../App";
import logo from "../images/logo.png"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

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
            if (data.success === true) {
                setUser(data.user);
                setTimeout(() => navigate("/"), 50);
            } else window.alert(data);
        }
    }

    const checkInputs = () => {
        if (username.length < 3) {
            window.alert("Username must be at least 3 characters long!");
            return false;
        }
        if (password.length < 3) {
            window.alert("Password must be at least 3 characters long!");
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="menubg"></div>
            <div className="loginContainer">
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