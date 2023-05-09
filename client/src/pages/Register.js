import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import Alert from "../components/alert/Alert";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(null);

    const submitRegistration = async () => {
        if (checkDetails()) {
            const res = await fetch("http://127.0.0.1:3001/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    password: password
                })
            })
            const data = await res.json()
            if (data === "username exists") {
                setErrorMessage({ message: "Username already exists!", type: "error" });
            } else if (data === "email exists") {
                setErrorMessage({ message: "Email already exists!", type: "error" });
            } else if (data === "ok") {
                setErrorMessage({ message: "Successful registration! You can now sign in!", type: "success" });
            }
        }
    }

    const checkDetails = () => {
        setErrorMessage(null);
        if (firstName.length < 3) {
            setErrorMessage(null);
            setErrorMessage({ message: "First name must be at least 3 characters long!", type: "error" });
            return false;
        }
        if (lastName.length < 3) {
            setErrorMessage({ message: "Last name must be at least 3 characters long!", type: "error" });
            return false;
        }
        if (username.length < 3) {
            setErrorMessage({ message: "Username must be at least 3 characters long!", type: "error" });
            return false;
        }
        if (password.length < 3) {
            setErrorMessage({message: "Password must be at least 3 characters long!", type: "error"});
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage({message: "Passwords don't match!", type: "error"});
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="menubg"></div>
            {errorMessage && <Alert key={errorMessage.message} message={errorMessage.message} type={errorMessage.type} />}
            <div className="registerContainer">
                <div className="register">
                    <img src={logo} alt=""></img>
                    <form className="registerForm" onSubmit={(e) => { e.preventDefault(); submitRegistration() }}>
                        <div className="registerInputContainer">
                            <div className="userInput">
                                <label>First name:
                                    <input type="text" onChange={(e) => setFirstName(e.target.value)} />
                                </label>
                            </div>
                            <div className="userInput">
                                <label>Last name:
                                    <input type="text" onChange={(e) => setLastName(e.target.value)} />
                                </label>
                            </div>
                        </div>
                        <div className="registerInputContainer">
                            <div className="userInput">
                                <label>Username:
                                    <input type="text" onChange={(e) => setUsername(e.target.value)} />
                                </label>
                            </div>
                            <div className="userInput">
                                <label>Email:
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                                </label>
                            </div>
                        </div>
                        <div className="registerInputContainer">
                            <div className="userInput">
                                <label>Password:
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                                </label>
                            </div>
                            <div className="userInput">
                                <label>Confirm password:
                                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                                </label>
                            </div>
                        </div>
                        <button type="submit">Register</button>
                        <Link to="/">Already have an account? Sign in here!</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;