import { useContext } from "react"
import styled from "styled-components";
import { Navbar } from "../../components/navbar/Navbar";
import { Context } from "../../context/AuthContext";
import { QuizzContext } from "../../context/QuizzContext";
import { Question } from "../../components/question/Question";
import { GameOver } from "../../components/gameOver/GameOver";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export function Quizz() {
  const context = useContext(Context);
  const [quizzState, dispatch] = useContext(QuizzContext);

  const handleClickStartQuizz = () => {
    dispatch({type: "START"});
    dispatch({type: "REORDER_ANSWERS"});
  }

  return (
    <CanvasContainer className="canvasContainer">
      <Navbar user={context?.user?.email} />
      <div className="d-flex flex-column align-items-center justify-content-center h-75">
        <h1>Quizz de Astronomia</h1>
        {quizzState.gameStage === "Start" && (
          <>
            <p>Selecione o quizz abaixo para começar</p>
            <div className="d-flex gap-3">
              <button onClick={handleClickStartQuizz}>Quizz I</button>
              <button disabled>Quizz II</button>
              <button disabled>Quizz III</button>
            </div>
          </>
        )}
        {quizzState.gameStage === "Playing" && (
          <Question/>
        )}
        {quizzState.gameStage === "End" && (
          <GameOver/>
        )}
      </div>
    </CanvasContainer>
  )
}