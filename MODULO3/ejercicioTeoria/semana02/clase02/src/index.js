const path = require("node:path");
const pc = require("picocolors");

const {leerJson, escribirTexto} = require("./archivos.js");
const {crearReporte} = require("./destinos.js");

const rutaDatos = path.join(__dirname, "..", "datos", "destinos.json");
//'path.join()' se utiliza para construir rutas de archivos de manera segura y compatible con diferentes sistemas operativos. En este caso,se esta construyendo la ruta al archivo "destinos.json", que se encuentra en la carpeta "datos" ubicada un nivel por encima del directorio actual (__dirname)

//'__dirname' es una variable global en Node.js que representa la ruta del directorio donde se encuentra el archivo actual

//.. se utiliza para subir de nivel

const rutaSalida = path.join(__dirname, "..", "salida", "reporte.txt");

async function main() {
    try{
        const destinos = await leerJson(rutaDatos);
        const reporte = crearReporte(destinos);
        await escribirTexto(rutaSalida, reporte);

        console.log(pc.green("Reporte generado exitosamente en:"), rutaSalida);

    }catch(error){
        console.error(pc.red("Error en la ejecucion del programa"), error);
        process.exitCode = 1
    }
}

main();

console.log("Programa Finalizado")