import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function calculatePercentage(answeredQuestions) {
    const totalQuestions = answeredQuestions.reduce((total, num) => total + num.questions, 0);
    const totalScore = answeredQuestions.reduce((total, num) => total + num.score, 0);
    const percentage = Math.floor((totalScore / totalQuestions) * 100);
    return percentage ? percentage : 0;
}

function ReviewGames() {
    const [spot, setSpot] = useState(null);

    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        const fetchSpot = async () => {
            const res = await fetch(`http://127.0.0.1:3001/api/spot/${user._id}`);
            const data = await res.json();
            setSpot(data);
        }
        fetchSpot();
    }, [])

    if (spot) {
        return (
            <>
                <div className="menubg" />
                <div className="reviewContainer">
                    <div className="reviewGames">
                        <div className="stats">
                            <p>Played games: {user.playedGames.length}</p>
                            <p>All time points: {user.playedGames.reduce((total, obj) => total + obj.score, 0)}</p>
                            <p>Well answered percentage: {calculatePercentage(user.playedGames)}%</p>
                            <p>Leaderboard spot: {spot}.</p>
                        </div>
                        <div className="playedGames">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Number of questions</th>
                                        <th>Right answers</th>
                                        <th>Wrong answers</th>
                                        <th>Played at</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.playedGames.map((game, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{game.questions}</td>
                                            <td>{game.score}</td>
                                            <td>{game.questions - game.score}</td>
                                            <td>{`${new Date(game.playedAt).getFullYear()} ${new Date(game.playedAt).getMonth()} ${new Date(game.playedAt).getDate()}`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Link to="/profile">
                        <button className="btn">Back to profile</button>
                    </Link>
                </div>
            </>
        )
    }
}

export default ReviewGames;