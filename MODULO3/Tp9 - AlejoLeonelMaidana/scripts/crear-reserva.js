/*traemos las funciones concectar y desconectar de config 
y el modelo de reserva*/
const {
  conectarBaseDatos,
  desconectarBaseDatos,
} = require("../src/config/base-datos");
const { Reserva } = require("../src/models/reserva");

/*la funcion lo que hace es conectarse a mongoosedb y creamos 
una reserva de prueba con los 6 campos y dejamos que mongoose 
le asigne el id y el estado pendiente*/
async function main() {
  try {
    await conectarBaseDatos();
    const reserva = await Reserva.create({
      estudiante: "Alejo Maidana",
      email: "alejo.maidana@ejemplo.com",
      sala: "Sala Multimedia",
      fecha: "2026-10-25",
      turno: "Mañana",
      personas: 3,
    });
    //el tostring es para que se muestre como string y no como objeto
    console.log("Reserva guardada. _id:", reserva._id.toString());
  } finally {
    /*es necesario desconectar para no dejar la conexion abierta a 
    diferencia de la aplicacion*/
    await desconectarBaseDatos();
  }
}

/*si falla la crearcion por ejemplo si la base de datos esta 
caida o si algun datos no cumple las validaciones del esquema 
atrapamos el error e imprimimos que campos tenemos que 
revisar*/
main().catch((error) => {
  console.error("No se pudo crear la reserva:", error.name);
  if (error.errors) {
    console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
  }
  console.error("Revisar datos, configuración y disponibilidad de MongoDB.");
  process.exitCode = 1;
});
