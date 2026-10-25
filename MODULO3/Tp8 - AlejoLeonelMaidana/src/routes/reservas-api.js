const express = require("express");
const { validarReserva } = require("../middleware/reservas");

/*esta funcion es la que me permite reutilizar el router para la api
funciona igual que el de web,solo que no hay preparacion de entorno 
porque no hay vista.*/
function crearRouterReservasApi(controlador) {
  const router = express.Router();

  router.get("/", controlador.listarApi);
  router.get("/:id", controlador.obtenerApi);
  router.post("/", validarReserva, controlador.crearApi);

  return router;
}

module.exports = { crearRouterReservasApi };
