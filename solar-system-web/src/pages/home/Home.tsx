import { useEffect, useContext, Suspense } from 'react';
import { Context } from '../../context/AuthContext';
import { Navbar } from '../../components/navbar/Navbar';
import "./Home.css";
import { Canvas } from '@react-three/fiber';
// import { Earth } from '../../components/earth/Earth';
import { Mercury } from '../../components/planets/Mercury';
import { Venus } from '../../components/planets/Venus';
import styled from "styled-components";
import { Stars } from "@react-three/drei";
import { Earth } from '../../components/planets/Earth';
import { Sun } from '../../components/planets/Sun';
import { Mars } from '../../components/planets/Mars';
import { Jupiter } from '../../components/planets/Jupiter';
import { Saturn } from '../../components/planets/Saturn';
import { Uranus } from '../../components/planets/Uranus';
import { Neptune } from '../../components/planets/Neptune';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export function Home() {
  const context = useContext(Context);

  useEffect(() => {
    console.log("CONTEXT: ", context)
  }, [])

  return (
    <CanvasContainer className="canvasContainer">
      <Navbar user={context?.user?.email} />
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
          <ambientLight intensity={2} />
          <Sun />
          <Mercury />
          <Venus />
          <Earth positionPlanet={[0, 0, 9]} positionLight={[0, 0, 0]} />
          <Mars />
          <Jupiter />
          <Saturn />
          <Uranus />
          <Neptune />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  )
}