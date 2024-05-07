import { useFrame, useLoader } from "@react-three/fiber";
import MarsNormalMap from "../../assets/textures/8k_mars.jpg";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitLine } from "./OrbitLine";

export function Mars() {
  const [colorMap, normalMap] = useLoader(TextureLoader, [MarsNormalMap])
  const marsRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const mars = marsRef.current;
    if (mars) {
      mars.rotation.y = elapsedTime / 6;
    }
  });

  return (
    <>
      <OrbitLine innerRadius={12} outerRadius={12} lineColor="#DF3434" />
      <mesh ref={marsRef} position={[0, 0, 12]}>
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