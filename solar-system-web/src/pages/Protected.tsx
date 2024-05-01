import { Navigate } from "react-router-dom"
import { useContext } from "react";
import { Context } from "../context/AuthContext";

type Props = {
  children: React.ReactNode
}

export function Protected({ children }: Props) {

  const contextValue = useContext(Context);

  if (!contextValue || !contextValue.user) {
    return <Navigate to="/login" replace />
  } else {
    return children;
  }
}