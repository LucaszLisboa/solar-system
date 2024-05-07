import { useFrame, useLoader } from "@react-three/fiber";
import NeptuneNormalMap from "../../assets/textures/2k_neptune.jpg";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitLine } from "./OrbitLine";

export function Neptune() {
  const [colorMap, normalMap] = useLoader(TextureLoader, [NeptuneNormalMap])
  const neptuneRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const neptune = neptuneRef.current;
    if (neptune) {
      neptune.rotation.y = elapsedTime / 6;
    }
  });

  return (
    <>
      <OrbitLine innerRadius={24} outerRadius={24} lineColor="#2C5FC3" />
      <mesh ref={neptuneRef} position={[0, 0, 24]}>
        <sphereGeometry args={[1, 35, 35]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </>
  )
}