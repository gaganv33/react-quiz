import "./Display.css";
import Options from "./Options";

export default function Display({ dispatch, data, answer, questionNo, next }){

    return (
        <div className="display">
            <p>{data.question}</p>
            <Options dispatch={dispatch} data={data} answer={answer} questionNo={questionNo} next={next} />
            <div className="footer">
                <button className="footerButton">Timer</button>
                {
                    next && (<button className="footerButton" onClick={() => dispatch({type: "nextQuestion"})}>Next</button>)
                }
            </div>
        </div>
    );
}
