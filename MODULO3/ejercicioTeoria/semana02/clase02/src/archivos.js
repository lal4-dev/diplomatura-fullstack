const fs = require("node:fs/promises");
const path = require("node:path");

//const rutaPrueba = path.join(__dirname, "prueba.json")

async function leerJson(ruta) {
    try{
        const texto = await fs.readFile(ruta,"utf8");
        return JSON.parse(texto);
    }catch(error){
        console.error("Error al leer el archivo JSON:", error);
        throw error
    }
}

/*leerJson(rutaPrueba)
    .then((data)=>{
        console.log("Contenido del archivo JSON:", data);
    })
    .catch((error)=>{
        console.error("Error al leer el archivo JSON:", error);
        process.exitCode = 1;
    });
*/

async function escribirTexto(ruta, contenido) {
    try{
        const carpeta = path.dirname(ruta);
        await fs.mkdir(carpeta,{recursive:true});-
        await fs.writeFile(ruta, contenido, "utf8");

    }catch(error){
        console.error("Error al escribir en el archivo:", error);
        throw error;
    }
}

module.exports = {
    leerJson,
    escribirTexto
};