# Texto a Voz
Este proyecto convierte un texto ingresado por el usuario en la línea de comandos a voz, utilizando la API de Hugging Face para generar el audio y luego reproducirlo en tiempo real. Es ideal para desarrolladores o entusiastas interesados en la síntesis de voz y su implementación práctica.

## Configuración
Antes de ejecutar el proyecto, asegúrate de configurar las variables de entorno necesarias. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
```
HF_ACCESS_TOKEN=tu_token_de_acceso_a_Hugging_Face
```
Reemplaza `tu_token_de_acceso_a_Hugging_Face` por tu token de acceso a la API de Hugging Face.

## Ejecución
Para ejecutar el proyecto, sigue los siguientes pasos:
1. Instala las dependencias con `npm install`.  
2. Ejecuta el proyecto con `npm run start` o `node src/index.js`.
3. Ingresa el texto que deseas convertir a voz y presiona Enter.
4. Escucha el audio generado en tiempo real.

## Dependencias
El proyecto utiliza las siguientes dependencias:
- [@huggingface/inference](https://www.npmjs.com/package/@huggingface/inference): Para generar el audio a partir del texto.
- [dotenv](https://www.npmjs.com/package/dotenv): Para manejar variables de entorno.
- [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg): Para procesar el audio generado.
- [speaker](https://www.npmjs.com/package/speaker): Para reproducir el audio

## Personalización
Para modificar la velocidad de reproducción del audio, puedes ajustar los siguientes parámetros en el código:
- [`sampleRate`](./src/audio.service.js): Este parámetro controla la velocidad de reproducción del audio. Un valor más alto aumenta la velocidad y viceversa.
- [`bitRate`](./src/textToSpeech.service.js): Este parámetro controla la calidad del audio generado. Un valor más alto aumenta la calidad y viceversa.

Para modificar el modelo de voz utilizado, puedes ajustar el siguiente parámetro en el código:
- [`model`](./src/audio.service.js): Este parámetro controla el modelo de voz utilizado para generar el audio. Puedes consultar los modelos disponibles en[Hugging Face](https://huggingface.co/models?pipeline_tag=text-to-speech&sort=downloads).

## Aclaraciones
- El modelo actual utilizado para la generación de audio es [`facebook/mms-tts-spa`](https://huggingface.co/facebook/mms-tts-spa), pero puedes cambiarlo según tus preferencias.
- Este proyecto es solo un ejemplo básico de cómo utilizar la API de Hugging Face para la síntesis de voz. Puedes personalizarlo y extenderlo según tus necesidades.