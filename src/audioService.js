import fs from 'fs';
import Speaker from 'speaker';
import ffmpeg from 'fluent-ffmpeg';

export function saveAudio(buffer, rutaArchivo) {
  fs.writeFileSync(rutaArchivo, buffer);
}

export function playAudio(rutaArchivo) {
  if (fs.existsSync(rutaArchivo)) {
    const stream = fs.createReadStream(rutaArchivo);
    const speaker = new Speaker({
      channels: 2,
      bitDepth: 16,
      sampleRate: 9500
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