import { useContext, useState, Suspense, useEffect } from 'react';
import { Context } from '../../context/AuthContext';
import { Navbar } from '../../components/navbar/Navbar';
import "./Home.css";
import { Canvas, useFrame } from '@react-three/fiber';
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
import { PlanetInfoPanel } from '../../components/modalPlanetInfo/PlanetInfoPanel';
import { Vector3 } from 'three';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export function Home() {
  const context = useContext(Context);
  const [selectedPlanetInfo, setSelectedPlanetInfo] = useState<any>(null);
  const [velocidadeTranslacao, setVelocidadeTranslacao] = useState(0.01);

  const planetsDataRender = [
    { name: 'Mercúrio', position: [0, 0, 28], texture: MercuryTextureMap, size: 3.2, speedOrbit: 1, orbitColor: "gray" },
    { name: 'Vênus', position: [0, 0, 44], texture: VenusTextureMap, size: 5.8, speedOrbit: 0.4, orbitColor: "yellow" },
    { name: 'Terra', position: [0, 0, 62], texture: EarthTextureMap, size: 6, speedOrbit: 0.35, orbitColor: "#00A5D4" },
    { name: 'Marte', position: [0, 0, 78], texture: MarsTextureMap, size: 4, speedOrbit: 0.3, orbitColor: "#DF3434" },
    { name: 'Júpiter', position: [0, 0, 100], texture: JupiterTextureMap, size: 12, speedOrbit: 0.07, orbitColor: "#DD8900" },
    { name: 'Saturno', position: [0, 0, 138], texture: SaturnTextureMap, size: 10, speedOrbit: 0.03, orbitColor: "#785500" },
    { name: 'Urano', position: [0, 0, 176], texture: UranusTextureMap, size: 7, speedOrbit: 0.025, orbitColor: "#90E7FF" },
    { name: 'Netuno', position: [0, 0, 200], texture: NeptuneTextureMap, size: 7, speedOrbit: 0.009, orbitColor: "#2C5FC3" }
  ]

  const handlePlanetClick = (planetName: string) => {
    const response = planetsData.planets;
    const planetInfo = response.find(planet => planet.name === planetName);
    if(planetInfo){
      setSelectedPlanetInfo(planetInfo);
    }
  }

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    }
  }, []);

  const handlePlanetClose = () => {
    speechSynthesis.cancel();
    setSelectedPlanetInfo(null);
  }

  return (
    <CanvasContainer className="canvasContainer">
      <Navbar user={context?.user?.displayName} />
      <PlanetInfoPanel planetInfo={selectedPlanetInfo} onClose={handlePlanetClose} />
      <div className="velocidadeTranslacao">
        <label>Velocidade: {velocidadeTranslacao.toFixed(2)}</label>
        <input type="range" min="0.01" max="10" step="0.001" value={velocidadeTranslacao} onChange={(e) => setVelocidadeTranslacao(Number(e.target.value))} className='inputRange' />
      </div>
      <Canvas>
        <Suspense fallback={null}>
          <Stars
            radius={300}
            depth={6000}
            count={12000}
            factor={8}
            saturation={0}
            fade={true}
          />
          <ambientLight intensity={2} />
          <Bounds fit clip observe margin={1.2}>
            <SelectToZoom>
              <Sun
                customClick={() => handlePlanetClick('Sol')} 
              />
              {planetsDataRender.map((planet, index) => (
                <Planet
                  key={index}
                  name={planet.name}
                  positionPlanet={planet.position}
                  planetMapTexture={planet.texture}
                  size={planet.size}
                  speedPlanetOrbit={planet.speedOrbit * velocidadeTranslacao} 
                  orbitLineColor={planet.orbitColor}
                  customClick={() => handlePlanetClick(planet.name)}
                />
              ))}
            </SelectToZoom>
          </Bounds>
        </Suspense>
        <OrbitControls makeDefault enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={1.2} panSpeed={0.5} rotateSpeed={0.5} />
      </Canvas>
    </CanvasContainer>
  )
}

function SelectToZoom({ children }: { children: React.ReactNode }) {
  const api = useBounds();
  const [planetRef, setPlanetRef] = useState<any>(null);

  useFrame(({ camera }) => {
    if (planetRef) {
      const planetPosition = new Vector3();
      planetRef.getWorldPosition(planetPosition);
      camera.lookAt(planetPosition);
    } else {
      api.refresh().fit();
    }
  });

  return (
    <group onClick={(e) => {
      e.stopPropagation();
      e.delta <= 2 && api.refresh(e.object).fit();
      setPlanetRef(e.object);
    }} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>
      {children}
    </group>
  )
}