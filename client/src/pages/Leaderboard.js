import { useEffect, useState } from "react";
import { Link } from "react-router-dom";




function Leaderboard() {
    const shownPerPage = 10;
    const  [paginationButtons,setPaginationButtons] = useState([])
    const [users, setUsers] = useState(null);
    const [usersPagination, setUsersPagination] = useState(null)

    const sumScore = (user) => {
        return user.playedGames.reduce((total, obj) => total + obj.score, 0);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:3001/api/users");
            const data = await response.json();
            data.sort((a, b) => sumScore(b) - sumScore(a));
            setUsers(data);
            setUsersPagination(data.slice(0, shownPerPage))
            const paginationLegth = Math.ceil(data.length / 10)
            let tempPaginationButtons =[]
            for (let i = 1; i < paginationLegth + 1; i++) {
                tempPaginationButtons.push(i)
            }
            setPaginationButtons(tempPaginationButtons)
        }
        fetchUsers();
    }, [])

    function handlePaginationButtonClick(value){
        setUsersPagination(users.slice((value*shownPerPage)-shownPerPage,value*shownPerPage))
    }

    const getQuestionCount = (user) => {
        const questions = user.playedGames.map(item => item.questions);
        return questions.reduce((total, num) => total + num, 0);
    }
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
                                <th>Answered questions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersPagination && usersPagination.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.username}</td>
                                    <td>{sumScore(user)}</td>
                                    <td>{getQuestionCount(user)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="paginationButtonsDiv">{paginationButtons && paginationButtons.map(button =>{
                        return <button key={button-1} className="paginationButton" onClick={() => handlePaginationButtonClick(button)}>{button}</button>
                    })}
                    </div>
                    <Link to="/">
                        <button className="btn">Back to menu</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Leaderboard;