import Question from "../components/question/Question";
import Loading from "../components/loading/Loading";
import { useEffect, useState } from "react";
import { getUser, refreshUser } from "../App";
import { Link } from "react-router-dom";
import vagoAll from "../images/vago_all.png";
import bubble from "../images/bubble_left.png";
import vagoSmile from "../images/vago_smile.png";

function Game() {
    const [questions, setQuestions] = useState(null);
    const [round, setRound] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);

    const [showOptions, setShowOptions] = useState(true);
    const [questionNumber, setQuestionNumber] = useState(5);
    const [category, setCategory] = useState("9");
    const [difficulty, setDiffculty] = useState(null);

    const fetchQuestions = async () => {
        const res = await fetch(`https://opentdb.com/api.php?amount=${questionNumber}&difficulty=${difficulty}&category=${category}&type=multiple`);
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
        if (round === questionNumber) {
            const postGame = async () => {
                await fetch(`http://127.0.0.1:3001/api/user/${getUser().username}/addgame`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        score: correctAnswers,
                        questions: questionNumber
                    })
                });
                refreshUser(getUser().username, getUser().password);
            }
            postGame();
        }
    }, [round])

    if (showOptions) {
        return (
            <>
                <div className="menubg"></div>
                <div className="container">
                    <div className="gameOptions">
                        <p className="title">Game options</p>
                        <div className="sub">
                            <p>Number of questions:</p>
                            <div className="numberOption">
                                <button onClick={() => questionNumber > 5 && setQuestionNumber((prev) => prev - 5)}>-</button>
                                <p>{questionNumber}</p>
                                <button onClick={() => questionNumber < 20 && setQuestionNumber((prev) => prev + 5)}>+</button>
                            </div>
                        </div>
                        <div className="sub">
                            <p>Difficulty:</p>
                            <div>
                                <div className="radio">
                                    <input type="radio" id="easy" name="difficulty" value={"easy"} onChange={(e) => setDiffculty(e.target.value)} />
                                    <label htmlFor="easy">Easy</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" id="medium" name="difficulty" value={"medium"} onChange={(e) => setDiffculty(e.target.value)} />
                                    <label htmlFor="medium">Medium</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" id="hard" name="difficulty" value={"hard"} onChange={(e) => setDiffculty(e.target.value)} />
                                    <label htmlFor="hard">Hard</label>
                                </div>
                            </div>
                        </div>
                        <div className="sub">
                            <p>Category:</p>
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value={9}>General knowledge</option>
                                <option value={11}>Movies</option>
                                <option value={15}>Video games</option>
                                <option value={18}>Computer science</option>
                                <option value={21}>Sports</option>
                                <option value={23}>History</option>
                                <option value={27}>Animals</option>
                            </select>
                        </div>
                        <button className="btn" onClick={() => { if (difficulty) { setShowOptions(false); fetchQuestions() } }}>Start game</button>
                    </div>
                </div>
            </>
        )
    } else {
        if (!questions) {
            return <Loading />
        }

        if (round < questionNumber) {
            return (
                <>
                    <img className="vagoAll" src={vagoAll} alt="" />
                    <img className="gameBubble" src={bubble} alt="" />
                    <div className="gamebg"></div>
                    <div className="game">
                        <div className="gameStats">
                            <p>Correct answers: {correctAnswers}</p>
                            <p>Incorrect answers: {incorrectAnswers}</p>
                            <p>Remaining questions: {questionNumber - round}</p>
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