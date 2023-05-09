import { useEffect, useState } from "react";
import "./Question.css";

function unescapeHTML(str) {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#039;/g, "'");
}

function randomizeArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function Question(props) {
    const { question, handleAnswer } = props;
    const [answers, setAnswers] = useState(null);

    const [answer1Color, setAnswer1Color] = useState("");
    const [answer2Color, setAnswer2Color] = useState("");
    const [answer3Color, setAnswer3Color] = useState("");
    const [answer4Color, setAnswer4Color] = useState("");

    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    useEffect(() => {
        setAnswers(randomizeArray([question.correct_answer, ...question.incorrect_answers]));
        setAnswer1Color("");
        setAnswer2Color("");
        setAnswer3Color("");
        setAnswer4Color("");
    }, [question])

    const checkAnswer = (answerNum, correct) => {
        if(!answerSubmitted){
            setAnswerSubmitted(true);
            let setAnswerColor;
            if (answerNum === 1) {
                setAnswerColor = setAnswer1Color;
            } else if (answerNum === 2) {
                setAnswerColor = setAnswer2Color;
            } else if (answerNum === 3) {
                setAnswerColor = setAnswer3Color;
            } else if (answerNum === 4) {
                setAnswerColor = setAnswer4Color;
            }
            setAnswerColor("answerYellow");
            setTimeout(() => {
                correct ? setAnswerColor("answerGreen") : setAnswerColor("answerRed");
                setTimeout(() => {
                    handleAnswer(correct);
                    setAnswerSubmitted(false);
                }, 1000);
            }, 1500)
        }
    }

    if (answers) {
        return (
            <div className="questionContainer">
                <div className="question">
                    <div className="questionBox">
                        <p>{unescapeHTML(question.question)}</p>
                    </div>
                    <div className="answers">
                        <div onClick={() => checkAnswer(1, answers[0] === question.correct_answer ? true : false)} className={"answerBox " + answer1Color}>
                            <p>A</p>
                            <p>{unescapeHTML(answers[0])}</p>
                        </div>
                        <div onClick={() => checkAnswer(2, answers[1] === question.correct_answer ? true : false)} className={"answerBox " + answer2Color}>
                            <p>B</p>
                            <p>{unescapeHTML(answers[1])}</p>
                        </div>
                        <div onClick={() => checkAnswer(3, answers[2] === question.correct_answer ? true : false)} className={"answerBox " + answer3Color}>
                            <p>C</p>
                            <p>{unescapeHTML(answers[2])}</p>
                        </div>
                        <div onClick={() => checkAnswer(4, answers[3] === question.correct_answer ? true : false)} className={"answerBox " + answer4Color}>
                            <p>D</p>
                            <p>{unescapeHTML(answers[3])}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else return null;
}

export default Question;