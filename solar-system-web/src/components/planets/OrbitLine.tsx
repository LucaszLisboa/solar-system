import { useThree } from "@react-three/fiber";
import { RingGeometry, LineLoop, LineBasicMaterial } from "three";

type OrbitLineProps = {
  innerRadius: number,
  outerRadius: number,
  lineColor: string,
}

export function OrbitLine({ innerRadius, outerRadius, lineColor }: OrbitLineProps) {
  const { scene } = useThree();

  const orbitGeometry = new RingGeometry(innerRadius, outerRadius, 256);
  const orbitMaterial = new LineBasicMaterial({ color: lineColor });
  const orbitLine = new LineLoop(orbitGeometry, orbitMaterial);

  orbitLine.rotation.x = -Math.PI / 2;
  scene.add(orbitLine);

  return null;
}

