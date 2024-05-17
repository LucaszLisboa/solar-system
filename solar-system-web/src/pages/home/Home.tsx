import { useContext, useState, Suspense } from 'react';
import { Context } from '../../context/AuthContext';
import { Navbar } from '../../components/navbar/Navbar';
import "./Home.css";
import { Canvas } from '@react-three/fiber';
import styled from "styled-components";
import { Bounds, OrbitControls, Stars, useBounds } from "@react-three/drei";
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
import planetsData from "../../planetsData.json";
import { PlanetInfoPanel } from '../../components/PlanetInfoPanel';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export function Home() {
  const context = useContext(Context);
  const [selectedPlanetInfo, setSelectedPlanetInfo] = useState(null);

  const planetsDataRender = [
    { name: 'Mercúrio', position: [0, 0, 3], texture: MercuryTextureMap, size: 1, speedOrbit: 1, orbitColor: "gray" },
    { name: 'Vênus', position: [0, 0, 6], texture: VenusTextureMap, size: 1, speedOrbit: 0.08, orbitColor: "yellow" },
    { name: 'Terra', position: [0, 0, 9], texture: EarthTextureMap, size: 1, speedOrbit: 0.07, orbitColor: "#00A5D4" },
    { name: 'Marte', position: [0, 0, 12], texture: MarsTextureMap, size: 1, speedOrbit: 0.06, orbitColor: "#DF3434" },
    { name: 'Júpiter', position: [0, 0, 15], texture: JupiterTextureMap, size: 1, speedOrbit: 0.05, orbitColor: "#DD8900" },
    { name: 'Saturno', position: [0, 0, 18], texture: SaturnTextureMap, size: 1, speedOrbit: 0.03, orbitColor: "#785500" },
    { name: 'Urano', position: [0, 0, 21], texture: UranusTextureMap, size: 1, speedOrbit: 0.01, orbitColor: "#90E7FF" },
    { name: 'Netuno', position: [0, 0, 30], texture: NeptuneTextureMap, size: 1, speedOrbit: 0.008, orbitColor: "#2C5FC3" }
  ]

  const handlePlanetClick = (planetName) => {
    const response = planetsData.planets;
    const planetInfo = response.find(planet => planet.name === planetName);
    setSelectedPlanetInfo(planetInfo);
    console.log("Planet Info: ", planetInfo);
  }

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
          <Bounds fit clip observe margin={1.2}>
            <SelectToZoom>
              <Sun />
              {planetsDataRender.map((planet, index) => (
                <Planet
                  key={index}
                  name={planet.name}
                  positionPlanet={planet.position}
                  planetMapTexture={planet.texture}
                  size={planet.size}
                  speedPlanetOrbit={planet.speedOrbit}
                  orbitLineColor={planet.orbitColor}
                  customClick={() => handlePlanetClick(planet.name)}
                />
              ))}
            </SelectToZoom>
          </Bounds>
        </Suspense>
        <OrbitControls makeDefault enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={1.2} panSpeed={0.5} rotateSpeed={0.5} />
      </Canvas>
      <PlanetInfoPanel planetInfo={selectedPlanetInfo} />
    </CanvasContainer>
  )
}

function SelectToZoom({ children }: { children: React.ReactNode }) {
  const api = useBounds();

  return (
    <group onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
      {children}
    </group>
  )
}