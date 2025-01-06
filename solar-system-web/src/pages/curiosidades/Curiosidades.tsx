import { useEffect, useState } from "react"
import { Navbar } from "../../components/navbar/Navbar"
import { Context } from "../../context/AuthContext";
import { useContext } from "react";
import { YoutubeEmbed } from "./YoutubeEmbed";
import { format } from "date-fns";
// import { ptBR } from 'date-fns/locale';
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
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
        const date = new Date(data.date);
        setFormattedDate(format(date, "dd MMMM yyyy"))
        setLoading(false)
      })
      .catch((error) => console.error("Error:", error))

    translateLibre("Hello guys", "pt").then((response) => console.log(response))
  }, [])

  async function translateLibre(text: string, targetLanguage: string) {
    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: "en",
          target: targetLanguage,
          format: "text",
        })
      })
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error("Erro ao traduzir:", error);
      return "Erro ao traduzir.";
    }
  }

  return (
    <CanvasContainer className="canvasContainer">
      <Navbar user={context?.user?.displayName} />
      <h1>Curiosidade do dia</h1>
      <p>{formattedDate}</p>
      {loading ? <Spinner animation="border" /> :
        pictureOfDay.media_type === "video" ?
          <YoutubeEmbed url={pictureOfDay.url} /> : <img src={pictureOfDay.url} alt="APOD" />
      }
      <p>{pictureOfDay.title}</p>
      <p>Explicação: {pictureOfDay.explanation}</p>
    </CanvasContainer>
  )
}