import { useEffect, useContext, Suspense } from 'react';
import { Context } from '../../context/AuthContext';
import { Navbar } from '../../components/navbar/Navbar';
import "./Home.css";
import { Canvas } from '@react-three/fiber';
import styled from "styled-components";
import { Stars } from "@react-three/drei";
import { Sun } from '../../components/planets/Sun';
import { Planet } from '../../components/planets/Planet';
import MercuryTextureMap from "../../assets/textures/8k_mercury.jpg";
import VenusTextureMap from "../../assets/textures/4k_venus_atmosphere.jpg";
import EarthTextureMap from "../../assets/textures/8k_earth_daymap.jpg";
import MarsTextureMap from "../../assets/textures/8k_mars.jpg";
import JupiterTextureMap from "../../assets/textures/8k_jupiter.jpg";
import SaturnTextureMap from "../../assets/textures/8k_saturn.jpg";
import UranusTextureMap from "../../assets/textures/2k_uranus.jpg";
import NeptuneTextureMap from "../../assets/textures/2k_neptune.jpg";


const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export function Home() {
  const context = useContext(Context);

  const planetsData = [
    { name: 'Mecury', position: [0, 0, 3], texture: MercuryTextureMap, size: 1, speedOrbit: 1, orbitColor: "gray" },
    { name: 'Venus', position: [0, 0, 6], texture: VenusTextureMap, size: 1, speedOrbit: 0.08, orbitColor: "yellow" },
    { name: 'Earth', position: [0, 0, 9], texture: EarthTextureMap, size: 1, speedOrbit: 0.07, orbitColor: "#00A5D4" },
    { name: 'Mars', position: [0, 0, 12], texture: MarsTextureMap, size: 1, speedOrbit: 0.06, orbitColor: "#DF3434" },
    { name: 'Jupiter', position: [0, 0, 15], texture: JupiterTextureMap, size: 1, speedOrbit: 0.05, orbitColor: "#DD8900" },
    { name: 'Saturn', position: [0, 0, 18], texture: SaturnTextureMap, size: 1, speedOrbit: 0.03, orbitColor: "#785500" },
    { name: 'Uranus', position: [0, 0, 21], texture: UranusTextureMap, size: 1, speedOrbit: 0.01, orbitColor: "#90E7FF" },
    { name: 'Neptune', position: [0, 0, 24], texture: NeptuneTextureMap, size: 1, speedOrbit: 0.008, orbitColor: "#2C5FC3" }
  ]

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
          {planetsData.map((planet, index) => (
            <Planet
              key={index}
              name={planet.name}
              positionPlanet={planet.position}
              planetMapTexture={planet.texture}
              size={planet.size}
              speedPlanetOrbit={planet.speedOrbit}
              orbitLineColor={planet.orbitColor}
            />
          ))}
        </Suspense>
      </Canvas>
    </CanvasContainer>
  )
}