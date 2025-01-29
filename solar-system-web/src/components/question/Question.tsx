import { useContext, useEffect } from "react";
import { QuizzContext } from "../../context/QuizzContext";
import { Option } from "../option/Option";
import "./Question.css";
import { Button } from "react-bootstrap";
import { VoiceAssistantContext } from "../../context/VoiceAssistantContext";
import { speak } from "../../utils/Speak";

export function Question() {
  const quizzContext = useContext(QuizzContext);
  const voiceAssistantContext = useContext(VoiceAssistantContext);
  if (!quizzContext) {
    throw new Error("Question deve estar dentro de um QuizzProvider!");
  }
  const [quizzState, dispatch] = quizzContext;
  const currentQuestion = quizzState.questions[quizzState.currentQuestion];

  useEffect(() => {
    verifyVoiceAssistant();
    return () => {
      speechSynthesis.cancel();
    }
  }, [quizzState.currentQuestion]);

  const verifyVoiceAssistant = () => {
    speechSynthesis.cancel();
    if(voiceAssistantContext?.isVoiceAssistantActive){
      speakQuestion();
    }
  }

  const speakQuestion = () => {
    const questionNumber = quizzState.currentQuestion + 1;
    speak("Questão " + questionNumber);
    speak(currentQuestion.question);
    currentQuestion.options.forEach((option: any) => {
      speak(option);
    });
  }

  const onSelectOption = (option: any) => {
    dispatch({type: "CHECK_ANSWER", payload: {answer: currentQuestion.answer, option}});
  }

  return (
    <div id="question" className="d-flex flex-column align-items-center bg-primary mt-4 p-4">
      <p> Questão {quizzState.currentQuestion + 1} de {quizzState.questions.length}</p>
      <h2>{currentQuestion.question}</h2>
      <div id="question-options" className="py-4 d-flex gap-3 flex-column w-100">
        {currentQuestion.options.map(( option: any) =>
          <Option 
            className="option"
            key={option}
            option={option}
            answer={currentQuestion.answer}
            selectOption={() => onSelectOption(option)}
          />
        )}
      </div>
      { quizzState.answerSelected && (
        <div className="d-flex flex-column align-items-center">
          <p className="correct-answer">Resposta correta: {currentQuestion.answer}</p>
          <p className="feedback">{currentQuestion.feedback}</p>
        </div>
      )}
      { quizzState.answerSelected && (
        <Button variant="dark" onClick={() => dispatch({type: "CHANGE_QUESTION"})} className="border mt-3">Continuar</Button>
      )}
    </div>
  )
}