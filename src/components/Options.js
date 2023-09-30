import React from "react";
import "./Options.css";

export default function Options({ dispatch, data, answer, questionNo, next }){
    return (
        <>
            <button className={`optionButton ${next ? answer === 0 ? "correct" : "error" : ""}`} onClick={() => dispatch({type: "selectedAnswer", payload: 0, index: questionNo})}>{data.options[0]}</button>

            <button className={`optionButton ${next ? answer === 1 ? "correct" : "error": ""}`} onClick={() => dispatch({type: "selectedAnswer", payload: 1, index: questionNo})}>{data.options[1]}</button>

            <button className={`optionButton ${next ? answer === 2 ? "correct" : "error" : ""}`} onClick={() => dispatch({type: "selectedAnswer", payload: 2, index: questionNo})}>{data.options[2]}</button>

            <button className={`optionButton ${next ? answer === 3 ? "correct" : "error" : ""}`} onClick={() => dispatch({type: "selectedAnswer", payload: 3, index: questionNo})}>{data.options[3]}</button>
        </>
    );
}
