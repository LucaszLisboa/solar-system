import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import { TextureLoader } from "three";

type EarthProps = {
  positionPlanet: [number, number, number];
  positionLight: [number, number, number];
}

export function Earth({ positionPlanet, positionLight }: EarthProps) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap])
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const earth = earthRef.current;
    const clouds = cloudsRef.current;
    if (earth) {
      earth.rotation.y = elapsedTime / 6;
    }
    if (clouds) {
      clouds.rotation.y = elapsedTime / 6;
    }
  });

  return (
    <>
      {/* <ambientLight intensity={3}/> */}
      <pointLight color="#f6f3ea" position={positionLight} intensity={50} />
      <mesh ref={cloudsRef} position={positionPlanet}>
        <sphereGeometry args={[1.006, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={positionPlanet}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        {/* <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={0.6} panSpeed={0.5} rotateSpeed={0.4} /> */}
      </mesh>
    </>
  );
}