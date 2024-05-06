import { useFrame, useLoader } from "@react-three/fiber";
import SaturnNormalMap from "../../assets/textures/8k_saturn.jpg";
import RingNormalMap from "../../assets/textures/saturn_ring.png";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";

export function Saturn() {
  const [colorMap, normalMap] = useLoader(TextureLoader, [SaturnNormalMap])
  const [colorRingMap, normalRingMap] = useLoader(TextureLoader, [RingNormalMap])
  const saturnRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const saturn = saturnRef.current;
    if (saturn) {
      saturn.rotation.y = elapsedTime / 6;
    }
  });

  return (
    <>
      <mesh ref={saturnRef} position={[0, 0, 18]}>
        <sphereGeometry args={[1, 35, 35]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
      <mesh ref={ringRef} position={[0, 0, 18]} rotation={[Math.PI / 2.2, 0, 0]}>
        <ringGeometry args={[1.1, 1.8, 128]} />
        <meshBasicMaterial
          map={colorRingMap}
          alphaMap={normalRingMap}
          side={THREE.DoubleSide}
          transparent={true}
        />
      </mesh>
    </>
  )
}