import "./Layout.css";
import logo from "../../images/logo.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const sumScore = (user) => {
    return user.playedGames.reduce((total, obj) => total + obj.score, 0);
}

function Layout() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionStorage.getItem("user")) {
            navigate("/login");
        } else setLoading(false);
    }, [navigate])

    if (!loading) {
        return (
            <>
                <div className="header">
                    <div className="score">
                        <p>Score: {sumScore(JSON.parse(sessionStorage.getItem("user")))}</p>
                    </div>
                    <div className="logo"><img src={logo} alt="" /></div>
                    <div className="userProfile">
                        <p>Logged in as {JSON.parse(sessionStorage.getItem("user")).username}</p>
                        <button onClick={() => {navigate("/login"); sessionStorage.removeItem("user");}}>Log out</button>
                    </div>
                </div>
                <Outlet />
            </>
        )
    }
}

export default Layout;