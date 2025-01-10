import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

interface RocketProps {
  positionX?: number;
  positionY?: number;
  positionZ?: number;
}

export function Rocket({ positionX = 0, positionY = 0, positionZ = 0 }: RocketProps): JSX.Element {
  const rocket = useLoader(GLTFLoader, "/models/rocket.glb");
  const rocketRef = useRef<Group>(null);

  // Ajusta a posição e rotação do foguete ao carregá-lo
  useEffect(() => {
    if (rocket.scene) {
      rocket.scene.rotation.x = Math.PI / 2; // Rotaciona para que fique na posição correta
      rocket.scene.scale.set(1, 1, 1); // Ajusta o tamanho
    }
  }, [rocket]);

  useFrame((state, delta) => {
    if (rocketRef.current) {
      // Faz o foguete dar uma volta ao redor do eixo Y (rolando de um lado para o outro)
      rocketRef.current.rotation.y += delta * 0.3;

      rocketRef.current.position.x = positionX; // Ajusta a posição do foguete
      rocketRef.current.position.y = positionY; // Ajusta a altura do foguete
      rocketRef.current.position.z = positionZ; // Ajusta a posição do foguete

      // Efeito de movimento para frente e para trás (opcional)
      rocketRef.current.position.x += Math.sin(state.clock.elapsedTime) * 0.2;
      rocketRef.current.position.y += Math.cos(state.clock.elapsedTime) * 0.2;
    }
  });

  return <primitive ref={rocketRef} object={rocket.scene} />;
}