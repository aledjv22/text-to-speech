import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();


async function saveTextToSpeech() {
  const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
  const text = 'Hola, como estas?';

  const response = await hf.textToSpeech({
    inputs: text,
    model: 'facebook/mms-tts-spa'
  });

  console.log('Respuesta de la API de Hugging Face: ', response);

  const buffer = await response.arrayBuffer();
  const bufferNode = Buffer.from(buffer);
  fs.writeFileSync('output.flac', bufferNode);

  console.log('\nArchivo de audio guardado como output.flac');
}

saveTextToSpeech();