import { useContext, useEffect, useState } from "react";
import { Button, Container } from 'react-bootstrap';
import { VoiceAssistantContext } from "../../context/VoiceAssistantContext";
import "./PlanetInfoPanel.css";

interface PlanetInfoPanelProps {
  planetInfo: {
    name: string;
    resume: string;
    features: {
      Diameter: string;
      gravity: string;
      orbitalPeriod: string[];
      orbitalSpeed: string;
      radius: string;
      rotationDuration: string;
      satellites: {
        names: string[];
        number: number;
      };
      sunDistance: string;
      temperature: string;
    }
  } | null;
  onClose: () => void;
}

export function PlanetInfoPanel({ planetInfo, onClose}: PlanetInfoPanelProps) {
  if(!planetInfo) return null;
  const voiceAssistantContext = useContext(VoiceAssistantContext);

  const [orbitalPeriodExpanded, setOrbitalPeriodExpanded] = useState(false);
  const [satellitesExpanded, setSatellitesExpanded] = useState(false);

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR'; // Idioma da fala
    utterance.rate = 1.3; // Velocidade da fala (1 é normal)
    utterance.pitch = 0.4; // Tom da voz
    speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    verifyVoiceAssistant();
  }, [planetInfo]);

  const verifyVoiceAssistant = () => {
    speechSynthesis.cancel();
    if(voiceAssistantContext?.isVoiceAssistantActive){
      speakInformationsPlanet(planetInfo);
    }
  }

  const speakInformationsPlanet = (planetInfo: any) => {
    speak(`
      Planeta ${planetInfo?.name}. ${planetInfo?.resume}`
    );
    speak(`
      Dimensões Físicas. 
      Diâmetro: ${planetInfo?.features.Diameter}. 
      Raio: ${planetInfo?.features.radius}`
    );
    speak(`
      Propriedades Gravitacionais. 
      Gravidade: ${planetInfo?.features.gravity}. 
      Duração da Rotação: ${planetInfo?.features.rotationDuration}`
    );
    speak(`
      Propriedades Orbitais. 
      Período Orbital. 
      Dias: ${planetInfo?.features.orbitalPeriod[0]}. 
      Anos: ${planetInfo?.features.orbitalPeriod[1]}. 
      Velocidade Orbital: ${planetInfo?.features.orbitalSpeed}. 
      Distância do Sol: ${planetInfo?.features.sunDistance}`
    );
    speak(`
      Satélites Naturais e Temperatura. 
      Principais Satélites. ${planetInfo?.features.satellites.names.join(', ')}. 
      Total: ${planetInfo?.features.satellites.number}. 
      Temperatura: ${planetInfo?.features.temperature}`
    );
  }

  const toggleExpandOrbitalPeriod = () => {
    setOrbitalPeriodExpanded(!orbitalPeriodExpanded);
  };

  const toggleExpandSatellites = () => {
    setSatellitesExpanded(!satellitesExpanded);
  };

  return (
    <Container>
      {planetInfo && (
        <>
          <div className="buttonClose">
            <button className="px-3" onClick={onClose}>Fechar</button>
          </div>
          <div className="planetInfoPanel d-flex flex-column align-items-start">
            <div>
              <h1 className="text-info fw-bold">{planetInfo?.name}</h1>
              <p>{planetInfo?.resume}</p>
            </div>
            <hr className="bg-white w-100"/>
            <div className="w-100">
              <h5 className="text-info fw-bold">Dimensões Físicas</h5>
              <p>Diametro: {planetInfo?.features.Diameter}</p>
              <p>Raio: {planetInfo?.features.radius}</p>
              <hr className="w-100"/>
            </div>
            <div className="w-100">
              <h5 className="text-info fw-bold">Propriedades Gravitacionais</h5>
              <p>Gravidade: {planetInfo?.features.gravity}</p>
              <p>Duração da Rotaçao: {planetInfo?.features.rotationDuration}</p>
              <hr className="w-100"/>
            </div>
            <div className="w-100">
              <h5 className="text-info fw-bold">Propriedades Orbitais</h5>
              <div className="fw-bold">
                <p  onClick={toggleExpandOrbitalPeriod} style={{ cursor: "pointer", userSelect: "none" }}>
                  Período Orbital {""}
                  <span style={{ transform: orbitalPeriodExpanded ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block" }}>
                    ➤
                  </span>
                </p>
                {orbitalPeriodExpanded && (
                  <ul>
                    <li>Dias: {planetInfo?.features.orbitalPeriod[0]}</li>
                    <li>Anos: {planetInfo?.features.orbitalPeriod[1]}</li>
                  </ul>
                )}
              </div>
              <p>Velocidade Orbital: {planetInfo?.features.orbitalSpeed}</p>
              <p>Distância do Sol: {planetInfo?.features.sunDistance}</p>
              <hr className="w-100"/>
            </div>
            <div className="w-100">
              <h5 className="text-info fw-bold">Satélites Naturais e Temperatura</h5>
              <div className="fw-bold">
                <p onClick={toggleExpandSatellites} style={{ cursor: "pointer", userSelect: "none" }}>
                  Principais Satélites {""}
                  <span style={{ transform: satellitesExpanded ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block" }}>
                    ➤
                  </span>
                </p>
                {satellitesExpanded && (
                  <ul>
                    {planetInfo?.features?.satellites.names.map((satellite:string, index:number) => (
                      <li key={index}>{satellite}</li>
                    ))}
                    Total: {planetInfo?.features?.satellites.number}
                  </ul>
                )}
              </div>
              <p>Temperatura: {planetInfo?.features.temperature}</p>
            </div>
          </div>
        </>
      )}
    </Container>
  )
}