/*importamos lo necesario para conectar y desconectar de la
base de datos y el modelo de reservas*/
const {
  conectarBaseDatos,
  desconectarBaseDatos,
} = require("../src/config/base-datos");
const { Reserva } = require("../src/models/reserva");

/*en main traemos todas las reservas con el find y las 
mostramos en forma de tabla con el table. en el 
finally nos desconectamos de la base de datos */
async function main() {
  try {
    await conectarBaseDatos();
    /*el find lo que hace es traer todas las reservas.
    el find va sin parametros porque queremos todas las
    reservas.*/
    const reservas = await Reserva.find({});
    /*aca mapeamos con esto logramos que se muestre mejor y
    el id pasamos el id como string.*/
    console.table(
      reservas.map((reserva) => ({
        id: reserva._id.toString(),
        estudiante: reserva.estudiante,
        email: reserva.email,
        sala: reserva.sala,
        fecha: reserva.fecha,
        turno: reserva.turno,
        personas: reserva.personas,
        estado: reserva.estado,
      })),
    );
    console.log("Total de reservas:", reservas.length);
  } finally {
    await desconectarBaseDatos();
  }
}

/* si falla la conexion o la consulta a la base de datoos
capturamos el error y avisamos por consola*/
main().catch((error) => {
  console.error("No se pudo consultar las reservas:", error.name);
  console.error("Revisar configuración y disponibilidad de MongoDB.");
  process.exitCode = 1;
});
