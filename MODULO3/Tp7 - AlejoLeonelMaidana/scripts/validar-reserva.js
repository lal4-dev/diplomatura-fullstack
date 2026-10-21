const { Reserva } = require("../src/modelos/reserva");

async function main() {
  const reserva = new Reserva({
    estudiante: "Alejo Maidana",
    email: "alejo.maidana@ejemplo.com",
    sala: "Sala Multimedia",
    fecha: "2026-10-25",
    turno: "Mañana",
    personas: 3,
  });
  await reserva.validate();
  console.log("Datos de reserva válidos; todavía no guardamos en MongoDB.");
}

main().catch((error) => {
  console.error("Validación rechazada:", error.name);
  if (error.errors) {
    console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
  }
  process.exitCode = 1;
});
