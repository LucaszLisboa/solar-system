import { Suspense, useContext, useEffect, useState } from "react"
import styled from "styled-components";
import { Navbar } from "../../components/navbar/Navbar";
import { Context } from "../../context/AuthContext";
import { QuizzContext } from "../../context/QuizzContext";
import { Question } from "../../components/question/Question";
import { GameOver } from "../../components/gameOver/GameOver";
import "./Quizz.css";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Rocket } from "../../components/models3D/Rocket";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export function Quizz() {
  const context = useContext(Context);
  const quizzContext = useContext(QuizzContext);
  if (!quizzContext) {
    throw new Error("Quizz deve estar dentro de um QuizzProvider!");
  }
  const [quizzState, dispatch] = quizzContext;
  const [trophies, setTrophies] = useState<boolean>(false);
  const auth = getAuth();
  const userId = auth?.currentUser?.uid;

  useEffect(() => {
    if(quizzState.checkTrophy){
      checkUserTrophies();
      dispatch({ type: "TROPHY_CHECKED" });
    }
  }, [quizzState.checkTrophy]);

  const handleClickStartQuizz = () => {
    dispatch({type: "START"});
    dispatch({type: "REORDER_ANSWERS"});
  }

  const checkUserTrophies = async () => {
    if(userId){
      try {
        const userRef = doc(db, "trophyUsers", userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          if(data?.trophies){
            setTrophies(data.trophies);
          }
        }
      } catch (error) {
        console.error("Erro ao verificar troféus do usuário: ", error);
      }
    }
  }

  return (
    <CanvasContainer className="canvasContainer">
      <Navbar user={context?.user?.displayName} />
      <Canvas>
        <Suspense fallback={null}>
          <Stars
            radius={300}
            depth={60}
            count={5000}
            factor={8}
            saturation={0}
            fade={true}
          />
          <ambientLight intensity={2} />
          <Rocket positionX={-5.5} positionY={2.7} positionZ={0} />
        </Suspense>
      </Canvas>
      <div className="d-flex flex-column align-items-center justify-content-center divQuizz">
        <h1 className="title text-info">
          Quizz de Astronomia
        </h1>
        {quizzState.gameStage === "Start" && (
          <>
            <p className="title text-white py-3">Selecione o quizz abaixo para começar</p>
            <div className="d-flex gap-3">
              <div className="d-flex flex-column gap-3">
                <button className="btnQuizz" onClick={handleClickStartQuizz}>Quizz I</button>
                {trophies && <i className="bi bi-trophy-fill text-warning" title="Conquista Quizz I" style={{ fontSize: '3.2rem' }}></i>}
              </div>
              <button className="btnQuizz h-100" disabled>Quizz II</button>
              <button className="btnQuizz h-100" disabled>Quizz III</button>
            </div>
          </>
        )}
        {quizzState.gameStage === "Playing" && (
          <Question />
        )}
        {quizzState.gameStage === "End" && (
          <GameOver />
        )}
      </div>
    </CanvasContainer>
  )
}