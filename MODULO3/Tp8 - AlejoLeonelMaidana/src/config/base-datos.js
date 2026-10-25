const mongoose = require("mongoose");
const dns = require("node:dns");
const { leerUriMongo } = require("./entorno");

// Corrección utilizada en el aula para las consultas DNS de Atlas. sin esto falla la conexion por el problema de ipv6 y los dns que nos dan los proveedores de internet. Sobre todo claro como lo odio
dns.setServers(["8.8.8.8", "1.1.1.1"]);

//aca me conecto a la base de datos usando la uri que lei en el entorno, le paso el nombre de la base de datos y el tiempo de espera.

//tarda 5 segundos en conectarse. por si no se conecta lo cancela asi no se queda en la espera eterna de esto y avanza.
async function conectarBaseDatos() {
  await mongoose.connect(leerUriMongo(), {
    //dbName: "pruebaClase", //en esta parte de la uri yo puedo elegir el nombre de la base de datos si no le digo nada me crea una base de datos por defecto.
    serverSelectionTimeoutMS: 5000,
  });
}

//aca me desconecto de la base de datos.
async function desconectarBaseDatos() {
  await mongoose.disconnect();
}
module.exports = { conectarBaseDatos, desconectarBaseDatos };
