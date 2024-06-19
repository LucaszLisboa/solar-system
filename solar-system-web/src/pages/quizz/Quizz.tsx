import React, { useContext } from "react"
import styled from "styled-components";
import { Navbar } from "../../components/navbar/Navbar";
import { Context } from "../../context/AuthContext";
import { Button } from "react-bootstrap";


const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export function Quizz() {
  const context = useContext(Context);

  return (
    <CanvasContainer className="canvasContainer">
      <Navbar user={context?.user?.email} />
      <h1>Quizz</h1>
      <p>Clique no botão abaixo para começar</p>
      <Button variant="primary">Iniciar Quiz</Button>
    </CanvasContainer>
  )
}