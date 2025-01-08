import { useContext, useEffect } from "react";
import { QuizzContext } from "../../context/QuizzContext";
import { doc, setDoc } from "firebase/firestore"; 
import { Context } from "../../context/AuthContext";
import { db } from "../../firebase";

export function GameOver (){
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
    if(quizzState.score === quizzState.questions.length){
      addTrophyToUser();
      // Jogar confete para comemorar
    }
  }

  const addTrophyToUser = async () => {
    try{
      // adicionar trofeu ao usuário
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