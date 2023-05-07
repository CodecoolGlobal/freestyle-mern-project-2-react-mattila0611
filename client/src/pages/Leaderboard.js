import { useEffect, useState } from "react";
import { Link } from "react-router-dom";




function Leaderboard() {
    const [users, setUsers] = useState(null);

    const sumScore = (user) => {
        return user.playedGames.reduce((total, obj) => total + obj.score, 0);
    }

    const fetchUsers = async () => {
        const response = await fetch("http://localhost:3001/api/users");
        const data = await response.json();
        data.sort((a,b) => sumScore(b) - sumScore(a));
        setUsers(data);
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <>
            <div className="gamebg"></div>
            <div className="leaderboardContainer">
                <div className="leaderboard">
                    <p>Leaderboard:</p>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Username</th>
                                <th>Score</th>
                                <th>Played games</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{sumScore(user)}</td>
                                    <td>{user.playedGames.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/">
                        <button>Back to menu</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Leaderboard;