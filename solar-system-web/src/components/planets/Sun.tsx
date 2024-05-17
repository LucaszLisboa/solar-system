import { useFrame, useLoader } from "@react-three/fiber";
import SunNormalMap from "../../assets/textures/8k_sun.jpg";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";

export function Sun() {
  const [colorMap, normalMap] = useLoader(TextureLoader, [SunNormalMap])
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const sun = sunRef.current;
    if (sun) {
      sun.rotation.y = elapsedTime / 9;
    }
  });

  return (
    <>
      <pointLight color="#f6f3ea" position={[0, 0, 0]} intensity={20} decay={0.3} />
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 35, 35]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0}
          roughness={0.7}
        />
      </mesh>
    </>
  )
}