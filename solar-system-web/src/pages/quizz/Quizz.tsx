import styled from "styled-components";
import { Navbar } from "../../components/navbar/Navbar";
import { Context } from "../../context/AuthContext";
import { useContext } from "react";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export function Quizz() {
  const context = useContext(Context);


  return (
    <CanvasContainer className="canvasContainer">
      <Navbar user={context?.user?.email} />
      <h1>QUIZZ</h1>
    </CanvasContainer>
  )
}