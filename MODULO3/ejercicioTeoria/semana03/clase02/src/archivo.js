const fs = require('node:fs/promises');
const path = require('node:path');

/**
 * Lee un archivo JSON de forma asíncrona y lo convierte a objeto JavaScript.
 * @param {string} ruta - Ruta absoluta o relativa al archivo JSON.
 * @returns {Promise<Array|Object>} Los datos parseados del archivo.
 */
async function leerJson(ruta) {
    try {
        // Lee el archivo como texto plano con codificación UTF-8
        const contenido = await fs.readFile(ruta, 'utf-8');
        
        // Convierte el texto JSON a un objeto/array de JavaScript
        const datos = JSON.parse(contenido);
        return datos;
    } catch (error) {
        console.error(`❌ Error al leer el archivo JSON en ${ruta}:`, error.message);
        return []; // Retorna un array vacío si no existe o hay error para evitar que el servidor explote
    }
}

/**
 * Guarda datos en un archivo JSON formateado de forma legible (indentado con 2 espacios).
 * @param {string} ruta - Ruta al archivo donde se guardarán los datos.
 * @param {Array|Object} contenido - Datos en JavaScript para convertir a JSON y guardar.
 */
async function escribirJson(ruta, contenido) {
    try {
        // Convierte el objeto/array de JS a texto JSON formateado (2 espacios de indentación)
        const contenidoString = JSON.stringify(contenido, null, 2);
        
        // Escribe el archivo en el disco
        await fs.writeFile(ruta, contenidoString, 'utf-8');
    } catch (error) {
        console.error(`❌ Error al escribir el archivo JSON en ${ruta}:`, error.message);
    }
}

// Exportamos las funciones para poder usarlas con require() en server.js
module.exports = {
    leerJson,
    escribirJson
};