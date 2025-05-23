import { createContext, useEffect, useReducer } from "react";
import questions from "../quizzData.json";
import { Dispatch } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const STAGES = ["Start", "Playing", "End"] as const;

interface QuizzState {
  gameStage: string;
  questions: any[];
  currentQuestion: number;
  score: number;
  answerSelected: any;
  checkTrophy: boolean;
}

type QuizzContextType = [QuizzState, Dispatch<any>];

export const QuizzContext = createContext<QuizzContextType | undefined | null >(undefined);

const initialState = {
  gameStage: STAGES[0],
  questions,
  currentQuestion: 0,
  score: 0,
  answerSelected: null,
  checkTrophy: true
}

const quizzReducer = (state: any, action: any) => {
  switch (action.type) {
    case "START":
      return { ...state, gameStage: STAGES[1] }

    case "REORDER_ANSWERS":
      const newQuestions = state.questions.map((question: any) => {
        return {
          ...question,
          answers: question.options.sort(() => Math.random() - 0.5)
        }
      })
      return { ...state, questions: newQuestions };

    case "CHANGE_QUESTION":
      let endGame = false;
      if(!questions[state.currentQuestion + 1]){
        endGame = true;
      }
      return { 
        ...state, 
        currentQuestion: state.currentQuestion + 1, 
        gameStage: endGame ? STAGES[2] : state.gameStage,
        answerSelected: null
      }

    case "NEW_GAME":
      return initialState;

    case "CHECK_ANSWER":
      if(state.answerSelected) return state;
      const answers = action.payload.answer;
      const optionSelected = action.payload.option;
      let correctAnswer = 0;
      if (answers === optionSelected) {
        correctAnswer = 1;
      }
      return { 
        ...state, 
        score: state.score + correctAnswer, 
        answerSelected: optionSelected   
      }

    case "TROPHY_CHECKED":
      return { ...state, checkTrophy: false }

    default:
      return state;
  }
}


export const QuizzProvider = ({ children }: any) => {
  const value = useReducer(quizzReducer, initialState);
  const auth = getAuth();

  // caso outro usuário entre no quizz, reiniciar o jogo
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        value[1]({ type: "NEW_GAME" });
      }
    });

    // Cleanup para evitar vazamentos de memória
    return () => unsubscribe();
  }, [auth]);

  return (
    <QuizzContext.Provider value={value}>
      {children}
    </QuizzContext.Provider>
  )
}