import React, { useEffect, useContext } from 'react';
import { signOut, getAuth } from "firebase/auth";
import { Context } from '../../context/AuthContext';

export function Home() {
  const context = useContext(Context);
  const auth = getAuth();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      let errorMessage = "Erro ao fazer logout";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
  }

  useEffect(() => {
    console.log("CONTEXT: ", context)
  }, [])

  return (
    <div>
      <h1>This is my Home Page</h1>
      <h2>{context?.user?.email}</h2>
      <button onClick={() => { handleSignOut() }}></button>
    </div>

  )
}