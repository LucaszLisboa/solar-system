import { signOut, getAuth } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar as NavbarComponent } from "react-bootstrap";
import "./Navbar.css";
import { VoiceAssistantContext } from "../../context/VoiceAssistantContext";
import { useContext } from "react";

interface NavbarProps {
  user: string | null | undefined;
}

export function Navbar({ user }: NavbarProps) {
  const voiceAssistantContext = useContext(VoiceAssistantContext);
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
          <Nav.Link as={NavLink} to="/pictureOfDay">Picture of Day NASA</Nav.Link>
        </Nav>
        <Nav className="d-flex align-items-center flex-row gap-3">
          <Nav.Item>
            <span>Olá <b>{user}</b></span>
          </Nav.Item>
          <Nav.Item>
            <button onClick={() => voiceAssistantContext?.ChangeVoiceAssistantStatus()}>
              {/* trocar por icones de som ativo e som desativado */}
              {voiceAssistantContext?.isVoiceAssistantActive ? 'Deactivate Voice Assistant' : 'Activate Voice Assistant'}
            </button>
          </Nav.Item>
          <Nav.Item>
            <button onClick={handleSignOut}>Sair</button>
          </Nav.Item>
        </Nav>
      </Container>
    </NavbarComponent>
  )
}

