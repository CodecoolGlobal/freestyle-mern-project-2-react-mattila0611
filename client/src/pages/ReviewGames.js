import { getUser } from "../App";

function ReviewGames() {
    return (
        <>
            <div className="reviewGames">
                <div className="stats">
                    <p>Played games:</p>
                    <p>All time points:</p>
                    <p>Well answered percentage:</p>
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