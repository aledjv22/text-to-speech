import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
import fs from 'fs';
import Speaker from 'speaker';
import ffmpeg from 'fluent-ffmpeg';

dotenv.config();

async function generateAudioFromText(texto) {
  const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
  const respuesta = await hf.textToSpeech({
    inputs: texto,
    model: 'facebook/mms-tts-spa'
  });
  return Buffer.from(await respuesta.arrayBuffer());
}

function saveAudio(buffer, rutaArchivo) {
  fs.writeFileSync(rutaArchivo, buffer);
}

function playAudio(rutaArchivo) {
  if (fs.existsSync(rutaArchivo)) {
    const stream = fs.createReadStream(rutaArchivo);
    const speaker = new Speaker({
      channels: 2, // Número de canales de audio
      bitDepth: 16, // Determina la calidad del audio
      sampleRate: 9500 // Determina la velocidad de muestreo del audio
    });

    const command = ffmpeg(stream)
      .toFormat('s16le')
      .pipe(speaker);

    command.on('error', (err) => {
      console.error('Error al reproducir el archivo:', err);
    });

    speaker.on('close', () => {
      console.log('Reproducción finalizada.');
    });
  } else {
    console.error('El archivo de audio no existe o no se creó correctamente.');
  }
}

async function saveTextToSpeech() {
  try {
    const texto = 'Hola, como estas? Mi nombre es Alejandro y tengo veintitrés años.';
    const bufferAudio = await generateAudioFromText(texto);
    const rutaTemporal = 'output_temp.flac';
    saveAudio(bufferAudio, rutaTemporal);

    playAudio(rutaTemporal);
  } catch (error) {
    console.error('Error al generar el texto a voz:', error);
  }
}

saveTextToSpeech();