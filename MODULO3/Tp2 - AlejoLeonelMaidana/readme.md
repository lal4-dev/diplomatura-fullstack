# Trabajo Practico 02

## Descripcion
Se lee un catálogo de juegos de mesa desde un archivo JSON, transforma sus registros y genera un informe de texto.

## Instalacion
1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.

## Ejecucion
- Para correr el programa: `npm start`
- Para verificar la sintaxis de los archivos: `npm run check`

## Estructura del proyecto
- `datos/juegos.json`: Contiene los datos crudos.
- `src/archivos.js`: Módulo que maneja el acceso al File System.
- `src/juegos.js`: Módulo que transforma los datos y maqueta el informe.
- `src/index.js`: Archivo principal que coordina el flujo.
- `salida/catalogo-juegos.txt`: Archivo generado por el programa.

## Flujo asíncrono
El programa utiliza `node:fs/promises` junto con `async/await` para leer el JSON de forma no bloqueante, procesarlo en memoria y finalmente crear/escribir el archivo de texto en la carpeta de salida.

## Dependencias
- `picocolors`: Utilizada para dar formato y color a los mensajes de la terminal.

---

### Respuestas a las preguntas teóricas:

1. **¿Qué responsabilidad tiene cada módulo?**
   El `archivos.js` se encarga únicamente de interactuar con los archivos (leer JSON y escribir texto). `juegos.js` se encarga de la logica (transformar los objetos en texto formateado). `index.js` coordina todo el flujo, la parte bonita de la cocina.

2. **¿Qué diferencia existe entre exportar una función y ejecutarla?**
   Exportar (`module.exports = {}`) deja la definición de la funcion a la posibilidad de ser usada en otros archivos. Ejecutarla (`funcion()`) la invoca en ese instante y lo que se exportaria seria su resultado, no dejando reutilizarla.

3. **¿Qué representa la promesa devuelta por fs.readFile?**
   Representa el resultado futuro de la operacion de lectura. Puede estar pendiente, cumplida (devuelve el texto) o rechazada (devuelve un error).

4. **¿Por qué await se utiliza dentro de una función async?**
   Si sabemos que una funcion va demorar mucho no podemos esperar segundos una respuesta entonces le decimos a node que prepare un espacio a la espera de que la promesa se resuelva, asi el pogrma continua su flujo sin bloquear el hilo principal de ejecucion del programa.

5. **¿Qué errores pueden llegar al catch de main?**
   Errores de lectura (el archivo `.json` no existe o no hay permisos), errores de formato (el JSON esta mal escrito), o errores de escritura (ruta invalida).

6. **¿Por qué se publican package.json y package-lock.json, pero no node_modules?**
   Los `.json` declaran dependencias y versiones exactas necesitadas en el proyecto. `node_modules` no se sube porque es muy pesado y cualquier usuario puede levantarlo con `npm install`.

7. **¿Para qué se utiliza picocolors y por qué figura en dependencies?**
   Se usa para imprimir textos de colores en la consola. Está en `dependencies` porque es requerido para la ejecucion real del programa.