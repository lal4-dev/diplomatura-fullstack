const express = require("express");
const {
  prepararAreaReservas,
  validarReserva,
} = require("../middleware/reservas");

/*esta funcion es la que me permite reutilizar el router para la web. 
  como en la web tengo una sola ruta base la defino aca y con el 
  parametro del controlador puedo definir las acciones que quiero que realice*/
function crearRouterReservas(controlador) {
  const router = express.Router();

  router.use(prepararAreaReservas);

  router.get("/", controlador.listar);
  router.get("/nueva", controlador.mostrarFormulario);
  router.get("/:id", controlador.mostrarDetalle);
  router.post("/", validarReserva, controlador.crear);

  return router;
}

module.exports = { crearRouterReservas };
