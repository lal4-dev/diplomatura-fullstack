const { leerConfiguracion } = require("./config/entorno");
const {
  conectarBaseDatos,
  desconectarBaseDatos,
} = require("./config/base-datos");

const { crearServicioReservas } = require("./services/reservas");

const { crearApp } = require("./app");

async function main() {
  const configuracion = leerConfiguracion();

  //primero tenemos que conectarnos con la base de datos
  await conectarBaseDatos();

  //aca creamos el servicio pasandole la coleccion de reservas
  const servicioReservas = crearServicioReservas();
  //aca creamos la aplicacion pasandole el servicio y la configuracion
  const app = crearApp({
    servicioReservas,
    formatoRegistro: configuracion.formatoRegistro,
  });

  const servidor = app.listen(configuracion.puerto, () => {
    console.log(
      `Servidor iniciado en http://localhost:${configuracion.puerto} [Entorno: ${configuracion.modo}]`,
    );
  });

  /*funcion que se ejecuta cuando el servidor se cierra para que se cierre de
  manera ordenada es decir primero desconectamos la base de datos y luego
  cerramos el servidor.*/
  let cerrado = false;

  async function cerrarServidor() {
    if (cerrado) {
      return;
    }
    cerrado = true;

    console.log("Cerrando servidor...");

    servidor.close(async () => {
      try {
        await desconectarBaseDatos();
        console.log("Conexion con mongoDB cerrada pefeto caballero pefeto");
      } catch (error) {
        console.error("Error al cerrar el servidor:", error.name);
        process.exitCode = 1;
      }
    });
  }

  process.once("SIGINT", cerrarServidor);
  process.once("SIGTERM", cerrarServidor);

  //por si el puerto esta ocupado
  servidor.on("error", (error) => {
    console.error("No se pudo escuchar el puerto:", error.code);
    process.exitCode = 1;
    desconectarBaseDatos().catch((fallo) => {
      console.error("Error al cerrar:", fallo.name);
    });
  });
}

//funcion para cerrar el servidor de arranque por ej con URI invalida o un fallo de dns
main().catch(async (error) => {
  console.error("No se pudo iniciar la aplicación:", error.name);
  console.error("Revisar entorno, DNS, red, acceso de Atlas y puerto.");
  process.exitCode = 1;

  try {
    await desconectarBaseDatos();
  } catch (fallo) {
    console.error("Error al cerrar:", fallo.name);
  }
});
