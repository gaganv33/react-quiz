import React, { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Status from "./components/Status";
import questions from "./questions.json";
import Display from "./components/Display";

const data = questions.questions;
const TIME_PER_QUESTION = 30;

const intialState = {status: "loading", questionNo: 0, points: 0, answer: -1, next: false, selected: -1, highScore: 0, timeRemaining: data.length * TIME_PER_QUESTION};

function reducer(state, action){
  switch(action.type){

    case "selectedAnswer":
      return {...state, points: state.points + (data[state.questionNo].correctOption === action.payload ? data[state.questionNo].points : 0), next: true, answer: data[state.questionNo].correctOption, selected: action.payload};

    case "nextQuestion":
      if(state.questionNo === data.length - 1){
        return {...state, status: "completed", selected: -1, highScore: state.points > state.highScore ? state.points : state.highScore};
      }
      return {...state, questionNo: state.questionNo + 1, next: false, answer: 0, selected: -1};

    case "ready":
      return {...state, status: "ready", timeRemaining: data.length * TIME_PER_QUESTION};

    case "setQuestionNo":
      return {...state, questionNo: action.payload, selected: -1};

    case "reset":
      return {...intialState, status: "ready", highScore: state.highScore};

    case "end":
      return intialState;

    case "timer":
      if(state.timeRemaining === 0){
        return {...state, status: "completed"};
      }
      return {...state, timeRemaining: state.timeRemaining - 1};

    default:
      throw new Error("Unknown type option");
  }
}

export default function App(){
  const [state, dispatch] = useReducer(reducer, intialState);
  const {status, questionNo, points, answer, next, selected, highScore, timeRemaining} = state;

  const numQuestions = data.length;
  let maxPoints = 0;
  data.map((question) => {
    maxPoints += question.points;
    return question;
  });

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
              <Status points={points} questionNo={questionNo} numQuestions={numQuestions} maxPoints={maxPoints} />
              <Display dispatch={dispatch} data={data[questionNo]} answer={answer} questionNo={questionNo} next={next} selected={selected} numQuestions={numQuestions} timeRemaining={timeRemaining} />
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
        }
        {
          status === "completed" && (
            <div className="result">
              <h1>You scored {points} / {maxPoints}({Math.ceil((points / maxPoints) * 100)}%)!</h1>
              <h3>Highscore: {highScore}</h3>
              <button className="resetButton" onClick={() => dispatch({type: "reset"})}>Reset</button>
              <button className="endButton" onClick={() => dispatch({type: "end"})}>End Quiz</button>
            </div>
          )
        }
      </div>
    </div>
  );
}
