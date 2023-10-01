import { useEffect } from "react";
import "./Display.css";
import Options from "./Options";

export default function Display({ dispatch, data, answer, questionNo, next, selected, numQuestions, timeRemaining }){
    const min = Math.floor(timeRemaining / 60);
    const second = timeRemaining % 60;

    useEffect(function(){
        const id = setInterval(function(){
            dispatch({type: "timer"})
        }, 1000);

        return function() {
            clearInterval(id);
        }
    }, [dispatch]);
    
    return (
        <div className="display">
            <p>{data.question}</p>
            <Options dispatch={dispatch} data={data} answer={answer} questionNo={questionNo} next={next} selected={selected} />
            <div className="footer">
                <button className="footerButton">{min < 10 ? "0" : ""}{min}:{second < 10 ? "0" : ""}{second}</button>
                {
                    next && (<button className="footerButton" onClick={() => dispatch({type: "nextQuestion"})}>{questionNo === (numQuestions - 1) ? "Finish" : "Next"}</button>)
                }
            </div>
        </div>
    );
}
