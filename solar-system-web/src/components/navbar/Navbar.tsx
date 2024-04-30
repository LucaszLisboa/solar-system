import { signOut, getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
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
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/quizz">Quizz</Link></li>
        <li><Link to="/login">Login</Link></li>
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

