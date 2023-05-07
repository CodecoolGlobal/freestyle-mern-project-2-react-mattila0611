import Question from "../components/question/Question";
import Loading from "../components/loading/Loading";
import { useEffect, useState } from "react";
import { getUser, refreshUser } from "../App";
import { Link } from "react-router-dom";
import vagoAll from "../images/vago_all.png";
import bubble from "../images/bubble_left.png";
import vagoSmile from "../images/vago_smile.png";

const questionQuantity = 5;

function Game() {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState(null);
    const [round, setRound] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);

    const fetchQuestions = async () => {
        const res = await fetch(`https://opentdb.com/api.php?amount=${questionQuantity}&difficulty=easy&type=multiple`);
        const data = await res.json();
        console.log(data.results);
        setQuestions(data.results);
    }

    const handleAnswer = (correctAnswer) => {
        correctAnswer ? setCorrectAnswers(correctAnswers + 1) : setIncorrectAnswers(incorrectAnswers + 1);
        setRound(round + 1);
    }

    const restartGame = () => {
        setQuestions(null);
        fetchQuestions();
        setCorrectAnswers(0);
        setIncorrectAnswers(0);
        setRound(0);
    }

    useEffect(() => {
            fetchQuestions();
    }, [])

    useEffect(() => {
        if(questions){
            setLoading(false);
        } else setLoading(true);
    }, [questions])

    useEffect(() => {
        if (round === questionQuantity) {
            const postGame = async () => {
                await fetch(`http://127.0.0.1:3001/api/user/${getUser().username}/addgame`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        score: correctAnswers,
                        questions: questionQuantity
                    })
                });
                refreshUser(getUser().username, getUser().password);
            }
            postGame();
        }
    }, [round])

    if(loading){
        return (<Loading/>)
    }

    if (questions) {
        if (round < questionQuantity) {
            return (
                <>
                    <img className="vagoAll" src={vagoAll} alt="" />
                    <img className="gameBubble" src={bubble} alt="" />
                    <div className="gamebg"></div>
                    <div className="game">
                        <div className="gameStats">
                            <p>Correct answers: {correctAnswers}</p>
                            <p>Incorrect answers: {incorrectAnswers}</p>
                            <p>Remaining questions: {questionQuantity - round}</p>
                        </div>
                        <Question question={questions[round]} handleAnswer={handleAnswer} />
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="gamebg"></div>
                    <img className="vagoSmile" src={vagoSmile} alt="" />
                    <div className="gameover">
                        <div className="gameoverContainer">
                            <p>Congratulations!</p>
                            <p>Correct answers: {correctAnswers}</p>
                            <p>Incorrect answers: {incorrectAnswers}</p>
                            <p>You gained {correctAnswers} {correctAnswers === 1 ? "point" : "points"}!</p>
                            <button onClick={restartGame}>Play again</button>
                            <Link to="/leaderboard">
                                <button>View leaderboard</button>
                            </Link>
                            <Link to="/">
                                <button>Back to menu</button>
                            </Link>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default Game;