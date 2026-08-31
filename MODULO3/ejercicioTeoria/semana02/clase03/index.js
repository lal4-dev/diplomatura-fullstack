const fs = require("fs/promises")

async function leerDatos(ruta) {
    const contenidoDatos = await fs.readFile(ruta, "utf8");
    return JSON.parse(contenidoDatos)
}


async function escribirDatos(ruta, datos) {
    await fs.writeFile(ruta, JSON.stringify(datos,null,2));
    return "Informe guardado correctamente"
}

async function main(){
    const datos = await leerDatos("./usuarios.json")
    console.log(datos);
    const informe = {...datos, procesado:true}
    const resultado = await escribirDatos("./informe.json",informe);
    console.log(resultado)
}

main()

/*
const {crearSaludo} = require("./saludar.js");
const { json } = require("stream/consumers");

console.log(crearSaludo("alejo"));
*/