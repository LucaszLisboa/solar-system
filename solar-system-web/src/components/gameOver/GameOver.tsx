import { useContext } from "react";
import { QuizzContext } from "../../context/QuizzContext";

export function GameOver (){
  const [quizzState, dispatch] = useContext(QuizzContext);

  const handleClickReiniciar = () => {
    dispatch({type: "END"});
  }

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