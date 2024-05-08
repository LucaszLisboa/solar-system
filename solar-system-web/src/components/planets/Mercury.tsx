import { useFrame, useLoader } from "@react-three/fiber";
import MercuryNormalMap from "../../assets/textures/8k_mercury.jpg";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitLine } from "./OrbitLine";

export function Mercury() {
  const [colorMap, normalMap] = useLoader(TextureLoader, [MercuryNormalMap])
  const mercuryRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const mercury = mercuryRef.current;
    if (mercury) {
      const orbitRadius = 3;
      const orbitSpeed = 1;

      // Calcula a nova posição do planeta na órbita
      const newX = Math.cos(elapsedTime * orbitSpeed) * orbitRadius;
      const newZ = Math.sin(elapsedTime * orbitSpeed) * orbitRadius;

      // Atualiza a posição do planeta
      mercury.position.set(newX, 0, newZ);
      mercury.rotation.y = elapsedTime / 6;
    }
  });

  return (
    <>
      <OrbitLine innerRadius={3} outerRadius={3} lineColor="gray" />
      <mesh ref={mercuryRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
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