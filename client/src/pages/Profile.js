import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/alert/Alert";
import { refreshUser } from "../App";


function Profile() {
    const [changeUsername, setChangeUsername] = useState(JSON.parse(sessionStorage.getItem("user")).username);
    const [changePassword, setChangePassword] = useState("");
    const [changeConfirmPassword, setChangeConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const userRegisterDate = new Date(JSON.parse(sessionStorage.getItem("user")).registeredAt);

    const submit = async () => {
        setErrorMessage(null);
        if (changeUsername.length >= 3 && changePassword.length >= 3 && changeConfirmPassword.length >= 3) {
            if (changePassword === changeConfirmPassword) {
                await fetch(`http://localhost:3000/user/${JSON.parse(sessionStorage.getItem("user")).username}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: changeUsername,
                        password: changePassword,
                    })
                })
                refreshUser(changeUsername, changePassword);
                setErrorMessage({ message: "You successfully updated your profile!", type: "success" })
            } else {
                setErrorMessage({ message: "Passwords don't match!", type: "error" })
            }
        } else {
            setErrorMessage({ message: "Username and password must be at least 3 characters long!", type: "error" })
        }
    }

    return (
        <>
            <div className="menubg"></div>
            {errorMessage && <Alert key={errorMessage.message} message={errorMessage.message} type={errorMessage.type} />}
            <div className="profileContainer">
                <div className="profile">
                    <p>Your details</p>
                    <div className="userDetails">
                        <p className="userDetail">First name: {JSON.parse(sessionStorage.getItem("user")).name.first}</p>
                        <p className="userDetail">Last name: {JSON.parse(sessionStorage.getItem("user")).name.last}</p>
                        <p className="userDetail">Email: {JSON.parse(sessionStorage.getItem("user")).email}</p>
                        <p className="userDetail">Registration date: {`${userRegisterDate.getFullYear()} ${userRegisterDate.getMonth()} ${userRegisterDate.getDate()}`}</p>
                    </div>
                    <p>Change details</p>
                    <div className="changeDetails">
                        <label>Username:
                            <input type="text" defaultValue={JSON.parse(sessionStorage.getItem("user")).username} onChange={e => setChangeUsername(e.target.value)} />
                        </label>
                        <label>Choose new password:
                            <input type="password" onChange={e => setChangePassword(e.target.value)} />
                        </label>
                        <label>Confirm new password:
                            <input type="password" onChange={e => setChangeConfirmPassword(e.target.value)} />
                        </label>
                        <button className="btn" onClick={submit}>Submit changes</button>
                    </div>
                    <Link to="/profile/games">
                        <button className="btn">Review played games</button>
                    </Link>
                    <Link to="/">
                        <button className="btn">Back to menu</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Profile;