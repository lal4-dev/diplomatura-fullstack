const { leerConfiguracion } = require("./config/entorno");
const { crearServicioReservas } = require("./services/reservas");
const { crearApp } = require("./app");

// Semilla inicial obligatoria conservada del TP 05
const datosIniciales = [
  {
    id: 1,
    estudiante: "Alejo Maidana",
    email: "alejo.maidana@ejemplo.com",
    sala: "Sala Multimedia",
    fecha: "2026-09-23",
    turno: "Mañana",
    personas: 3,
  },
  {
    id: 2,
    estudiante: "Camila Torres",
    email: "camila.torres@ejemplo.com",
    sala: "Sala Norte",
    fecha: "2026-09-23",
    turno: "Tarde",
    personas: 2,
  },
  {
    id: 3,
    estudiante: "Lucía Fernández",
    email: "lucia.fernandez@ejemplo.com",
    sala: "Sala Sur",
    fecha: "2026-09-24",
    turno: "Noche",
    personas: 4,
  },
  {
    id: 4,
    estudiante: "Mateo Gómez",
    email: "mateo.gomez@ejemplo.com",
    sala: "Sala Norte",
    fecha: "2026-09-24",
    turno: "Mañana",
    personas: 1,
  },
];

function main() {
  const configuracion = leerConfiguracion();
  const servicioReservas = crearServicioReservas(datosIniciales);
  const app = crearApp({
    servicioReservas,
    formatoRegistro: configuracion.formatoRegistro,
  });

  app.listen(configuracion.puerto, () => {
    console.log(
      `Servidor iniciado en http://localhost:${configuracion.puerto} [Entorno: ${configuracion.modo}]`,
    );
  });
}

try {
  main();
} catch (error) {
  console.error("Error al iniciar el servidor:", error.message);
  process.exitCode = 1;
}
