import React from "react";
import "./Status.css";

export default function Status({ points, questionNo }){
    return (
        <div className="status">
            <input className="inputStatus" type="range" min={0} max={15} value={questionNo + 1} disabled />
            <div className="data">
                <span>Question {questionNo + 1} / 15</span>
                <span>{points} / 280 points</span>
            </div>
        </div>
    );
}
