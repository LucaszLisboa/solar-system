import { useContext, useEffect } from "react";
import "./PlanetInfoPanel.css";
import { Container } from 'react-bootstrap';
import { VoiceAssistantContext } from "../../context/VoiceAssistantContext";

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
  const voiceAssistantContext = useContext(VoiceAssistantContext);

  function speakPlanetInfo(text: string) {
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
      speakPlanetInfo(`Planeta ${planetInfo?.name}. ${planetInfo?.resume}`);
      // colocar o restante das informações
    }
  }

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