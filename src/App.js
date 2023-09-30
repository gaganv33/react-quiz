import React, { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Status from "./components/Status";
import questions from "./questions.json";
import Display from "./components/Display";

const data = questions.questions;

const intialState = {status: "loading", questionNo: 0, points: 0, answer: 0, next: false};

function reducer(state, action){
  switch(action.type){
    case "selectedAnswer":
      return {...state, points: state.points + (data[action.index].correctOption === action.payload ? data[action.index].points : 0), next: true, answer: data[action.index].correctOption};

    case "nextQuestion":
      if(state.questionNo === data.length - 1){
        return {...state, status: "completed"};
      }
      return {...state, questionNo: state.questionNo + 1, next: false, answer: 0};

    case "ready":
      return {...state, status: "ready"};

    case "setQuestionNo":
      return {...state, questionNo: action.payload};

    default:
      throw new Error("Unknown type option");
  }
}

export default function App(){
  const [state, dispatch] = useReducer(reducer, intialState);
  const {status, questionNo, points, answer, next} = state;

  useEffect(function() {
    localStorage.setItem("questionNo", JSON.stringify(questionNo));
  }, [questionNo]);

  return (
    <div className="app">
      <div className="mainContainer">
        <Header />
        {
          status === "ready" && (
            <>
              <Status points={points} questionNo={questionNo} />
              <Display dispatch={dispatch} data={data[questionNo]} answer={answer} questionNo={questionNo} next={next} />
            </>
          )
        }
        {
          status === "loading" && (
            <div className="startContainer">
              <h1>Welcome to the React quiz!</h1>
              <h3>15 questions to test your React mastery</h3>
              <button className="start" onClick={() => dispatch({type: "ready"})}>Let's start!</button>
            </div>
          )
        }{
          status === "completed" && (
            <div className="result">
              <h1>You scored {points} / 280!</h1>
            </div>
          )
        }
      </div>
    </div>
  );
}
