import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './LoginSection.css';
import { Container, Card, Form, Alert, Spinner, Button } from 'react-bootstrap';
import { useAuth } from "../auth/useAuth";

export default function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithEmailAndPassword, loginWithGoogle, error, loading } = useAuth();

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginWithEmailAndPassword(email, password);
  }

  return (
    <Container className="d-flex align-items-center position-absolute justify-content-end">
      <Card className="p-4 w-100" style={{ maxWidth: '500px' }}>
        <Card.Body>
        <Card.Title className="text-center"><h3>Viagem ao Espaço</h3></Card.Title>
          <Card.Text className="text-center">Por favor, faça login na sua conta</Card.Text>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>
            <Button type="submit" className="btn-block w-100 mt-4" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Entrar'}
            </Button>
          </Form>
          <hr className="my-4 hr-text" data-content="OU" />
          <Button variant="light" className="btn-block d-flex align-items-center justify-content-center w-100 gap-2 border" onClick={loginWithGoogle} disabled={loading}>
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