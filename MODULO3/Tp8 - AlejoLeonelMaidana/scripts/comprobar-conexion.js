/*primero de config traemos las funciones para conectar 
y desconectar de la base de datos.*/
const {
  conectarBaseDatos,
  desconectarBaseDatos,
} = require("../src/config/base-datos");

/* en el try usamos finally por que necesitamos que siempre
se ejecute independientemente de que en el try falle o no, no 
queremos dejar la conexion abierta.*/
async function main() {
  try {
    await conectarBaseDatos();
    console.log("Conexión con MongoDB establecida.");
  } finally {
    await desconectarBaseDatos();
  }
}

/*aca lo que pasa es que si el main no se ejecuta correctamente se 
captura el error. y me va a imprimir en que parte de la base de datos 
fallo asi tenemos claridad de que hacer o revisar. por que lo hicimosa 
si y no capturamos catch en la funcion de arriba es porque esa funcion 
solo se ejecuta una vez a diferencia de la aplicacion que estaria 
conectada constantemente. y si falla la conexion ahi si se detiene 
la aplicacion. o eso entendi en clases*/
main().catch((error) => {
  console.error("No se pudo completar la conexión:", error.name);
  const codigosDns = [
    "ECONNREFUSED",
    "ENOTFOUND",
    "ETIMEOUT",
    "ESERVFAIL",
    "EAI_AGAIN",
  ];
  if (codigosDns.includes(error.code)) {
    console.error("Código DNS/red:", error.code);
  }
  if (error.syscall === "querySrv" || error.syscall === "queryTxt") {
    console.error("Consulta DNS:", error.syscall);
  }
  console.error("Revisar MONGODB_URI, servidor, red y permisos.");
  process.exitCode = 1;
});
