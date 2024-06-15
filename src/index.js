import readline from 'readline';
import { saveTextToSpeech } from './textToSpeechService.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingrese el texto a reproducir: ', (texto) => {
  saveTextToSpeech(texto).then(() => {
    rl.close();
  });
});