import React, { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import './LoginSection.css';
import { Container, Card, Form, Button } from 'react-bootstrap';

export default function LoginSection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        //abrir modal de erro
      })
  }

  return (
    <Container className="d-flex align-items-center position-absolute">
      <Card className="p-4 w-100" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title className="text-center">Space Travel</Card.Title>
          <Card.Text className="text-center">Por favor, faça login na sua conta</Card.Text>
          <Form onSubmit={onLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="btn-block w-100 mt-4">
              Entrar
            </Button>
          </Form>
          <hr className="my-4 hr-text" data-content="OU" />
          <Button variant="light" className="btn-block d-flex align-items-center justify-content-center w-100 gap-2">
            <img className="mr-2" src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" width="20" />
            Entrar com Google
          </Button>
          <Card.Text className="text-center mt-3">
            Não possui uma conta?
            <NavLink className="ms-2" to="/signup">
              Registre-se
            </NavLink>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}