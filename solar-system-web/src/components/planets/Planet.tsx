import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { MouseEventHandler, useRef } from "react";
import { animated } from '@react-spring/three'
import * as THREE from "three";
import { OrbitLine } from "./OrbitLine";

import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import RingTextureMap from "../../assets/textures/saturn_ring.png";

interface PlanetProps {
  name: string;
  positionPlanet: number[];
  planetMapTexture: string;
  size: number;
  speedPlanetOrbit: number;
  orbitLineColor: string;
  customClick?: MouseEventHandler;
}

export function Planet({ name, positionPlanet, planetMapTexture, size, speedPlanetOrbit, orbitLineColor, customClick }: PlanetProps) {
  const [colorMap, specularMap, cloudsMap] = useLoader(TextureLoader, [planetMapTexture, EarthSpecularMap, EarthCloudsMap]);
  const [colorRingMap] = useLoader(TextureLoader, [RingTextureMap]);

  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const orbitTimeRef = useRef(0); // Armazena tempo acumulado sem re-renderizar

  // Calcular a distância inicial com base na posição do planeta
  const orbitRadius = Math.sqrt(positionPlanet[0] ** 2 + positionPlanet[2] ** 2);

  useFrame((_, delta) => {
    const planet = planetRef.current;
    const clouds = cloudsRef.current;
    const ring = ringRef.current;

    // Atualizar tempo de órbita sem renderização extra
    orbitTimeRef.current += delta * speedPlanetOrbit;

    const newX = Math.cos(orbitTimeRef.current) * orbitRadius;
    const newZ = Math.sin(orbitTimeRef.current) * orbitRadius;

    if (planet) {
      planet.position.set(newX, positionPlanet[1], newZ);
      planet.rotation.y += delta / 40;
    }
    if (clouds) {
      clouds.position.set(newX, positionPlanet[1], newZ);
      clouds.rotation.y += delta / 40;
    }
    if (ring) {
      ring.position.set(newX, positionPlanet[1], newZ);
    }
  });

  const handleClick = (planetName: any) => {
    customClick && customClick(planetName);
  }

  return (
    <>
      <OrbitLine innerRadius={orbitRadius} outerRadius={orbitRadius} lineColor={orbitLineColor} />
      {name === 'Terra' && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[size, 64, 64]} />
          <meshPhongMaterial
            map={cloudsMap}
            opacity={0.4}
            depthWrite={true}
            transparent={true}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      <animated.mesh ref={planetRef} onClick={handleClick}>
        <sphereGeometry args={[size, 64, 64]} />
        {name === 'Terra' && (
          <meshPhongMaterial specularMap={specularMap} />
        )}
        <meshStandardMaterial
          map={colorMap}
          metalness={0.4}
          roughness={0.7}
        />
      </animated.mesh>
      {name === 'Saturno' && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size + 1, size + 9, 128]} />
          <meshBasicMaterial
            map={colorRingMap}
            side={THREE.DoubleSide}
            transparent={true}
          />
        </mesh>
      )}
    </>
  );
}