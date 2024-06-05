import "./Login.css";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "../../components/planets/Earth";
import LoginSection from "../../components/loginSection/LoginSection";
import { Stars } from "@react-three/drei";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export function Login() {
  return (
    <div className="d-flex">
      <CanvasContainer>
        <Canvas>
          <Suspense fallback={null}>
            <Stars
              radius={300}
              depth={60}
              count={12000}
              factor={8}
              saturation={0}
              fade={true}
            />
            <Earth positionPlanet={[-0.7, 0, 3.3]} positionLight={[2, 0, 6]} />
          </Suspense>
        </Canvas>
      </CanvasContainer>
      <LoginSection />
    </div>
  );
}

