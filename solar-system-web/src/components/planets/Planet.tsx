import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { MouseEventHandler, useRef, useState } from "react";
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
  const [colorMap, specularMap, cloudsMap] = useLoader(TextureLoader, [planetMapTexture, EarthSpecularMap, EarthCloudsMap])
  const [colorRingMap] = useLoader(TextureLoader, [RingTextureMap])
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);

  const planetPosition = new THREE.Vector3().fromArray(positionPlanet);

  // const { scale } = useSpring({
  //   scale: active ? 1.5 : 1,
  // });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const planet = planetRef.current;
    const clouds = cloudsRef.current;
    const ring = ringRef.current;

    const orbitRadius = positionPlanet[2];
    const orbitSpeed = speedPlanetOrbit;

    const newX = Math.cos(elapsedTime * orbitSpeed) * orbitRadius;
    const newZ = Math.sin(elapsedTime * orbitSpeed) * orbitRadius;

    if (planet) {
      planet.position.set(newX, 0, newZ);
      planet.rotation.y = elapsedTime / 6;
    }
    if (clouds) {
      clouds.position.set(newX, 0, newZ);
      clouds.rotation.y = elapsedTime / 6;
    }
    if (ring) {
      ring.position.set(newX, 0, newZ);
    }
  });

  const handleClick = (planetName: any) => {
    setActive(!active);
    customClick && customClick(planetName);
  }

  return (
    <>
      <OrbitLine innerRadius={positionPlanet[2]} outerRadius={positionPlanet[2]} lineColor={orbitLineColor} />
      {name === 'Terra' && (
        <mesh ref={cloudsRef} position={planetPosition}>
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
      <animated.mesh ref={planetRef} position={planetPosition} onClick={() => (handleClick(name))}>
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
        <mesh ref={ringRef} position={[0, 0, 138]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.1, size + 9, 128]} />
          <meshBasicMaterial
            map={colorRingMap}
            side={THREE.DoubleSide}
            transparent={true}
          />
        </mesh>
      )}
    </>
  )
}