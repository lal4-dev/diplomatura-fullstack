const fs = require("node:fs"); //importamos el modulo fs para manejar archivos
const path = require("node:path"); //importamos el modulo path para trabajar con rutas

const libro = {
    //creamos un objeto llamado libro con varias propiedades relacionadas
    titulo: "La ciudad de las nubes", //titulo del libro
    autor: "Mariana Solis", //nombre del autor
    anio: 2022, //año de publicacion
    generos: ["Fantasia", "Aventura"], //lista de generos del libro
    disponible: false //indica si el libro esta disponible
};

//convertimos el array de generos en un texto separado por comas
const generosComoTexto = libro.generos.join(", ");
const estado = libro.disponible ? "Disponible" : "No disponible";

//creamos un texto formateado con la informacion del libro
const ficha = `FICHA DE LIBRO:
    Titulo: ${libro.titulo}
    Autoria: ${libro.autor}
    Año: ${libro.anio}
    Generos: ${generosComoTexto}
    Estado: ${estado}
    
    ============================
`; 

const carpetaSalida = path.join(__dirname, "salida"); //creamos la ruta de una carpeta llamada salida dentro del directorio actual
const rutaArchivo = path.join(carpetaSalida, "ficha-libro.txt") //creamos la ruta completa para el archivo que vamos a guardar

fs.mkdirSync(carpetaSalida, {recursive: true}); //creamos la carpeta si no existe
fs.writeFileSync(rutaArchivo,ficha,"utf8"); //guardamos el contenido de la ficha dentro del archivo

console.log(ficha);
console.log(`Archivo generado en: ${rutaArchivo}`)