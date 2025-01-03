import { useContext } from "react";
import { QuizzContext } from "../../context/QuizzContext";

export function GameOver (){
  const quizzContext = useContext(QuizzContext);
  if (!quizzContext) {
    throw new Error("GameOver deve estar dentro de um QuizzProvider!");
  }
  const [quizzState, dispatch] = quizzContext;

  return (
    <div id="gameOver">
      <h2>Fim do Quizz!</h2>
      <p>Pontuação: {quizzState.score}</p>
      <p>
        Você acertou {quizzState.score} de {quizzState.questions.length} perguntas.
      </p>
      {/* <img src="" alt="" /> */}
      <button onClick={() => dispatch({type: "NEW_GAME"})}>Reiniciar</button>
    </div>
  )
}