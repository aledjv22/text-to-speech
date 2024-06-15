import fs from 'fs';
import Speaker from 'speaker';
import ffmpeg from 'fluent-ffmpeg';

export function saveAudio(buffer: Buffer, filePath: string) {
  fs.writeFileSync(filePath, buffer);
}

export function playAudio(filePath: string) {
  if (fs.existsSync(filePath)) {
    const stream = fs.createReadStream(filePath);
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
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  } else {
    console.error('El archivo de audio no existe o no se creó correctamente.');
  }
}