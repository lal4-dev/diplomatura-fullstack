const path = require("node:path");
const pc = require("picocolors")

const {leerDatos, escribirDatos} = require("./archivo");
const {crearInforme} = require("./juegos");

const rutaDatos = path.join(__dirname, '..', 'datos', 'juegos.json');
const rutaSalida = path.join(__dirname, '..', 'salida', 'catalogo-juegos.txt');

async function main() {
    try {
        console.log(pc.cyan('Lectura del catalogo...'));
        
        const juegos = await leerDatos(rutaDatos);
        const informe = crearInforme(juegos);
        
        await escribirDatos(rutaSalida, informe);
        
        console.log(informe);
        console.log(pc.green(`\nEl informe fue generado correctamente en: ${rutaSalida}`));
        
    } catch (error) {
        console.error(pc.red(`Error al procesar el catalogo: ${error.message}`));
        process.exitCode = 1;
    }
}

main();