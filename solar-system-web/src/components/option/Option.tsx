import { useContext } from "react";
import { QuizzContext } from "../../context/QuizzContext";
import "./Option.css";

export function Option ({ option, selectOption, answer }: any){
  const quizzContext = useContext(QuizzContext);
  if (!quizzContext) {
    throw new Error("Option deve estar dentro de um QuizzProvider!");
  }
  const [quizzState] = quizzContext;


  return (
    <div 
      className={`option text-black p-3 rounded ${
        quizzState.answerSelected && option === answer ? "correct-option" : ""
      } ${
        quizzState.answerSelected && quizzState.answerSelected === option && option !== answer ? "wrong-option" : ""
      } `} 
      onClick={() => selectOption()}>
      <span className="text-white" >{option}</span>
    </div>
  )
}