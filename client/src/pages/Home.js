import { Link } from "react-router-dom";
import { getUser } from "../App";
import vagoUr from "../images/vago.png";
import bubble from "../images/bubble.png";

function Home() {


    return (
        <>
            <div className="menubg"></div>
            <div className="Home">
                <div className="menuContainer">
                    <p>Welcome, {getUser().username}!</p>
                    <Link to="/game"><button>Let's begin, Vágó Úr!</button></Link>
                    <Link to="/leaderboard"><button>View leaderboard</button></Link>
                    <Link to="/profile"><button>Profile</button></Link>
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