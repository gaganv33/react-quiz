import React from "react";
import "./Status.css";

export default function Status({ points, questionNo, numQuestions, maxPoints }){
    return (
        <div className="status">
            <progress className="inputStatus" min={0} max={numQuestions} value={questionNo + 1} />
            <div className="data">
                <span>Question <strong>{questionNo + 1}</strong> / {numQuestions}</span>
                <span>{points} / {maxPoints} points</span>
            </div>
        </div>
    );
}
