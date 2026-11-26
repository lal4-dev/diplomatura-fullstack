const express = require("express");
const { validarReserva } = require("../middleware/reservas");
const {
  validarReemplazoReserva,
  validarActualizacionReserva,
} = require("../middleware/cambios-reserva");

/*esta funcion es la que me permite reutilizar el router para la api
funciona igual que el de web,solo que no hay preparacion de entorno 
porque no hay vista.*/
function crearRouterReservasApi(controlador) {
  const router = express.Router();

  router.get("/", controlador.listarApi);
  router.get("/:id", controlador.obtenerApi);
  router.post("/", validarReserva, controlador.crearApi);
  router.delete("/:id", controlador.eliminarApi);
  router.put(
    "/:id",
    validarReserva,
    validarReemplazoReserva,
    controlador.reemplazarApi,
  );
  router.patch("/:id", validarActualizacionReserva, controlador.actualizarApi);

  return router;
}

module.exports = { crearRouterReservasApi };
