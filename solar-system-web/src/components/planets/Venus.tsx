import { useFrame, useLoader } from "@react-three/fiber";
import VenusNormalMap from "../../assets/textures/4k_venus_atmosphere.jpg";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";

export function Venus() {
  const [colorMap, normalMap] = useLoader(TextureLoader, [VenusNormalMap])
  const venusRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const venus = venusRef.current;
    if (venus) {
      venus.rotation.y = elapsedTime / 6;
    }
  });

  return (
    <>
      <mesh ref={venusRef} position={[0, 0, 3]}>
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