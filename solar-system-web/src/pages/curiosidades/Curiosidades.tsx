import { Suspense, useEffect, useState } from "react"
import { Navbar } from "../../components/navbar/Navbar"
import { Context } from "../../context/AuthContext";
import { useContext } from "react";
import { YoutubeEmbed } from "./YoutubeEmbed";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import "./Curiosidades.css";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Rocket } from "../../components/models3D/Rocket";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const apiKey = process.env.NASA_API_KEY

export function Curiosidades() {
  const context = useContext(Context);
  const [pictureOfDay, setPictureOfDay] = useState(Object);
  const [formattedDate, setFormattedDate] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setPictureOfDay(data)
        const date = new Date();
        setFormattedDate(format(date, "dd MMMM yyyy", { locale: ptBR }))
        setLoading(false)
      })
      .catch((error) => console.error("Error:", error))
  }, [])

  useEffect(() => {
    // Adiciona o script da API do Google Translate
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Função de inicialização
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en', // Idioma original do conteúdo
          includedLanguages: 'pt', // Define os idiomas disponíveis para tradução
          autoDisplay: false, // Desativa a barra superior
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE, // Tradução inline
        },
        'google_translate_element' // Apenas traduz este ID
      );
    };

    // Cleanup para remover o script ao sair da página
    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <CanvasContainer className="canvasContainer">
      <Navbar user={context?.user?.displayName} />
      <Canvas>
        <Suspense fallback={null}>
          <Stars
            radius={300}
            depth={60}
            count={5000}
            factor={8}
            saturation={0}
            fade={true}
          />
          <ambientLight intensity={2} />
          <Rocket positionX={6.2} positionY={-2} positionZ={0} />
        </Suspense>
      </Canvas>
      <div className="d-flex flex-column align-items-center justify-content-center curiosidades-content">
        <h1 className="curiosidades-title text-info">Curiosidade do dia</h1>
        <p className="curiosidades-date">{formattedDate}</p>
        {loading ? (
          <div className="curiosidades-loading">
            <Spinner animation="border" />
          </div>
        ) : pictureOfDay.media_type === "video" ? (
          <div className="curiosidades-media">
            <YoutubeEmbed url={pictureOfDay.url} />
          </div>
        ) : (
          <img
            className="curiosidades-image"
            src={pictureOfDay.url}
            alt="APOD"
          />
        )}
        <div className="curiosidades-text">
          <div id="google_translate_element">
            <h2 className="curiosidades-title-text">{pictureOfDay.title}</h2>
            <p className="curiosidades-explanation">
              <strong>Explicação:</strong> {pictureOfDay.explanation}
            </p>
          </div>
        </div>
      </div>
    </CanvasContainer>
  )
}