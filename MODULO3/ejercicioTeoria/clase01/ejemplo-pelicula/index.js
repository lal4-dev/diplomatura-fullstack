const fs = require("node:fs");
const path = require("node:path");

const pelicula = {
    titulo: "Horizonte Infinito",
    direccion: "Alex Rivera",
    anio: 2024,
    generos: ["Ciencia ficcion","Aventura"],
    disponibilidad: true,
};

const generosComoTexto = pelicula.generos.join(", ");
const estado = pelicula.disponibilidad ? "Disponible" : "No disponible";

const ficha = `FICHA DE PELICULA:
Titulo: ${pelicula.titulo}
Direccion: ${pelicula.direccion}
Año: ${pelicula.anio}
Generos: ${generosComoTexto}
Estado: ${estado}
`;

const carpetaSalida = path.join(__dirname, "salida");
const rutaArchivo = path.join(carpetaSalida, "ficha-pelicula.txt");

fs.mkdirSync(carpetaSalida, {recursive: true});
fs.writeFileSync(rutaArchivo,ficha,"utf8");

console.log(ficha);
console.log(`Archivo generado en: ${rutaArchivo}`)