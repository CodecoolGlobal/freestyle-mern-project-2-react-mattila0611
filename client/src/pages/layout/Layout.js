import "./Layout.css";
import logo from "../../images/logo.png";
import { getUser, setUser } from "../../App";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const sumScore = (user) => {
    return user.playedGames.reduce((total, obj) => total + obj.score, 0);
}

function Layout() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!getUser()) {
            navigate("/login");
        } else setLoading(false);
    }, [navigate])

    if (!loading) {
        return (
            <>
                <div className="header">
                    <div className="score">
                        <p>Score: {sumScore(getUser())}</p>
                    </div>
                    <div className="logo"><img src={logo} alt="" /></div>
                    <div className="userProfile">
                        <p>Logged in as {getUser().username}</p>
                        <button onClick={() => {navigate("/login"); setUser(null)}}>Log out</button>
                    </div>
                </div>
                <Outlet />
            </>
        )
    }
}

export default Layout;