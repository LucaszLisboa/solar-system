import { useContext, useEffect, useState } from "react";
import { QuizzContext } from "../../context/QuizzContext";
import { doc, setDoc } from "firebase/firestore"; 
import { Context } from "../../context/AuthContext";
import { db } from "../../firebase";
import "./GameOver.css";

export function GameOver() {
  const userContext = useContext(Context);
  const quizzContext = useContext(QuizzContext);
  const [showConfetti, setShowConfetti] = useState(false);
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
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
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
        <p className="trophy-message">
          Parabéns! Você acertou todas as questões e receberá um troféu como recompensa!
        </p>
      ) : (
        <p>
          Estude mais e tente novamente para acertar todas as questões e ganhar um troféu!
        </p>
      )}

      {showConfetti && (
        <div className="confetti">

        </div>
      )}

      <button className="mt-4" onClick={() => dispatch({ type: "NEW_GAME" })}>Reiniciar</button>
    </div>
  );
}