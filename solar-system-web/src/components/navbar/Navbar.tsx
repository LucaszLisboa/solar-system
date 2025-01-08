import { signOut, getAuth } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar as NavbarComponent } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./Navbar.css";
import { VoiceAssistantContext } from "../../context/VoiceAssistantContext";
import { useContext, useEffect, useState } from "react";;
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../firebase";

interface NavbarProps {
  user: string | null | undefined;
}

export function Navbar({ user }: NavbarProps) {
  const voiceAssistantContext = useContext(VoiceAssistantContext);
  const auth = getAuth();
  const userId = auth?.currentUser?.uid;
  const [trophies, setTrophies] = useState<boolean>(false);

  useEffect(() => {
    checkUserTrophies();
  }, []);  

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      let errorMessage = "Erro ao fazer logout";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);
    }
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
    <NavbarComponent bg="black" data-bs-theme="dark" expand="lg" className="bg-gradient w-100">
      <Container fluid>
        <Nav className="flex-row gap-3">
          <NavbarComponent.Brand as={NavLink} to="/home">
            <img
              src="src\assets\icons\planeta-terra.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Terra logo"
            />
          </NavbarComponent.Brand>
          <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/quizz">Quizz</Nav.Link>
          <Nav.Link as={NavLink} to="/curiosidades">Curiosidades</Nav.Link>
        </Nav>
        <Nav className="d-flex align-items-center flex-row gap-3">
          <Nav.Item>
            {trophies && <i className="bi bi-trophy text-warning" title="Conquista Quizz I" style={{ fontSize: '1.6rem' }}></i>}
          </Nav.Item>
          <Nav.Item>
            <span>Olá <b>{user}</b></span>
          </Nav.Item>
          <Nav.Item>
            <button className="p-0 bg-transparent border-0" onClick={() => voiceAssistantContext?.ChangeVoiceAssistantStatus()} title="Assistência de leitura">
              {voiceAssistantContext?.isVoiceAssistantActive ? 
              <i className="bi bi-volume-up text-info" style={{ fontSize: '1.6rem' }}></i> : 
              <i className="bi bi-volume-mute text-danger" style={{ fontSize: '1.6rem' }}></i>}
            </button>
          </Nav.Item>
          <Nav.Item>
            <button className="p-0 bg-transparent border-0"  onClick={handleSignOut} title="Sair">
              <i className="bi bi-box-arrow-right text-danger" style={{ fontSize: '1.5rem' }}></i>
            </button>
          </Nav.Item>
        </Nav>
      </Container>
    </NavbarComponent>
  )
}

