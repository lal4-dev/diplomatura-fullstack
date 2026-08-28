const { error } = require("node:console");
const fs = require("node:fs"); //importamos el modulo fs para manejar archivos
const path =  require("node:path"); //importamos el modulo path para trabajar con rutas.

console.log("1. Inicio") //Empezamos la parte de lectura de archivos

const contenidoSincronico = fs.readFileSync(__filename, "utf8"); //leemos el archivo actual de forma sincrona y lo guardamos en memoria
console.log(`2. lectura bloqueante: ${contenidoSincronico.length} caracteres`) //mostramos la cantidad de caracteres del archivo.

fs.readFile(__filename, "utf8",(error,contenidoAsincronico)=>{
    //leemos el archivo de forma asincronica y ejecutamos una funcion cuando termine.

    if(error){
        //si hubo un error, entramos aqui.
        console.error("no se a podido leer el archivo"); //Mostramos el mensaje de error.
        return; //salimos de la funcion para no continuar
    }

    console.log(
        `4. Lectura no bloqueante: ${contenidoAsincronico.length} caracteres`,
    ); //Si todo salio bien, mostramos cuantos caracteres tiene
});

console.log("3. el codigo principal continua"); //el programa sigue adelante aun que la lectura asincronica aun no termino