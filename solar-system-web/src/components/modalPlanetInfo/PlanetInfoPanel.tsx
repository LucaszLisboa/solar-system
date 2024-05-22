import { useEffect, useState } from "react";
import "./PlanetInfoPanel.css";

export function PlanetInfoPanel({ planetInfo }) {
  const [showPlanetInfo, setShowPlanetInfo] = useState(false);

  useEffect(() => {
    setShowPlanetInfo(planetInfo);
    console.log(planetInfo);
  }, [planetInfo]);

  const handleClose = () => {
    setShowPlanetInfo(false);
    // camera deve voltar ao normal
  }

  return (
    <>
      {showPlanetInfo && (
        <div className="planetInfoPanel">
          <h1>{planetInfo?.name}</h1>
          <p>{planetInfo?.resume}</p>
          <h2>Características</h2>
          <p>Diametro: {planetInfo?.features.Diameter}</p>
          <p>Gravidade: {planetInfo?.features.gravity}</p>
          <p>Período Orbital: {planetInfo?.features.orbitalPeriod[0]}</p>
          <p>Distância do Sol: {planetInfo?.features.sunDistance}</p>
          <p>Temperatura: {planetInfo?.features.temperature}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </>
  )
}