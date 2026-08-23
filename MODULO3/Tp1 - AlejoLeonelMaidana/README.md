## Trabajo Practico 01

## Descripcion 
El proyecto genera una ficga de un videoJuego con los datos basicos y lo guarda en un archivo de texto, junto a un archivo de un event-loop simple

## Como ejecutar
Para generar la ficha del videoJuego, ejecuta en la terminal "node index.js" o "node index.js [un nombre]"

Para probar el event loop seria con "node orden-event-loop.js"

## Archivo Generado
La ejecucion del archivo / script creara una carpeta automaticamente llamada 'salida' y dentro el archivo 'ficha-video-juego.txt'

## Conceptos
1. ¿Qué diferencia existe entre JavaScript, V8 y el runtime de Node.js?
>javaScript es el lenguaje de programacion, el v8 es el motor encargado de ejecutar las instructociones, el runtime que trabaja con el v8 armar el programa fuera del navegador

2. ¿Por qué el callback de setTimeout(..., 0) se ejecuta después del código principal?
>por que el hilo principal no puede saltar "turnos" entonces el event Loop organiza los turnos,y el callback de setTimeout debe esperar obligatoriamente a que termine de ejecutarse todo el código del hilo principal

3. ¿Cuál es la diferencia general entre I/O bloqueante y no bloqueante?
>En una operación bloqueante, el hilo principal se detiene y espera obligatoriamente hasta que la operación termine. 
>En una operación no bloqueante, el código principal puede continuar avanzando mientras la operación queda en segundo plano, entregando su resultado posteriormente a través de un callback

4. ¿Qué responsabilidades cumplen node:path y node:fs en index.js ?
>el 'node:path' se encarga únicamente de construir los textos que representan las rutas o ubicaciones. 
>el 'node:fs' tiene la responsabilidad de ejecutar las operaciones reales sobre el disco duro, como crear las carpetas y escribir los archivos