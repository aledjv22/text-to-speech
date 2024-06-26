import { HfInference } from '@huggingface/inference';
import { config } from './config.js';
import { saveAudio, playAudio } from './audio.service.js';

export async function generateAudioFromText(texto: string) {
  const hf = new HfInference(config.hfAccessToken);
  const respuesta = await hf.textToSpeech({
    inputs: texto,
    model: 'facebook/mms-tts-spa'
  });
  return Buffer.from(await respuesta.arrayBuffer());
}

export async function saveTextToSpeech(texto: string) {
  try {
    const bufferAudio = await generateAudioFromText(texto);
    const rutaTemporal = 'output_temp.flac';
    saveAudio(bufferAudio, rutaTemporal);

    playAudio(rutaTemporal);
  } catch (error) {
    console.error('Error al generar el texto a voz:', error);
  }
}