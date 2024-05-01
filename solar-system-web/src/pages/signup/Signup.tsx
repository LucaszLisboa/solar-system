import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "../../components/planets/Earth";
import SignupSection from "../../components/signupSection/SignupSection";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export function Signup() {
  return (
    <CanvasContainer>
      <SignupSection />
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  )
}
