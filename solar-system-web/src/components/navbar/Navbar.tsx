import { signOut, getAuth } from "firebase/auth";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

interface NavbarProps {
  user: string | null | undefined;
}

export function Navbar({ user }: NavbarProps) {

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

  return (
    <nav className="navbar">
      <ul className="links">
        <li><NavLink to="/home" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>Home</NavLink></li>
        <li><NavLink to="/quizz">Quizz</NavLink></li>
        <li><NavLink to="/login">Picture of Day NASA</NavLink></li>
      </ul>
      <ul className="links">
        <li>Olá {user}</li>
        <li>
          <button onClick={() => { handleSignOut() }}> Sair </button>
        </li>
      </ul>
    </nav>
  )
}

