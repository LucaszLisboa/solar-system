import { useFrame, useLoader } from "@react-three/fiber";
import JupiterNormalMap from "../../assets/textures/8k_jupiter.jpg";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitLine } from "./OrbitLine";

export function Jupiter() {
  const [colorMap, normalMap] = useLoader(TextureLoader, [JupiterNormalMap])
  const jupiterRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const jupiter = jupiterRef.current;
    if (jupiter) {
      jupiter.rotation.y = elapsedTime / 6;
    }
  });

  return (
    <>
      <OrbitLine innerRadius={15} outerRadius={15} lineColor="#DD8900" />
      <mesh ref={jupiterRef} position={[0, 0, 15]}>
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