import { useEffect } from "react";
import "./PlanetInfoPanel.css";
import { Container } from 'react-bootstrap';

interface PlanetInfoPanelProps {
  planetInfo: {
    name: string;
    resume: string;
    features: {
      Diameter: string;
      gravity: string;
      orbitalPeriod: string[];
      sunDistance: string;
      temperature: string;
    }
  } | null;
  onClose: () => void;
}

export function PlanetInfoPanel({ planetInfo, onClose}: PlanetInfoPanelProps) {
  if(!planetInfo) return null;

  useEffect(() => {
    console.log(planetInfo);
  }, [planetInfo]);

  const handleClose = () => {
    onClose();
  }

  return (
    <Container>
      {planetInfo && (
        <div className="planetInfoPanel">
          <h1>{planetInfo?.name}</h1>
          <p>{planetInfo?.resume}</p>
          <h2>Características</h2>
          <p>Diametro: {planetInfo?.features.Diameter}</p>
          <p>Gravidade: {planetInfo?.features.gravity}</p>
          <p>Período Orbital: {planetInfo?.features.orbitalPeriod[0]}</p>
          <p>Distância do Sol: {planetInfo?.features.sunDistance}</p>
          <p>Temperatura: {planetInfo?.features.temperature}</p>
          <button onClick={handleClose}>Fechar</button>
        </div>
      )}
    </Container>
  )
}