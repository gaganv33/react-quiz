import React from "react";
import "./Options.css";

export default function Options({ dispatch, data, answer, next, selected }){
    return (
        <>
            <button className={`optionButton ${next ? answer === 0 ? "correct" : "error" : ""} ${selected === 0 ? "selected" : ""}`} onClick={() => dispatch({type: "selectedAnswer", payload: 0})}
            disabled={selected === -1 ? false : true}>{data.options[0]}</button>
    
            <button className={`optionButton ${next ? answer === 1 ? "correct" : "error": ""} ${selected === 1 ? "selected" : ""}`} onClick={() => dispatch({type: "selectedAnswer", payload: 1})}
            disabled={selected === -1 ? false : true}>{data.options[1]}</button>

            <button className={`optionButton ${next ? answer === 2 ? "correct" : "error" : ""} ${selected === 2 ? "selected" : ""}`} onClick={() => dispatch({type: "selectedAnswer", payload: 2})}
            disabled={selected === -1 ? false : true}>{data.options[2]}</button>

            <button className={`optionButton ${next ? answer === 3 ? "correct" : "error" : ""} ${selected === 3 ? "selected" : ""}`} onClick={() => dispatch({type: "selectedAnswer", payload: 3})}
            disabled={selected === -1 ? false : true}>{data.options[3]}</button>
        </>
    );
}
