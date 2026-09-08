const fs = require('node:fs/promises');

async function leerArchivo(ruta) {
    try {
        const contenido = await fs.readFile(ruta, 'utf8');
        const datos = JSON.parse(contenido);
        return datos;

    } catch (err) {
        console.error(`Error al leer el archivo:`, err)
        return [];
    }

}

module.exports = {
    leerArchivo
}