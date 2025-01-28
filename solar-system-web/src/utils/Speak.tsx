export function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR'; // Idioma da fala
  utterance.rate = 1.5; // Velocidade da fala (1 é normal)
  utterance.pitch = 0.5; // Tom da voz
  speechSynthesis.speak(utterance);
}