import { Link } from "react-router-dom";
import { getUser } from "../App";
import { useState } from "react";


function Profile() {
    const [changeUsername, setChangeUsername] = useState(getUser().username);
    const [changePassword, setChangePassword] = useState("");
    const [changeConfirmPassword, setChangeConfirmPassword] = useState("");
    const userRegisterDate = new Date(getUser().registeredAt);

    const submit = () => {
        console.log(changeUsername, changePassword, changeConfirmPassword);
        if (changeUsername.length >= 3 && changePassword.length >= 3 && changeConfirmPassword.length >= 3) {
            if (changePassword === changeConfirmPassword) {
                fetch(`http://localhost:3000/user/${getUser().username}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: changeUsername,
                        password: changePassword,
                    })
                })
                window.alert("You successfully updated your profile!")
            } else {
                window.alert("Passwords don't match!")
            }
        } else {
            window.alert("Username and password must be minimum 3 characters long!")
        }
    }

    return (
        <>
            <div className="menubg"></div>
            <div className="profileContainer">
                <div className="profile">
                    <p>Change details</p>
                    <div className="changeDetails">
                        <label>Username:
                            <input type="text" defaultValue={getUser().username} onChange={e => { setChangeUsername(e.target.value); console.log(e.target.value) }} />
                        </label>
                        <label>Choose new password:
                            <input type="password" onChange={e => setChangePassword(e.target.value)} />
                        </label>
                        <label>Confirm new password:
                            <input type="password" onChange={e => setChangeConfirmPassword(e.target.value)} />
                        </label>
                        <button onClick={submit}>Submit changes</button>
                    </div>
                    <p>Your details</p>
                    <div className="userDetails">
                        <p className="userDetail">First name: {getUser().name.first}</p>
                        <p className="userDetail">Last name: {getUser().name.last}</p>
                        <p className="userDetail">Email: {getUser().email}</p>
                        <p className="userDetail">Registration date: {`${userRegisterDate.getFullYear()} ${userRegisterDate.getMonth()} ${userRegisterDate.getDate()}`}</p>
                    </div>
                    {/* <Link to="/profile/games">
                        <button>Review played games</button>
                    </Link> */}
                    <Link to="/">
                        <button>Back to menu</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Profile;