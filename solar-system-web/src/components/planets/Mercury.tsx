import { useFrame, useLoader } from "@react-three/fiber";
import MercuryNormalMap from "../../assets/textures/8k_mercury.jpg";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

export function Mercury() {
  const [colorMap, normalMap] = useLoader(TextureLoader, [MercuryNormalMap])
  const mercuryRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const mercury = mercuryRef.current;
    if (mercury) {
      mercury.rotation.y = elapsedTime / 6;
    }
  });

  return (
    <>
      <pointLight color="#f6f3ea" position={[2, 0, 6]} intensity={50} />
      <mesh ref={mercuryRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={0.6} panSpeed={0.5} rotateSpeed={0.4} />
      </mesh>
    </>
  )
}