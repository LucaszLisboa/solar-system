import "./Login.css";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "../../components/earth/Earth";
import LoginSection from "../../components/loginSection/LoginSection";
// import { TopSection } from "./components/topSection";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export function Login(){
 return (
  <CanvasContainer> 
    <LoginSection />
    <Canvas>
      <Suspense fallback={null}>
        <Earth/>
      </Suspense> 
    </Canvas>
  </CanvasContainer>
 );
}

