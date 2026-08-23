//primero tengo que importar los modulo de node para poder usar el manejador de archivos y de rutas

const fs = require("node:fs");
const path =require("node:path");

//los datos del estudiante con el process.argv si envian uno por terminal usara el mio por defecto
const nombreEstudiante = process.argv[2] ?? "Alejo";
const nodeVersion = process.version;
const plataformaSistema = process.platform;

//el objeto videoJuego que se crea
const videoJuego = {
    titulo: "Fornite",
    estudio: "Epic Games",
    anio: "2017",
    plataforma:["PlayStation","PC","Android","Nintendo Switch","Xbox","Nube"],
    multiJugador:true
};

//tranformamos los datos para convertirlos en texto ranto el arreglo o array como el booleano
const plataformaTexto = videoJuego.plataforma.join(", ");
const multiJugadorTexto = videoJuego.multiJugador ? "Si" : "No";

//construimos la ficha ahora
const ficha = `
FICHA DE VIDEOJUEGO:
=============================
    Estudiante: ${nombreEstudiante}
    Node.js: ${nodeVersion}
    Plataforma del Sistema: ${plataformaSistema}
-----------------------------
    Titulo: ${videoJuego.titulo}
    Estudio: ${videoJuego.estudio}
    Año: ${videoJuego.anio}
    Plataforma: ${plataformaTexto}
    Multijugador: ${multiJugadorTexto}
`;

//manejo de ruta y archivo 
const carpetaSalida = path.join(__dirname,"salida");
const rutaArchivo = path.join(carpetaSalida, "ficha-video-juego.txt");

fs.mkdirSync(carpetaSalida,{recursive:true});
fs.writeFileSync(rutaArchivo,ficha,"utf8");

console.log(ficha);
console.log(`\nArchivo generado existosamente en ${rutaArchivo}`);