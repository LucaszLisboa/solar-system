import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";
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
}

export function Planet({ name, positionPlanet, planetMapTexture, size, speedPlanetOrbit, orbitLineColor }: PlanetProps) {
  const [colorMap, specularMap, cloudsMap] = useLoader(TextureLoader, [planetMapTexture, EarthSpecularMap, EarthCloudsMap])
  const [colorRingMap] = useLoader(TextureLoader, [RingTextureMap])
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const planetPosition = new THREE.Vector3().fromArray(positionPlanet);

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

  return (
    <>

      <OrbitLine innerRadius={positionPlanet[2]} outerRadius={positionPlanet[2]} lineColor={orbitLineColor} />
      {name === 'Earth' && (
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
      <mesh ref={planetRef} position={planetPosition}>
        <sphereGeometry args={[size, 64, 64]} />
        {name === 'Earth' && (
          <meshPhongMaterial specularMap={specularMap} />
        )}
        <meshStandardMaterial
          map={colorMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
      {name === 'Saturn' && (
        <mesh ref={ringRef} position={[0, 0, 18]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.1, 1.8, 128]} />
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