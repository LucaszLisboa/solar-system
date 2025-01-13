import { useContext, useEffect, useState } from "react";
import { QuizzContext } from "../../context/QuizzContext";
import { doc, setDoc } from "firebase/firestore"; 
import { Context } from "../../context/AuthContext";
import { db } from "../../firebase";
import "./GameOver.css";
import { Button } from "react-bootstrap";

export function GameOver() {
  const userContext = useContext(Context);
  const quizzContext = useContext(QuizzContext);
  if (!quizzContext) {
    throw new Error("GameOver deve estar dentro de um QuizzProvider!");
  }
  const [quizzState, dispatch] = quizzContext;
  const userId = userContext?.user?.uid;

  useEffect(() => {
    verifyUserScore();
  }, []);

  const verifyUserScore = async () => {
    if (quizzState.score === quizzState.questions.length) {
      addTrophyToUser();
    }
  };

  const addTrophyToUser = async () => {
    try{
      // Adiciona troféu ao usuário
      if (userId) {
        const userRef = doc(db, "trophyUsers", userId);
        await setDoc(userRef, {
          trophies: true
        }, 
        { merge: true });
      } else {
        console.error("User ID is undefined");
      }
    } catch (error) {
      console.error("Erro ao adicionar trofeu ao usuário: ", error);
    }
  };

  return (
    <div id="gameOver" className="mt-4">
      <h2>Fim do Quizz!</h2>
      <p>
        Você acertou {quizzState.score} de {quizzState.questions.length} perguntas.
      </p>

      {quizzState.score === quizzState.questions.length ? (
        <div>
          <p className="trophy-message">
            Parabéns! Você acertou todas as questões e receberá um troféu como recompensa!
          </p>
          <i className="bi bi-trophy-fill text-warning" title="Conquista Quizz I" style={{ fontSize: '3.2rem' }}></i>
        </div>
      ) : (
        <p>
          Estude mais e tente novamente para acertar todas as questões e ganhar um troféu!
        </p>
      )}
      <Button variant="dark" className="mt-4 border" onClick={() => dispatch({ type: "NEW_GAME" })}>Reiniciar</Button>
    </div>
  );
}