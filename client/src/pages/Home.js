import vagoUr from "../images/vago.png";
import bubble from "../images/bubble.png";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div className="menubg"></div>
            <div className="Home">
                <div className="menuContainer">
                    <p>Welcome, {JSON.parse(sessionStorage.getItem("user")).username}!</p>
                    <button onClick={() => navigate("/game")} className="btn">Let's begin, Vágó Úr!</button>
                    <button onClick={() => navigate("/leaderboard")} className="btn">View leaderboard</button>
                    <button onClick={() => navigate("/profile")} className="btn">Profile</button>
                </div>
                <img className="vago" src={vagoUr} alt=""></img>
                <div className="bubble">
                    <img src={bubble} alt="" />
                    <p>Nos, tehát?</p>
                </div>
            </div>
        </>
    )
}

export default Home;