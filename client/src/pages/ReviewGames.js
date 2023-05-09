import { getUser } from "../App";

function calculatePercentage(answeredQuestions) {
    const totalQuestions = answeredQuestions.length;
    const totalScore = answeredQuestions.reduce((acc, curr) => acc + curr.score, 0);
    return (totalScore / (totalQuestions * 10)) * 100;
}

function ReviewGames() {
    const user = getUser();

    return (
        <>
            <div className="reviewGames">
                <div className="stats">
                    <p>Played games: {user.playedGames.length}</p>
                    <p>All time points: {user.playedGames.reduce((total, obj) => total + obj.score, 0)}</p>
                    <p>Well answered percentage: {calculatePercentage(user.playedGames)}%</p>
                    <p>Leaderboard spot:</p>
                </div>
                <div className="playedGames">
                    <p>Played games:</p>
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
                            {getUser().playedGames.map((game, index) => (
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
        </>
    )
}

export default ReviewGames;