import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Container, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from "../auth/useAuth";
import './SignupSection.css';

export default function SignupSection() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { registerWithEmailAndPassword, error, loading } = useAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerWithEmailAndPassword(username, email, password, confirmPassword);
  }

  return (
    <Container className="d-flex align-items-center position-absolute justify-content-end">
      <Card className="p-4 w-100" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <Card.Title className="text-center"><h3>Viagem ao Espaço</h3></Card.Title>
          <Card.Text className="text-center">Por favor, registre sua conta</Card.Text>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicUser">
              <Form.Control
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Confirme a senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>
            <button type="submit" className="btn-block w-100 mt-4" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Registrar'}
            </button>
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