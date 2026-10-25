/*importamos solo el modelo de reserca*/
const { Reserva } = require("../src/models/reserva");

/*aca hacemos una isntancia de reserva solo para probar 
el esquema de mongoosedb y se la pasamaos al validate para
comprobar las reglas del esquema sin hacer ninfuna conexion 
o consulta a la base de datos*/
async function main() {
  const reserva = new Reserva({
    estudiante: "Alejo Maidana",
    email: "[EMAIL_ADDRESS]",
    sala: "Sala Multimedia",
    fecha: "2026-10-25",
    turno: "Mañana",
    personas: 3,
  });
  await reserva.validate();
  console.log("Datos de reserva válidos; todavía no guardamos en MongoDB.");
}

/*si algun dato no cumple con las reglas del esquma mongoose tira
un error de validacion y  mostramos que campos fallaron*/
main().catch((error) => {
  console.error("Validación rechazada:", error.name);
  if (error.errors) {
    console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
  }
  process.exitCode = 1;
});
