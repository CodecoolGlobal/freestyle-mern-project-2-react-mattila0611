import { useEffect, useState } from "react";
import "./Question.css";

function unescapeHTML(str) {
    const htmlEntities = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#x27;': "'",
      '&#x2F;': '/',
      '&#x60;': '`',
      '&#x21;': '!',
      '&#x23;': '#',
      '&#x24;': '$',
      '&#x25;': '%',
      '&#x5E;': '^',
      '&#x26;': '&',
      '&#x2A;': '*',
      '&#x28;': '(',
      '&#x29;': ')',
      '&#x7C;': '|',
      '&#x2B;': '+',
      '&#x3D;': '=',
      '&#x3F;': '?',
      '&#x3B;': ';',
      '&#x3A;': ':',
      '&#x2C;': ',',
      '&#x2E;': '.',
      '&#x3C;': '<',
      '&#x3E;': '>',
      '&#x7B;': '{',
      '&#x7D;': '}',
      '&#x5B;': '[',
      '&#x5D;': ']',
      '&#x5C;': '\\',
      '&#039;': `'`
    };
  
    return str.replace(/&[#a-z0-9]+;/gi, function(match) {
      return htmlEntities[match] || match;
    });
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

function Question({ question, handleAnswer, fifty }) {
    const rightAnswer = question.correct_answer;

    const [answers, setAnswers] = useState(null);

    const [answer1Color, setAnswer1Color] = useState("");
    const [answer2Color, setAnswer2Color] = useState("");
    const [answer3Color, setAnswer3Color] = useState("");
    const [answer4Color, setAnswer4Color] = useState("");

    const [fiftyEnabled, setFiftyEnabled] = useState(fifty);

    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    useEffect(() => {
        const incorrectAnswers = question.incorrect_answers.map(item => { return { q: item, fifty: false, correct: false } });
        incorrectAnswers[0].fifty = true;
        incorrectAnswers[1].fifty = true;
        setAnswers(randomizeArray([{ q: question.correct_answer, fifty: false, correct: true }, ...incorrectAnswers]));
        setAnswer1Color("");
        setAnswer2Color("");
        setAnswer3Color("");
        setAnswer4Color("");
    }, [question])

    useEffect(() => {
        setFiftyEnabled(fifty);
    }, [fifty])

    const checkAnswer = (answerNum, correct) => {
        if (!answerSubmitted) {
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
                if (correct) {
                    setAnswerColor("answerGreen");
                } else {
                    setAnswerColor("answerRed");
                    const rightIndex = answers.findIndex(answer => answer.q === rightAnswer) + 1;
                    if (rightIndex === 1) {
                        setAnswer1Color("answerGreen");
                    } else if (rightIndex === 2) {
                        setAnswer2Color("answerGreen");
                    } else if (rightIndex === 3) {
                        setAnswer3Color("answerGreen");
                    } else if (rightIndex === 4) {
                        setAnswer4Color("answerGreen");
                    }
                }
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
                        <div onClick={() => checkAnswer(1, answers[0].q === question.correct_answer ? true : false)} className={"answerBox " + answer1Color} style={answers[0].fifty && fiftyEnabled ? { visibility: "hidden" } : {}}>
                            <p>A</p>
                            <p>{unescapeHTML(answers[0].q)}</p>
                        </div>
                        <div onClick={() => checkAnswer(2, answers[1].q === question.correct_answer ? true : false)} className={"answerBox " + answer2Color} style={answers[1].fifty && fiftyEnabled ? { visibility: "hidden" } : {}}>
                            <p>B</p>
                            <p>{unescapeHTML(answers[1].q)}</p>
                        </div>
                        <div onClick={() => checkAnswer(3, answers[2].q === question.correct_answer ? true : false)} className={"answerBox " + answer3Color} style={answers[2].fifty && fiftyEnabled ? { visibility: "hidden" } : {}}>
                            <p>C</p>
                            <p>{unescapeHTML(answers[2].q)}</p>
                        </div>
                        <div onClick={() => checkAnswer(4, answers[3].q === question.correct_answer ? true : false)} className={"answerBox " + answer4Color} style={answers[3].fifty && fiftyEnabled ? { visibility: "hidden" } : {}}>
                            <p>D</p>
                            <p>{unescapeHTML(answers[3].q)}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else return null;
}

export default Question;