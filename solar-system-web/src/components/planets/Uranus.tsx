import { useFrame, useLoader } from "@react-three/fiber";
import UranusNormalMap from "../../assets/textures/2k_uranus.jpg";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitLine } from "./OrbitLine";

export function Uranus() {
  const [colorMap, normalMap] = useLoader(TextureLoader, [UranusNormalMap])
  const uranusRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const uranus = uranusRef.current;
    if (uranus) {
      uranus.rotation.y = elapsedTime / 6;
    }
  });

  return (
    <>
      <OrbitLine innerRadius={21} outerRadius={21} lineColor="#90E7FF" />
      <mesh ref={uranusRef} position={[0, 0, 21]}>
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