console.log(process.argv); //mostramos todos los argumentos que se pasaron al script desde la consola

const ruta = process.argv[0] ?? "ruta"; //guardamos la ruta de node.js, si no existe usamos 'ruta'
const ruta2 = process.argv[1] ?? "ruta2"; //guardamos el primer argumento del script, si no existe
const nombre = process.argv[2]; //guardamos el segundo argumento, por ejemplo el nombre ingresado en la consola
console.log(`Hola ${nombre} en ${ruta} y ${ruta2}`); //mostramos un saludo con esos valores.

console.log("1. comienza el programa"); //indicamos que el programa ha comenzado.

setTimeout(()=>{
    //ejecuta esta funcion despues de un tiempo especifico
    console.log("3. se ejecuta la tarea programada"); //este mensaje aparece despues de 3 segundos
},3000); //1500 milisegundos = 1.5 segundos

setTimeout(()=>{
    //ejecuta esta funcion despues de un tiempo especifico
    console.log("4. se ejecuta la tarea programada"); //este mensaje aparece despues de 3 segundos
},1000); //1000 milisegundos = 1 segundo.

console.log("2. termina el codigo principal"); //este mensaje sale inmediantamete, antes que el timeout