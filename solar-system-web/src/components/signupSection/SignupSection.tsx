import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './SignupSection.css';
import { Container, Card, Form, Button } from 'react-bootstrap';

export default function SignupSection() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <Container className="d-flex align-items-center position-absolute">
      <Card className="p-4 w-100" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title className="text-center">Space Travel</Card.Title>
          <Card.Text className="text-center">Por favor, registre sua conta</Card.Text>
          <Form onSubmit={onSubmit}>
            {/* <Form.Group controlId="formBasicUser">
              <Form.Control
                type="text"
                placeholder="Usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </Form.Group> */}
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="btn-block w-100 mt-4">
              Registrar
            </Button>
          </Form>
          <Card.Text className="text-center mt-3">
            Já possui uma conta?
            <NavLink className="ms-2" to="/">
              Entrar
            </NavLink>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}